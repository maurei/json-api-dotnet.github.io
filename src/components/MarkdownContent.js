import React from "react";
import ReactMarkdown from "react-markdown";
import Content from "./Content";

export default props => {
  return <Content render={() => <ReactMarkdown source={props.md} />} />;
};
