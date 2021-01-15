import React, { useState, useEffect } from 'react';
import { listOrders, isAuthenticated, getStatusValues, updateOrderStatus } from '../Auth';
import Layout from '../Layout/Layout';
import moment from 'moment';

const Order = () => {

    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data=>{
            if(data.err){
                console.log(data.err)
            }
            else{
                setOrders(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data=>{
            if(data.err){
                console.log(data.err)
            }
            else{
                setStatusValues(data)
            }
        })
    }

    useEffect(()=>{
        loadOrders();
        loadStatusValues()
    }, []);

    const showOrdersLength = () => {
        if(orders.length){
            return <h1 className='text-danger display-2'>Total Orders: {orders.length}</h1>
        }
        else{
            return <h1 className='text-danger'>No Orders</h1>
        }
    }

    const showInput = (key, value) => (
        <div className='input-group mb-2 mr-sm-2'>
            <div className='input-group-prepend'>
                <div className='input-group-text'>{key}</div>
            </div>
            <input type='text' value={value} className='form-control' readOnly/>
        </div>
    )

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data=>{
            console.log(data)
            if(data.err){
                console.log(data.err)
            }
            else{
                loadOrders()
            }
        })
    }

    const showStatus = (o) => (
        <div className='form-group'>
            <h3 className='mark mb-4'>Status: {o.status}</h3>
            <select className='form-control' onChange={(e)=> handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, index)=> <option key={index} value={status}>{status}</option>)}
            </select>
        </div>
    )

    return ( 
        <Layout title='Orders' description={`Greaat Day ${user.name}, You can manage all orders from here.`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showOrdersLength()}
                    {orders.map((o, i)=>{
                        return(
                            <div className='mt-5' key={i} style={{borderBottom: '5px solid indigo'}}>
                                <h2 className='mb-5'>
                                    <span className='bg-primary'>Order ID: {o._id}</span>
                                </h2>
                                <ul className='list-group mb-2'>
                                    <li className='list-group-item'>{showStatus(o)}</li>
                                    <li className='list-group-item'>Transaction ID: {o.transaction_id}</li>
                                    <li className='list-group-item'>Amount: {o.amount}</li>
                                    <li className='list-group-item'>Ordered By: {o.user.name}</li>
                                    <li className='list-group-item'>Ordered On: {moment(o.createdAt).fromNow()}</li>
                                    <li className='list-group-item'>Delievery Address: {o.address}</li>
                                </ul>
                                <h3 className='mt-4 mb-4 font-italic'>
                                    Total products in the order: {o.products.length}
                                </h3>
                                {
                                    o.products.map((o, i)=>{
                                        return(
                                            <div className='mb-4' key={i} style={{padding: '20px', border: '1px solid indigo'}}>
                                                {showInput('Product Name', o.name)}
                                                {showInput('Product Price', o.price)}
                                                {showInput('Product Total', o.count)}
                                                {showInput('Product Id', o._id)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) 
                    })}
                </div>
            </div>
        </Layout>
    );
}
 
export default Order;