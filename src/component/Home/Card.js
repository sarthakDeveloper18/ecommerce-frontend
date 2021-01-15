import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import '../../styles.css';
import { addItem, update, remove } from './cartHelper';
import { useState } from 'react';

const Cards = ({setRun = f => f, run = undefined, products, show, showViewProductButton=true, showAddToCartButton=true, cartUpdate=false, showRemoveProductButton=false}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(products.count)

    const showStock = (qty) => {
        return qty > 0 ? <span className='badge badge-primary badge-pill'>In Stock</span> :
        <span className='badge badge-primary badge-pill'>Out Of Stock</span>

    }

    const addToCard = () => {
        addItem(products, ()=>{
            setRedirect(true)
        })
    }

    const shouldRedirect = (redirect) => {
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }

    const showcartUpdateOptions = (cartUpdate) => {
        return cartUpdate && <div>
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Adjust Quantity</span>
                </div>
                <input type='number' className='form-control' value={count} onChange={handleChange(products._id)}/>
            </div>
        </div>
    }

    

    const handleChange = (productId) => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            update(productId, event.target.value)
        }
    }

    return(
        <div className={show ? 'col-4 mb-3' : ''}>
            <div className='card'>
                <div className='card-header' style={{background: 'indigo', color: 'white', fontWeight: 'bold'}}>
                    {products.name}
                </div>
                <div className='card-body'>
                    {shouldRedirect(redirect)}
                    <ShowImage item={products} url='products' />
                    <p className='lead mt-2'>{products.description.substring(0, 100)}</p>
                    <p className='black-10'>{`$${products.price}`}</p>
                    <p className='black-9'>{`Category: ${products.category && products.category.name}`}</p>
                    <p className='black-8'>
                        Added On {moment(products.createdAt).fromNow()}
                    </p>
                    {showStock(products.quantity)}
                    <br/>
                    {
                        showViewProductButton ?
                        <Link to={`/product/${products._id}`}>
                            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>View Product</button>
                        </Link> : null
                    }
                    {
                        showAddToCartButton ?
                        <button onClick={addToCard} className='btn btn-outline-warning mt-2 mb-2'>Add to cart</button>
                        : null
                    }
                    {
                        showRemoveProductButton ?
                        <button onClick={()=> {
                            remove(products._id); 
                            setRun(!run);}} className='btn btn-outline-danger mt-2 mb-2'>Remove Product</button>
                        : null
                    }
                    {
                        showcartUpdateOptions(cartUpdate)
                    }
                </div>
            </div>
        </div>
    )
}

export default Cards;