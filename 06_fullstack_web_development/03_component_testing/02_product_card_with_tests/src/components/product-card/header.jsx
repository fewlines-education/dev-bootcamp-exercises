import React from "react";

const CardHeader = ({ name, platformLogos }) => {
  return (
    <div className="product-card--header bg-dark">
      <p>{name}</p>
      <div className="platform-logos">
        {platformLogos.map((logo, i) => (
          <img key={`ptf-logo-${i}`} src={logo} />
        ))}
      </div>
    </div>
  );
};

export default CardHeader;
