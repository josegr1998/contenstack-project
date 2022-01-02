import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppContext } from "../Context/Context";

const Navbar = ({ data }) => {
  const { openCart } = useAppContext();
  return (
    <Wrapper>
      <nav className='nav-container'>
        <div className='header'>
          <h2 className='nav-title'>{data.title}</h2>
          <AiOutlineShoppingCart className='cart-icon' onClick={openCart} />
        </div>

        <div className='navbar-links-container'>
          <ul className='list'>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              <li className='list-item'>{data.link_1}</li>
            </Link>
            <Link
              to={"/products"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <li className='list-item'>{data.link_2}</li>
            </Link>
            <Link
              to={"/about"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <li className='list-item' style={{ marginRight: "1rem" }}>
                {data.link_3}
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  .nav-container {
    height: 4rem;
    background: #fedc97;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  .nav-title {
    margin-left: 1rem;
  }
  .list {
    list-style-type: none;
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
    transition: all 0.3s linear;
  }
  .list-item:hover {
    color: white;
    cursor: pointer;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .cart-icon {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export default Navbar;
