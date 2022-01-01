import React, { useState, useEffect } from "react";
import Contentstack from "contentstack";
import styled from "styled-components";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Stack = Contentstack.Stack({
  api_key: "blt380c14e4c6d23425",
  delivery_token: "cs1e03691a7eb82361a53a5f28",
  environment: "production",
});

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const Query = Stack.ContentType("ui_product").Query();
    Query.toJSON()
      .find()
      .then((res) => setProducts(res[0]));
  }, []);

  console.log("products details page", products);

  return (
    <Wrapper>
      <div className='section-container'>
        <div className='filters'>
          <Filters />
        </div>
        <div className='products-container'>
          {products.length > 0 &&
            products.map((product) => {
              return <SingleProduct product={product} />;
            })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #fedc97;
  padding-top: 2rem;
  padding-bottom: 2rem;

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
