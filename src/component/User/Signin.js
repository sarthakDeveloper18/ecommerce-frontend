import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../Layout/Layout';
import {authenticate, isAuthenticated, signin} from '../Auth/index';

const Signin = () => {

    const {user} = isAuthenticated();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirect: false
    })

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading: true})
        signin(values.email, values.password)
        .then(data=>{
            if(data.err){
                setValues({...values, error: data.err, loading: false})
            }
            else{
                authenticate(data, ()=>{
                    setValues({
                        ...values, 
                        redirect: true,
                    })
                })
            }
        })
    }

    const showError = () => (
        <div className='alert alert-danger' style={{display: values.error ? '' : 'none'}}>
            {values.error}
        </div>
    )

    const showLoading = () => (
        values.loading && (
            <div className='alert alert-info'>
                <h2>Loading...</h2>
            </div>
        )
    )   

    const redirectUser = () => {
        if(values.redirect){
            if(user && user.role === 1){
                return <Redirect to='/admin/dashboard'/>
            }
            else{
                return <Redirect to='/user/dashboard'/>
            }
        }
        if(user){
            return <Redirect to='/'/>
        }
    }

    const signUpForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type='email' className='form-control' value={values.email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type='password' className='form-control' value={values.password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )

    return(
        <Layout className='container col-md-8 offset-md-2' title='Signin Page' description='Signin to Node React E-Commerce App'>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;