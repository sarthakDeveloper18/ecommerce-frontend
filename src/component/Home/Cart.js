import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Cards from './Card';
import { getCart } from './cartHelper';
import Checkout from './Checkout';

const Cart = () => {

    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=>{
        setItems(getCart())
    }, [run]);

    return(
        <Layout className='container-fluid' title='Cart Page' description='Manage your cart items.Add remove checkout or continue shopping.'>
            <div className='row'>
                <div className='col-6'>
                    {
                        items.length > 0 ?
                            <div>
                                <h2>Your cart has {`${items.length}`} items</h2>
                                <hr />
                                {
                                    items.map((p, i) => (
                                        <div key={i}>
                                            <Cards key={i} products={p} showRemoveProductButton={true} showAddToCartButton = {false} cartUpdate={true} run={run} setRun={setRun} />
                                        </div>
                                    ))
                                }
                            </div> : 
                            <h2>Your cart is empty. <Link to='/shop'>Contine Shopping</Link></h2>
                    }
                </div>
                <div className='col-6'>
                    <h2 className='mb-4'>Your Cart Summary</h2>
                    <hr/>
                    <Checkout products = {items} setRun={setRun} run={run}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;