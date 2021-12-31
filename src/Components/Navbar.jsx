import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = ({ data }) => {
  return (
    <Wrapper>
      <nav className='nav-container'>
        <h2 className='nav-title'>{data.title}</h2>
        <div className='navbar-links-container'>
          <ul className='list'>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              <li className='list-item'>{data.link_1}</li>
            </Link>

            <li className='list-item'>{data.link_2}</li>
            <li className='list-item'>{data.link_3}</li>
            <li className='list-item' style={{ marginRight: "1rem" }}>
              {data.link_4}
            </li>
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
`;

export default Navbar;
