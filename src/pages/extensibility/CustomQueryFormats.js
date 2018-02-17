import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";
import GithubLink from "../../components/GithubLink";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Custom Query Formats</ContentHeader>
      <Example
        md={`
For information on the default query parameter formats, 
see the documentation for each query method.

In order to customize the query formats, 
you need to implement the IQueryParser interface and inject it.
        `}
        code={`services.AddScoped<IQueryParser, FooQueryParser>();`}
      />
    </SplitPage>
  );
};
