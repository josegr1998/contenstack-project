import styled from "styled-components";

const Hero = ({ data }) => {
  // console.log("im the hero data", data);
  return (
    <Wrapper>
      <div className='hero-container'>
        <div className='img-container'>
          <img src={data.hero_image.url} alt='' className='hero-img' />
          <h1>{data.hero_title}</h1>
          <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .img-container {
    width: 100%;
    height: calc(100vh - 4rem);
    position: relative;
  }
  h1 {
    position: absolute;
    top: 2rem;
    right: 50%;
    color: white;
    transform: translateX(50%);
    font-size: 4rem;
  }
  p {
    position: absolute;
    top: 30%;
    right: 50%;
    color: white;
    transform: translateX(50%);
    width: 40rem;
    font-size: 1.2rem;
  }
`;

export default Hero;
