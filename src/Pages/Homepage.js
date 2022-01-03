import React from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Hero from "../Components/Hero";

const Homepage = ({ data, featuredProducts, global }) => {
  return (
    <div>
      <Hero data={data} />
      <FeaturedProducts featuredProducts={featuredProducts} global={global} />
    </div>
  );
};

export default Homepage;
