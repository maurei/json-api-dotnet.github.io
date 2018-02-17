import React from "react";
import Content from "./Content";

const ContentHeader = props => {
  let id = props.children.replace(" ", "_").toLowerCase();
  return (
    <Content
      render={() => (
        <div>
          <h1 id={id}>
            <a>#</a> {props.children}
          </h1>
        </div>
      )}
    />
  );
};

export default ContentHeader;
