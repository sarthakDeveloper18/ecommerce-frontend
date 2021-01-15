import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from './component/Auth/PrivateRoute';
import AdminRoute from './component/Auth/AdminRoute';
import Dashboard from './component/Dashboard/Dashboard';
import Home from './component/Home/Home';
import Signin from './component/User/Signin';
import Signup from './component/User/Signup';
import AdminDashboard from './component/Admin/AdminDashboard';
import AddCategory from './component/Admin/AddCategory';
import AddProduct from './component/Admin/AddProduct';
import EditProduct from './component/Admin/EditProduct';
import Shop from './component/Home/Shop';
import Product from './component/Home/Product';
import Cart from './component/Home/Cart';
import Order from './component/Admin/Order';
import Profile from './component/User/Profile';
import ManageProducts from './component/Admin/ManageProducts';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path = '/signin' exact component = {Signin}/>
                <Route path = '/signup' exact component = {Signup}/>
                <Route path = '/' exact component = {Home}/>
                <Route path = '/shop' exact component = {Shop}/>
                <Route path = '/cart' exact component = {Cart}/>
                <Route path = '/product/:productId' exact component = {Product}/>
                <PrivateRoute path = '/user/dashboard' exact component = {Dashboard} />
                <PrivateRoute path = '/profile/:userId' exact component = {Profile} />
                <AdminRoute path = '/admin/dashboard' exact component = {AdminDashboard} />
                <AdminRoute path = '/create/category' exact component = {AddCategory} />
                <AdminRoute path = '/create/product' exact component = {AddProduct} />
                <AdminRoute path = '/admin/product/update/:productId' exact component = {EditProduct} />
                <AdminRoute path = '/admin/orders' exact component = {Order} />
                <AdminRoute path = '/admin/products' exact component = {ManageProducts} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;