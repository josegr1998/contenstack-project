import React from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Hero from "../Components/Hero";

const Homepage = ({ data, featuredProducts }) => {
  return (
    <div>
      <Hero data={data} />
      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
};

export default Homepage;
