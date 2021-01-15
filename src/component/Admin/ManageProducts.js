import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { getProducts, deleteProduct, isAuthenticated } from '../Auth';
import { Link } from 'react-router-dom';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data=>{
            if(data.err){
                console.log(data.err)
            }
            else{
                setProducts(data);
            }
        })
    }

    useEffect(()=>{
        loadProducts()
    }, [])

    const destroy = (productId) => {
        deleteProduct(productId, user._id, token).then(data=>{
            if(data.err){
                console.log(data.err)
            }
            else{
                loadProducts();
            }
        })
    }

    return ( 
        <Layout className='container-fluid' title='Manage Products' description={`Perform CRUD om products`}>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>{`Total Products ${products.length}`}</h2>
                    <hr/>
                    <ul className='list-group'>
                        {
                            products.map((p,i)=>{
                                return(
                                    <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
                                        <strong>{p.name}</strong>
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <span className='badge badge-warning badge-pill'>Update</span>
                                        </Link>
                                        <span style={{cursor: 'pointer'}} onClick={()=> destroy(p._id)} className='badge badge-danger badge-pill'>Delete</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
 
export default ManageProducts;