import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import 'react-select/dist/react-select.css';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';

import About from 'About';
import Cart from 'Cart';
import Categories from 'Categories';
import Collections from 'Collections';
import Contact from 'Contact';
import Gallery from 'Gallery';
import Home from 'Home';
import Login from 'Login';
import Main from 'Main';
import Navigation from 'Navigation';
import ProductDetails from 'ProductDetails';
import ProductAdd from 'ProductAdd';
import ProductUpdate from 'ProductUpdate';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/productadd" component={ProductAdd}/>
          <Route path="/productupdate/:id" component={ProductUpdate}/>
          <Route path="/cart(/:id)" component={Cart}/>
          <Route path="/login(/:action)" component={Login}/>
          <Route path="/products/:id/:category" component={Categories}/>
          <Route path="/collections/:category/:id/:collection" component={Collections}/>
          <Route path="/productdetails/:id" component={ProductDetails} />
        </Route>
      </Router>
    );
  }
}

export default App;
