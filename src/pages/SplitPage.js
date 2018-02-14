import React from "react";

export default props => {
  return (
    <div className="page-container">
      <div>{props.children}</div>
    </div>
  );
};
