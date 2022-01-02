import React, { useEffect, useState } from "react";
import Stack from "../Client/Client";
import styled from "styled-components";

const About = () => {
  const Query = Stack.ContentType("about").Query();
  const [pageData, setPageData] = useState("");

  useEffect(() => {
    Query.toJSON()
      .find()
      .then((res) => {
        setPageData(res[0][0]);
      });
  }, []);

  console.log(pageData);

  if (pageData) {
    return (
      <Wrapper>
        <div className='section-container'>
          <h1 className='section-title'>{pageData.title}</h1>
          <div className='page-container'>
            <div className='image-container'>
              <img src={pageData.about_image.url} alt='' />
            </div>
            <div className='desc-container'>
              <p
                className='desc'
                dangerouslySetInnerHTML={{ __html: pageData.description }}
              ></p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

const Wrapper = styled.section`
  min-height: calc(100vh - 9rem);
  .section-title {
    margin-bottom: 2rem;
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .page-container {
    max-width: 1170px;
    display: flex;
    margin: 0 auto;
    gap: 10rem;
    align-items: center;
  }
`;

export default About;
