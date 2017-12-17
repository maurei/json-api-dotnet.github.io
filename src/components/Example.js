import React from "react";
import ExampleContent from "./ExampleContent";
import Code from "./Code";
import ReactMarkdown from "react-markdown";

const Example = props => {
  return (
    <div className="content-container">
      <ExampleContent>
        <ReactMarkdown source={props.md} />
      </ExampleContent>
      <Code lang={props.lang}>{props.code}</Code>
    </div>
  );
};

export default Example;
