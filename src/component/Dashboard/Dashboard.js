import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, getPurhaseHistory } from '../Auth';
import Layout from '../Layout/Layout';
import moment from 'moment';

const Dashboard = () => {

    const { user, token } = isAuthenticated();
    const [history, setHistory] = useState([]);

    const init = () => {
        getPurhaseHistory(user._id, token).then(data => {
            if (data.err) {
                console.log(data.err)
            }
            else {
                setHistory(data)
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const userLinks = () => (
        <div className='card'>
            <h4 className='card-header'>User Links</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/cart'>My Cart</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link' to={`/profile/${user._id}`}>Update Profile</Link>
                </li>
            </ul>
        </div>
    )

    console.log(history)

    return (
        <Layout className='container-fluid' title='Dashboard' description={`Greaat Day ${user.name} ..!`}>
            <div className='row'>
                <div className='col-3'>
                    {userLinks()}
                </div>
                <div className='col-9'>
                    <div className='card mb-5'>
                        <h3 className='card-header'>User Information</h3>
                        <ul className='list-group'>
                            <li className='list-group-item'>{user.name}</li>
                            <li className='list-group-item'>{user.email}</li>
                            <li className='list-group-item'>{user.role === 1 ? 'Admin' : 'Registered User'}</li>
                        </ul>
                    </div>
                    <div className='card mb-5'>
                        <h3 className='card-header'>Purchase History</h3>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                {history.map((h, i) => {
                                    return (
                                        <div>
                                            <hr />
                                            {h.products.map((p, i) => {
                                                return (
                                                    <div key={i}>
                                                        <h6>Product name: {p.name}</h6>
                                                        <h6>Product price: ${p.price}</h6>
                                                        <h6>Quantity: {p.count}</h6>
                                                        <h6>
                                                            Purchased date:{" "}
                                                            {moment(h.createdAt).fromNow()}
                                                        </h6>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;