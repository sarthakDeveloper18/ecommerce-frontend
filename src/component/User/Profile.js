import React, { useState, useEffect } from 'react';
import { isAuthenticated, readUser, update, updateUser } from '../Auth';
import Layout from '../Layout/Layout';
import { Redirect } from 'react-router-dom';

const Profile = (props) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        error: '',
        success: false
    })

    const { name, email, error, success } = values;

    const { token } = isAuthenticated()

    const init = (userId) => {
        readUser(userId, token).then(data => {
            if (data.err) {
                setValues({ ...values, error: true })
            }
            else {
                setValues({ ...values, name: data.name, email: data.email })
            }
        })
    }

    useEffect(() => {
        init(props.match.params.userId);
    }, [])

    const handleChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        update(props.match.params.userId, token, { name, email }).then(data => {
            if (data.err) {
                console.log(data.err)
            }
            else {
                updateUser(data, () => {
                    setValues({ ...values, name: data.name, email: data.email, success: true });
                })
            }
        })
    }

    const redirectUser = () => {
        if (success) {
            return <Redirect to='/cart' />
        }
    }

    const profleUpdate = (name, email) => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input className='form-control' type='text' onChange={handleChange('name')} value={name} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input className='form-control' type='email' onChange={handleChange('email')} value={email} />
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}>Update</button>
        </form>
    )

    return (
        <Layout className='container-fluid col-md-8 offset-md-2' title='Profile' description='Update Your Profile'>
            {profleUpdate(name, email)}
            {redirectUser()}
        </Layout>
    );
}

export default Profile;