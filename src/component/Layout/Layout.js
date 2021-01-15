import React from 'react';
import Menu from '../Home/Menu';
import '../../styles.css';

const Layout = (props) => {
    return(
        <div>
            <Menu />
            <div className='jumbotron'>
                <h2>{props.title}</h2>
                <p className='lead'>{props.description}</p>
            </div>
            <div className={props.className}>{props.children}</div>
        </div>
    )
}

export default Layout;