import React from "react";

export const HideOrNotHide = () => {
  const [hidden, setHidden] = React.useState(false);

  return (
    <div>
      <button onClick={() => setHidden(!hidden)}>
        {hidden ? "Reveal content" : "Hide content"}
      </button>
      {!hidden && <p className="content">This is my text</p>}
    </div>
  );
};
