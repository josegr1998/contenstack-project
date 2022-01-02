import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SingleProduct = ({ product }) => {
  return (
    <Wrapper>
      <div className='single-article'>
        <Link
          to={`/products/${product.uid}`}
          style={{
            textDecoration: "none",
            display: "block",
            height: "100%",
          }}
        >
          <div className='single-product'>
            <div className='product-img-container'>
              <img src={product.product_image.url} alt='' />
            </div>
            <div className='product-title-container'>
              <h2 className='product-title'>{product.product_title}</h2>
            </div>
            <div className='product-price-container'>
              <p className='product-price'>from ${product.price}</p>
            </div>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .single-article {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .section-container {
    max-width: 1170px;
    margin: 0 auto;
  }
  .product-img-container {
    height: 20rem;
  }
  .product-title {
    color: black;
    text-transform: capitalize;
  }
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .single-product {
    background: white;
    padding: 1rem;
    height: 100%;
    transition: all 0.3s linear;
  }
  .single-product:hover {
    transform: scale(1.03);
  }
  .product-price {
    font-size: 1.2rem;
    color: green;
  }
`;

export default SingleProduct;
