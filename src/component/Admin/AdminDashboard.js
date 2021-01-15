import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../Auth';
import Layout from '../Layout/Layout';

const AdminDashboard = () => {

    const {user} = isAuthenticated();

    const adminLinks = () => (
        <div className='card'>
            <h4 className='card-header'>Admin Links</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/create/category'>Create Category</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/create/product'>Create Product</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/admin/orders'>View Orders</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/admin/products'>Manage Products</Link>
                </li>
            </ul>
        </div>
    )

    return(
        <Layout className='container-fluid' title='AdminDashboard' description={`Greaat Day ${user.name} ..!`}>
            <div className='row'>
                <div className='col-3'>
                    {adminLinks()}
                </div>
                <div className='col-9'>
                    <div className='card mb-5'>
                        <h3 className='card-header'>Admin Information</h3>
                        <ul className='list-group'>
                            <li className='list-group-item'>{user.name}</li>
                            <li className='list-group-item'>{user.email}</li>
                            <li className='list-group-item'>{user.role === 1 ? 'Admin' : 'Registered User'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;