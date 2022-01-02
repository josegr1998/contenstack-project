import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filters from "../Components/Filters";
import SingleProduct from "../Components/SingleProduct";
import { useAppContext } from "../Context/Context";
import Stack from "../Client/Client";

const Products = () => {
  const { filteredProducts } = useAppContext();

  return (
    <Wrapper>
      <div className='section-container'>
        <div className='filters'>
          <Filters />
        </div>
        <div className='products-container'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              return <SingleProduct product={product} />;
            })
          ) : (
            <h1>Sorry, no products found...</h1>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #fedc97;
  padding-top: 2rem;
  padding-bottom: 4rem;
  min-height: calc(100vh - 4rem);

  .section-container {
    max-width: 1170px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 300px 1fr;
    column-gap: 2rem;
  }

  .products-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    row-gap: 4rem;
  }
`;

export default Products;
