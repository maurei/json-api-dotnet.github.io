import React from "react";
import Content from "./Content";

const ContentHeader = props => {
  return (
    <Content
      render={() => (
        <div>
          <h1>{props.children}</h1>
        </div>
      )}
    />
  );
};

export default ContentHeader;
