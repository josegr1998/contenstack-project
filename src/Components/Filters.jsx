import React from "react";
import styled from "styled-components";
import { useAppContext } from "../Context/Context";

const Filters = () => {
  const { searchProducts, setPrice, maxPrice, freeShiping } = useAppContext();

  const handleChange = (e) => {
    if (e.target.name === "search") {
      searchProducts(e.target.value);
    }
    if (e.target.name === "min-price") {
      if (Number(e.target.value) > 50) {
        setPrice(Number(e.target.value), "min");
      }
    }
    if (e.target.name === "max-price") {
      if (!e.target.value) {
        setPrice(Number(maxPrice), "max");
      }
      if (Number(e.target.value) > 50) {
        setPrice(Number(e.target.value), "max");
      }
    }
    if (e.target.name === "free-shiping") {
      freeShiping(e.target.checked);
    }
  };

  return (
    <Wrapper>
      <div className='filter-container'>
        <h2>Search your favorite products</h2>
        <form className='filters'>
          <input
            type='text'
            className='search-bar'
            name='search'
            onChange={handleChange}
            placeholder='Search...'
          />
          <input
            type='text'
            placeholder='min-price'
            name='min-price'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='max-price'
            name='max-price'
            onChange={handleChange}
          />
          <p>Free Shipping</p>
          <input
            type='checkbox'
            name='free-shiping'
            className='check'
            onChange={handleChange}
          />
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  position: sticky;
  top: 2rem;
  padding: 1rem;
  .search-bar {
    padding: 0.25rem;
    width: 90%;
  }
  .check {
    display: block;
  }
`;

export default Filters;
