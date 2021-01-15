import React, { useState, useEffect } from 'react';
import { createProduct, isAuthenticated, getCategories } from '../Auth';
import Layout from '../Layout/Layout';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createProducts: '',
        redirectToProfile: false,
        formData: ''
    })
    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        quantity,
        loading,
        error,
        createProducts,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.err) {
                setValues({ ...values, error: data.err });
            }
            else {
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const handleChange = (name) => (e) => {
        const value = (name === 'photo' ? e.target.files[0] : e.target.value);
        formData.set(name, value);
        console.log(name, value)
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: false });
        console.log(formData)
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err });
                    setTimeout(() => {
                        setValues({ ...values, error: '' });
                    }, 2000);
                }
                else {
                    setValues({ ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, createProducts: data.name });
                    setTimeout(() => {
                        setValues({ ...values, createProducts: '' });
                    }, 2000);
                }
            })
    }

    const newProductForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' value={name} className='form-control' />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea onChange={handleChange('description')} type='text' value={description} className='form-control' />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input onChange={handleChange('price')} type='number' value={price} className='form-control' />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select onChange={handleChange('category')} className='form-control'>
                    <option>Please Select</option>
                    {
                        categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input onChange={handleChange('quantity')} type='number' value={quantity} className='form-control' />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select onChange={handleChange('shipping')} className='form-control'>
                    <option>Please Select</option>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>
                </select>
            </div>
            <button className='btn btn-outline-primary'>Create Product</button>
        </form>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createProducts ? '' : 'none' }}>
            <h2>{`${createProducts} is created`}</h2>
        </div>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-success'>
                <h2>Loading...</h2>
            </div>
        )
    )

    return (
        <Layout title='Add a new Product' description={`Greaat Day ${user.name}, ready to add a new product?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newProductForm()}
                </div>
            </div>
        </Layout>
    )

}

export default AddProduct;