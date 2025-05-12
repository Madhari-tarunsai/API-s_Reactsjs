
import React, { Component } from 'react';
import './Products.css';

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false
    };
  }

  handlerClick = () => {
    this.setState({ loading: true });
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data, loading: false });
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className="products-container">
        <button className="fetch-button" onClick={this.handlerClick}>Click Here</button>
        {this.state.loading && <p>Loading...</p>}
        <div className="card-list">
          {this.state.products.map(product => (
            <div key={product.id} className="card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="card-body">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-category"><strong>Category:</strong> {product.category}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price"><strong>Price:</strong> ${product.price}</p>
                <p className="product-rating">
                  <strong>Rating:</strong> {product.rating.rate} ⭐ ({product.rating.count} reviews)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
