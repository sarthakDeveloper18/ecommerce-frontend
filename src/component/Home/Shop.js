import React, { useEffect, useState } from 'react';
import { getCategories, getFilteredProducts } from '../Auth';
import Layout from '../Layout/Layout';
import Checkbox from './Checkbox';
import { price } from './fixedPrice';
import RadioBox from './RadioBox';
import Card from './Card';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [filteredResults, setfilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data=> {
            if(data.err){
                setError(data.err);
            }
            else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters;
        if(filterBy === 'price'){
            let priceValue = handlePrice(filters);
            newFilters.filters[filterBy] = priceValue;
        }
        setMyFilters(newFilters);
        loadFilteredResults(myFilters.filters);
    }

    const loadFilteredResults = (filters) => {
        getFilteredProducts(skip, limit, filters)
        .then(data=>{
            if(data.err){
                setError(data.err);
            }
            else{
                setfilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const loadMore = (filters) => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data=>{
            if(data.err){
                setError(data.err);
            }
            else{
                setfilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        })
    }

    const loadMoreButton = () => {
        return(
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5'>Load More</button>
            )
        )
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;
    }

    return(
        <Layout className='container-fluid' title='Shop Page' description='Search and find books of your choice'>
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter By Category</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={(filters)=>handleFilters(filters, 'category')}/> 
                    </ul>
                    <h4>Filter By Price Range</h4>
                    <div>
                        <RadioBox prices={price} handleFilters={(filters)=>handleFilters(filters, 'price')}/> 
                    </div>
                </div>
                <div className='col-8'>
                    <h4 className='mb-4'>Products</h4>
                    <div className='row'>
                        {filteredResults && filteredResults.map((result,i)=>(
                            <div key={i} className='col-4 mb-3'>
                                <Card products={result}/>
                            </div>
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;