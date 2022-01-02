import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = ({ data }) => {
  console.log(data);
  return (
    <Wrapper>
      <div className='footer-container'>
        <div className='links-container'>
          <Link to='/'>{data.link_1}</Link>
          <Link to={data.link_2.toLowerCase()}>{data.link_2}</Link>
          <Link to={data.link_3.toLowerCase()}>{data.link_3}</Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 4rem;
  background: black;
  color: white;
  a {
    color: white;
    text-decoration: none;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: all 0.3s linear;
  }
  a:hover {
    color: #a1a0a0;
  }
  .links-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 4rem;
    font-size: 1.2rem;
  }
`;

export default Footer;
