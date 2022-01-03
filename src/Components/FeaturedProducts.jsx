import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Contentstack from "contentstack";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/Context";

const Stack = Contentstack.Stack({
  api_key: "blt380c14e4c6d23425",
  delivery_token: "cs1e03691a7eb82361a53a5f28",
  environment: "production",
});

const FeaturedProducts = ({ featuredProducts, global }) => {
  const [products, setProducts] = useState([]);
  const { language } = useAppContext();

  useEffect(() => {
    const Query = Stack.ContentType("ui_product").Query();

    const id = featuredProducts.reference.map((item) => {
      return item.uid;
    });

    // console.log(id);

    id.forEach((id) => {
      Query.where("uid", id)
        .language(language)
        .toJSON()
        .find()
        .then((res) => {
          // console.log("im the product response", res);
          setProducts((old) => {
            old = [...old, res[0][0]];
            return old;
          });
        });
    });
  }, []);

  // console.log(products);

  // console.log("im the featured products", featuredProducts);
  if (products.length > 0) {
    return (
      <Wrapper background={global.background_color}>
        <div className='section-container'>
          <h1 className='title'>{featuredProducts.title}</h1>
          <div className='products-container'>
            {products.map((product) => {
              return (
                <Link
                  to={`/products/${product.uid}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "2rem",
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
              );
            })}
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

const Wrapper = styled.section`
  background: ${(props) => props.background};
  padding-top: 2rem;
  padding-bottom: 2rem;

  .title {
    text-transform: capitalize;
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
  .products-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
    row-gap: 2rem;
  }
  .product-price {
    font-size: 1.2rem;
    color: green;
  }
`;

export default FeaturedProducts;
