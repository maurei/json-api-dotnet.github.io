import React from "react";
import ReactMarkdown from "react-markdown";
import Content from "./Content";
import glamorous from 'glamorous';

const Div = glamorous.div({
  marginLeft: '20px'
})

export default props => {
  return <Div>{props.children}</Div>;
};
