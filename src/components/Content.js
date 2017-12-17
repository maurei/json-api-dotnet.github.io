import React from "react";

const Content = props => {
  return (
    <div className="content-container">
      <div className="example-content">{props.render()}</div>
    </div>
  );
};

export default Content;
