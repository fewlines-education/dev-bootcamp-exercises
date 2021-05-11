import React, { useState } from "react";

const CardBody = ({
  cover,
  genres,
  screenshots,
  summary,
  firstReleaseDate,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="product-card--body">
      <div id="cover">
        <img src={cover} />
      </div>

      <div className="product-information">
        <p className="product-information--date">
          Release Date: {firstReleaseDate}
        </p>
        <p className="product-information--genre">{genres.join(", ")}</p>
        <p className="product-information--summary">{summary}</p>
      </div>
      {show ? (
        <div className="product-screenshots">
          <button
            id="close-button"
            className="btn btn-dark"
            onClick={() => setShow(false)}
          >
            X
          </button>
          {screenshots.map((screenshot, i) => (
            <img key={`screenshot-${i}`} src={screenshot} />
          ))}
        </div>
      ) : (
        <div className="product-screenshots">
          <button onClick={() => setShow(true)} className="btn btn-dark m-2">
            Show screenshots
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBody;
