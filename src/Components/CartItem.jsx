import React from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CartItem = ({ product }) => {
  console.log("im the cart product", product);
  return (
    <Wrapper>
      <div className='cart-item-container'>
        <div className='cart-img-container'>
          <img src={product.product_image.url} alt='' />
        </div>
        <div className='cart-item-info'>
          <h4 className='title'>{product.product_title}</h4>
          <p>$ {product.price}</p>
        </div>
        <div className='amount-container'>
          <AiOutlineMinus />
          <p>{product.amount}</p>
          <AiOutlinePlus />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 1rem;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cart-item-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .cart-img-container {
    width: 10rem;
    height: 8rem;
  }
  .amount-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export default CartItem;
