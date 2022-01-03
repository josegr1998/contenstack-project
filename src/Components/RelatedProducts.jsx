import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RelatedProducts = ({ relatedProducts, global }) => {
  const moveTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <h1 className='section-title'>{global.related_products}</h1>
      <div className='related-products-container'>
        {relatedProducts.map((product) => {
          return (
            <Link
              onClick={moveTop}
              to={`/products/${product.uid}`}
              style={{
                textDecoration: "none",
                display: "block",
                marginBottom: "2rem",
              }}
            >
              <div className='single-product'>
                <div className='related-img-container'>
                  <img src={product.product_image.url} alt='' />
                </div>
                <div className='related-title'>
                  <h2>{product.product_title}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #fedc97;
  padding-top: 2rem;
  .section-title {
    margin-bottom: 2rem;
  }

  .related-img-container {
    max-width: 40rem;
    height: 20rem;
  }
  .related-products-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1170px;
    margin: 0 auto;
  }
  .single-product {
    transition: all 0.3s linear;
  }
  .single-product:hover {
    transform: scale(1.03);
  }
  .related-title {
    color: black;
  }
`;

export default RelatedProducts;
