import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../Auth';
import { itemTotal } from './cartHelper';

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ff9900'}
    }
    else{
        return {color: '#ffffff'}
    }
}

const Menu = (props) => {
    return(
        <div>
            <ul className='nav nav-tabs bg-primary'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/' style={isActive(props.history, '/')}>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/shop' style={isActive(props.history, '/shop')}>Shop</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/cart' style={isActive(props.history, '/cart')}>Cart <sup><small className='cart-badge'>{itemTotal()}</small></sup></Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin/dashboard' : '/user/dashboard'} style={isActive(props.history, '/user/dashboard')}>Dashboard</Link>
                </li>
                {
                    !isAuthenticated() ? 
                    <>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/signin' style={isActive(props.history, '/signin')}>Sign In</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/signup' style={isActive(props.history, '/signup')}>Sign Up</Link>
                        </li>
                    </> : null
                }
                {
                    isAuthenticated() ?
                    <>
                        <li className='nav-item'>
                            <span onClick={()=> signout(()=>{
                                props.history.push('/')
                            })} className='nav-link' to='/signout' style={{cursor: 'pointer', color: '#ffffff'}}>Sign Out</span>
                        </li>
                    </> : null
                }
                
            </ul>
        </div>
    )
}

export default withRouter(Menu);