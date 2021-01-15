import React, { useEffect, useState } from 'react';
import { getCategories, list } from '../Auth';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data=>{
            if(data.err){
                console.log(data.err)
            }
            else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect(()=> {
        loadCategories();
    }, []);

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }

    const searchData = () => {
        if(search){
            list({search: search || undefined, category: category})
            .then(data=>{
                if(data.err){
                    console.log(data.err);
                }
                else{
                    setData({...data, results: data, searched: true, categories: categories, search: search, category: category});
                }
            })
        }
        else{
            setData({...data, results: [], searched: true});
        }
    }

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value});
    }   

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className='input-group-text'>
                <div className='input-group input-group-lg'>
                    <div className='input-group-prepend'>
                        <select className='btn mr-2' onChange={handleChange('category')}>
                            <option value='all'>Pick Category</option>
                            {categories && categories.map((c,i)=>(
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type='search' className='form-control' onChange={handleChange('search')} placeholder='Search By Name'/>
                </div>
                <div className='btn input-group-append' style={{border: 'none'}}>
                    <button className='input-group-text'>Search</button>
                </div>
            </span>
        </form>
    )

    const searchMessage = (results, searched) => {
        if(searched && results && results.length > 0){
            return `Found ${results.length} products`
        }
        if(searched && results.length < 1){
            return `No Product Found`
        }
    }

    const searchedProducts = (results = []) => (
        <div>
            <h2 className='mt-4 mb-4'>
                {searchMessage(results, searched)}
            </h2>
            <div className='row'>
                {results.map((p,i)=>(
                    <Card key={i} products={p}/>
                ))}
            </div>
        </div>
    )

    return(
        <div className='ro'>
            <div className='container mb-3'>
                {searchForm()}
            </div>
            <div className='container-fluid mb-3'>
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;