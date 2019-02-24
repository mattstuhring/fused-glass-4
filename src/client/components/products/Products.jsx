import React from 'react';
import axios from 'axios';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router';
import Header from 'Header';
import Product from 'Product';
import { Image } from 'cloudinary-react';
import AuthService from 'AuthService';
const cloudName = 'fusedglassbyceleste';

export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();

    this.state = {
      auth: this.Auth.loggedIn(),
      categoryId: null,
      category: null,
      collectionId: null,
      collection: null,
      products: []
    };

    this.handlePath = this.handlePath.bind(this);
  }

  componentDidMount() {
    console.log('cat: ', this.props.params.category);
    console.log('catId: ', this.props.params.categoryId);
    console.log('col: ', this.props.params.collection);
    console.log('colId: ', this.props.params.collectionId);

    let path, id;
    if (!this.props.params.collection) {
      path = 'categories';
      id = this.props.params.categoryId;
    } else {
      path = 'collections';
      id = this.props.params.collectionId;
    }

    this.handlePath(path, id, this.props.params);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.params);
    if (!nextProps.params.collection) {
      console.log(1);
      if (this.state.categoryId !== nextProps.params.categoryId || this.state.collection !== nextProps.params.collection) {
        console.log(2);
        this.handlePath('categories', nextProps.params.categoryId, nextProps.params);
      }
    } else {
      console.log(3);
      if (this.state.collectionId !== nextProps.params.collectionId) {
        console.log(4);
        this.handlePath('collections', nextProps.params.collectionId, nextProps.params);
      }
    }
  }

  handlePath(path, id, params) {
    return axios.get(`/api/${path}/${id}`)
      .then((res) => {
        this.setState({
          products: res.data,
          category: params.category,
          categoryId: params.categoryId,
          collection: params.collection,
          collectionId: params.collectionId
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ********************  RENDER  ********************
  // **************************************************
  render() {
    const availableProducts = () => {
      if (this.state.products.length === 0) {
        return <div>
          <h4 className="text-center">
            <em>No products to display!</em>
          </h4>
        </div>;
      } else {
        return this.state.products.map((p) => {
          return <div key={p.product_id}>
            <Product
              edit={this.state.auth}
              productId={p.product_id}
              productImagePublicId={p.product_image_public_id}
              productName={p.product_name}
              productDescription={p.product_description}
              productPrice={p.product_price}
            />
          </div>
        });
      }
    }

    const displayHeader = () => {
      if (!this.props.params.collection) {
        return <Header category={this.props.params.category}/>
      } else {
        return <Header category={this.props.params.category} collection={this.props.params.collection}/>
      }
    }

    return (
      <div>
        {displayHeader()}

        {availableProducts()}
      </div>
    );
  }
}
