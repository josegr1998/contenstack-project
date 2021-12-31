import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import Hero from "./Hero";

const Homepage = ({ data, featuredProducts }) => {
  return (
    <div>
      <Hero data={data} />
      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
};

export default Homepage;
