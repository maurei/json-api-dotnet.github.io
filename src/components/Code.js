import React from "react";
import Highlight from "react-highlight";

const Code = props => {
  return <Highlight className={(props.lang || "cs")}>{props.children}</Highlight>;
};

export default Code;
