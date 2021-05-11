import React from "react";

import "../../styles/product-card.css";
import CardBody from "./body";
import CardHeader from "./header";
import CardFooter from "./footer";

const productToProps = (product) => {
  return {
    headerProps: {
      name: product.name,
      platformLogos: product.platforms.map(
        (platform) => platform.platform_logo.url,
      ),
    },
    bodyProps: {
      cover: product.cover.url,
      summary: product.summary,
      genres: product.genres.map((genre) => genre.name),
      screenshots: product.screenshots.map((sc) => sc.url).slice(0, 4),
      firstReleaseDate: product.first_release_date,
    },
    footerProps: {
      slug: product.slug,
    },
  };
};

const ProductCard = ({ product }) => {
  const { headerProps, bodyProps, footerProps } = productToProps(product);

  return (
    <div className="product-card">
      <CardHeader {...headerProps} />
      <CardBody {...bodyProps} />
      <CardFooter {...footerProps} />
    </div>
  );
};

export default ProductCard;
