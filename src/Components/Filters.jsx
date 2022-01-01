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
          <div className='price-filters'>
            <p className='price-filter'>Price</p>
            <div className='price-inputs-container'>
              <input
                type='text'
                placeholder='min'
                name='min-price'
                className='price'
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='max'
                name='max-price'
                className='price'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='free-shiping-container'>
            <p className='price-filter'>Free Shipping</p>
            <input
              type='checkbox'
              name='free-shiping'
              className='check'
              onChange={handleChange}
            />
          </div>
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
    margin-bottom: 1rem;
    display: block;
  }
  .check {
    display: block;
  }
  .price {
    margin-bottom: 1rem;
    width: 3rem;
    height: 2rem;
  }
  .price-filters {
    display: block;
  }
  .price-filter {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .price-inputs-container {
    display: flex;
    gap: 1rem;
  }
  .check {
    width: 1.2rem;
    height: 1.2rem;
  }
  .free-shiping-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

export default Filters;
