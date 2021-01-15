import React, { useEffect, useState } from 'react';
import { getProducts } from '../Auth';
import Layout from '../Layout/Layout';
import Cards from './Card';
import Search from './Search';

const Home = () => {

    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductBySell = () => {
        getProducts('sold').then(data=>{
            if(data.err){
                setError(data.err);
            }
            else{
                setProductBySell(data);
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data=>{
            if(data.err){
                setError(data.err);
            }
            else{
                setProductByArrival(data);
            }
        })
    }

    useEffect(()=>{
        loadProductByArrival();
        loadProductBySell();
    }, [])

    return(
        <Layout className='container-fluid' title='Home Page' description='Node React E-Commerce App'>
            <Search/>
            <h2 className='mb-4'>Best Sellers</h2>
            <div className='row'>
                {productBySell.map((p,i)=>{
                    return(
                        <div key={i} className='col-4 mb-3'>
                            <Cards products={p}/>
                        </div>
                    )
                })}
            </div>
            <h2 className='mb-4'>New Arrival</h2>
            <div className='row'>
                {productByArrival.map((p,i)=>{
                    return(
                        <div key={i} className='col-4 mb-3'>
                            <Cards products={p}/>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Home;