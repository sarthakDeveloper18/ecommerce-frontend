import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrder, getBraintreeClientToken, isAuthenticated, payment } from '../Auth';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelper';

const Checkout = ({products, setRun = f => f, run = undefined}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(()=>{
        getBraintreeClientToken(userId, token).then(data=>{
            if(data.error){
                setData({...data, error: data.error})
            }
            else{
                setData({clientToken: data.clientToken})
            }
        })
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }

    const hanndleAddress = (event) => {
        setData({...data, address: event.target.value})
    }

    let delievryAddress = data.address

    const buy = () => {
        setData({loading: true})
        let nonce;
        data.instance.requestPaymentMethod().then(data=>{
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal()
            }
            payment(userId, token, paymentData).then(response=>{
                console.log("ONE", response)
                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: delievryAddress,
                }
                console.log(createOrderData)
                createOrder(userId, token, createOrderData).then(response=>{
                    console.log("TWO", response)
                    emptyCart(()=>{
                        setRun(!run);
                        setData({loading: false, success: true})
                    })
                })
            }).catch(error=> setData({loading: false}))
        }).catch(err=>{
            setData({...data, error: err.message});
        })
    }

    const showDropIn = () => (
        <div onBlur={()=> setData({...data, error: ''})}>
            {
                data.clientToken !== null && products.length > 0 ? 
                (
                    <div>
                        <div className='form-group mb-3'>
                            <label className='text-muted'>Delievery Address:</label>
                            <textarea onChange={hanndleAddress} className='form-control' value={data.address} placeholder='Type Your delievry address here'/>
                        </div>
                        <DropIn options={{authorization: data.clientToken, paypal: {flow: 'vault'}}} onInstance={instance=>(data.instance = instance)} />
                        <button onClick={buy} className='btn btn-success btn-block'>Pay</button>
                    </div>
                )  : 
                
                null
            }
        </div>
    )

    const showError = (error) => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>{data.error}</div>
    )

    const showSuccess = (success) => {
        return <div className='alert alert-info' style={{display: success ? '' : 'none'}}>Thanks Your Payment Was Successful</div>
    }

    return(
        <div>
            <h2>
                Total: ${getTotal()}
                {showSuccess(data.success)}
                {showError(data.error)}
                <br/>
                {
                    isAuthenticated() ? 
                    (
                        <div>{showDropIn()}</div>
                    ) :
                    (
                        <Link to='/signin'>
                            <button className='btn btn-primary'>Signin To Checkout</button>
                        </Link>
                    )
            }
            </h2>
        </div>
    )
}

export default Checkout;