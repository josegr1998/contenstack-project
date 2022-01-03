import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useAppContext } from "../Context/Context";

const CartItem = ({ product, data }) => {
  const { deleteCartItem, toggleAmount } = useAppContext();
  console.log(data);

  return (
    <Wrapper>
      <div className='cart-item-container'>
        <div className='cart-img-container'>
          <img src={product.product_image.url} alt='' />
        </div>
        <div className='cart-item-info'>
          <h4 className='title'>{product.product_title.slice(0, 40)}</h4>
          <p>$ {product.price}</p>
        </div>
        <div className='amount-container'>
          <AiOutlineMinus
            className='amount-btn'
            onClick={() => toggleAmount(product.uid, "dec")}
          />
          <p>{product.amount}</p>
          <AiOutlinePlus
            className='amount-btn'
            onClick={() => toggleAmount(product.uid, "inc")}
          />
        </div>
      </div>
      <button
        className='delete-btn'
        onClick={() => deleteCartItem(product.uid)}
      >
        {data.delete_field}
      </button>
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
  .delete-btn {
    width: 10rem;
    background: transparent;
    border: 1px solid black;
    transition: all 0.3s linear;
  }
  .delete-btn:hover {
    color: white;
    background: black;
    cursor: pointer;
  }
  .amount-btn {
    cursor: pointer;
  }
`;

export default CartItem;
