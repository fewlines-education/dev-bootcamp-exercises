import React from "react";

const CardFooter = ({ slug }) => {
  return (
    <div className="product-card--footer bg-dark">
      <a href={`games/${slug}`}>See more</a>
    </div>
  );
};

export default CardFooter;
