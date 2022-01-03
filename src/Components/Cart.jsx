import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../Context/Context";
import CartItem from "./CartItem";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = ({ data }) => {
  console.log("im the cart data", data);
  const { cart, closeCart, isCartOpen, getTotal, totalAmount } =
    useAppContext();

  useEffect(() => {
    getTotal();
  }, [isCartOpen, cart]);

  return (
    <Wrapper>
      <div
        className={`cart-container ${!isCartOpen && `isHidden`}`}
        style={{ background: "#dee2d3" }}
      >
        <div className='cart-header'>
          <h1 className='main-title'>{data.presentation}</h1>
          <AiOutlineClose onClick={closeCart} className='icon' />
        </div>

        {cart.length > 0 ? (
          <>
            {cart.map((item) => {
              return (
                <>
                  <CartItem product={item} data={data} />
                </>
              );
            })}
            <h2 className='total'>
              {data.pay_total} ${totalAmount}
            </h2>
            <button className='btn'>Checkout</button>
          </>
        ) : (
          <div className='empty-container'>
            <h2>{data.empty_message}</h2>
            <Link to={"/products"} className='btn' onClick={closeCart}>
              {data.fill_cart}
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .total {
    padding: 1rem;
  }
  .icon {
    cursor: pointer;
    font-size: 1.4rem;
    transition: all 0.3s linear;
  }
  .icon:hover {
    color: red;
  }
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .main-title {
    text-align: center;
  }
  .cart-container {
    background-color: #033f63;
    position: fixed;
    top: 0;
    left: 0;
    width: 600px;
    height: 100%;
    background: white;
    z-index: 100;
    transition: all 0.3s linear;
  }
  .cart-container.isHidden {
    opacity: 0;
    z-index: 0;
    width: 0;
    height: 0;
  }
  .empty-container {
    padding: 1rem;
    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
  }
  .btn {
    font-size: 1.2rem;
    text-decoration: none;
    color: black;
    cursor: pointer;
    border: 1px solid black;
    padding: 0.25rem;
    width: 7rem;
    margin: 0 auto;
    display: block;
    text-align: center;
    border-radius: 1rem;
    transition: all 0.3s linear;
    background: transparent;
  }
  .btn:hover {
    background: black;
    color: white;
  }
`;

export default Cart;
