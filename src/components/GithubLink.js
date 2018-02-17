import React from "react";
import Highlight from "react-highlight";

const root =
  "https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/";

const GithubLink = props => {
  return (
    <a target="blank" href={root + props.path}>
      {props.children}
    </a>
  );
};

export default GithubLink;
