import React, { useEffect, useState } from 'react';
import { listRelated, read } from '../Auth';
import Layout from '../Layout/Layout';
import Cards from './Card';

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProduct, setRelatedProduct] = useState([]);

    const loadSingleProduct = productId => {
        read(productId)
        .then(data=>{
            if(data.err){
                setError(data.err);
            }
            else{
                setProduct(data);
                listRelated(data._id)
                .then(data=>{
                    if(data.err){
                        setError(data.err)
                    }
                    else{
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId;
        loadSingleProduct(productId)
    }, [props])

    return(
        <Layout className='container-fluid' title={product && product.name} description={product && product.description}>
            <div className='row'>
                <div className='col-8'>
                {
                    product && product.description &&
                    <Cards show={true} products = {product} showViewProductButton={false}/>
                }
                </div>
                <div className='col-4'>
                    <h4>Related Products</h4>
                    {relatedProduct.map((rp, i)=>(
                        <div className='mb-3'>
                            <Cards key={i} products={rp}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
export default Product;