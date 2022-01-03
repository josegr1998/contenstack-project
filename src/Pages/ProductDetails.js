import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contentstack from "contentstack";
import styled from "styled-components";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import RelatedProducts from "../Components/RelatedProducts";
import Stack from "../Client/Client";
import { useAppContext } from "../Context/Context";

const ProductDetails = ({ data }) => {
  const [product, setProduct] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart, openCart, language } = useAppContext();

  console.log(data);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const Query = Stack.ContentType("ui_product").Query();
    Query.where("uid", id)
      .language(language)
      .toJSON()
      .find()
      .then((res) => setProduct(res[0][0]));
  }, [id]);

  useEffect(() => {
    const RelatedQuery = Stack.ContentType("ui_product").Query();
    if (product) {
      const id = product.related_products.map((product) => {
        return product.uid;
      });

      id.forEach((id) => {
        RelatedQuery.where("uid", id)
          .language(language)
          .toJSON()
          .find()
          .then((res) => {
            setRelatedProducts((old) => {
              old = [res[0][0], ...old];
              return old.slice(0, 3);
            });
          });
      });
    }
  }, [product]);

  if (product) {
    return (
      <Wrapper>
        <div className='product-container'>
          <h1 className='main-title'>{product.product_title}</h1>
          <div className='product-img-container'>
            <img src={product.product_image.url} alt='' />
          </div>
          <div className='product-desc-container'>
            <p
              className='product-desc'
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
          </div>
          <div className='aditional-info'>
            <p>
              {data.price}: ${product.price}
            </p>
            <p className='free-shipping'>
              {data.free_shipping}:{" "}
              {product.free_shiping ? (
                <AiOutlineCheck className='success' />
              ) : (
                <AiOutlineClose className='danger' />
              )}
            </p>
            <p className='rating'>Ratings: {product.rating}/5</p>
          </div>
          <button
            className='btn buy-btn'
            onClick={() => {
              addToCart(product.uid);
              openCart();
            }}
          >
            {data.add_to_cart}
          </button>
        </div>
        <section className='related-products'>
          <RelatedProducts relatedProducts={relatedProducts} global={data} />
        </section>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

const Wrapper = styled.section`
  .product-container {
    max-width: 1170px;
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .section-title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.7rem;
  }
  .product-img-container {
    width: 70vw;
    margin: 0 auto;
    height: 30rem;
  }
  .product-desc {
    width: 70vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .success {
    color: green;
  }
  .danger {
    color: red;
  }
  .aditional-info {
    display: flex;
    font-size: 1.2rem;
    width: 70vw;
    justify-content: space-between;
  }
  .btn {
    font-size: 1.2rem;
    width: 10rem;
    cursor: pointer;
    border: transparent;
    background: #baccba;
    padding: 0.5rem;
    transition: all 0.3s linear;
    margin-bottom: 2rem;
  }
  .btn:hover {
    background: #03aa03;
  }
`;

export default ProductDetails;
