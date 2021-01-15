import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import {signup} from '../Auth/index';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        signup(values.name, values.email, values.password)
        .then(data=>{
            if(data.err){
                setValues({...values, error: data.err, success: false})
            }
            else{
                setValues({...values, name: '', email: '', password: '', error: '', success: true})
            }
        })
    }

    const showError = () =>  (
        <div className='alert alert-danger' style={{display: values.error ? '' : 'none'}}>
            {values.error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{display: values.success ? '' : 'none'}}>
            New Account is created. Please <Link to='/signin'>Signin</Link>
        </div>
    )

    const signUpForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' className='form-control' value={values.name}/>
            </div>
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
        <Layout className='container col-md-8 offset-md-2' title='Signup Page' description='Signup to Node React E-Commerce App'>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup;