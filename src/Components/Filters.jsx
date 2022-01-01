import React from "react";
import styled from "styled-components";

const Filters = () => {
  return (
    <Wrapper>
      <div className='filter-container'>
        <h1>Im the filters component</h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;

  position: sticky;
  top: 2rem;
`;

export default Filters;
