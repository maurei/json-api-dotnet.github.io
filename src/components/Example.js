import React from "react";
import ExampleContent from "./ExampleContent";
import Code from "./Code";
import ReactMarkdown from "react-markdown";
import HtmlContent from "./HtmlContent";

const Example = props => {
  return (
    <div className="content-container">
      {props.md ? (
        <ExampleContent>
          <ReactMarkdown source={props.md} />
        </ExampleContent>
      ) : (
        <HtmlContent>{props.children}</HtmlContent>
      )}
      <Code lang={props.lang}>{props.code}</Code>
    </div>
  );
};

export default Example;
