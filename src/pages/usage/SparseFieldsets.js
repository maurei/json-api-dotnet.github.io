import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Sparse Field Selection</ContentHeader>
      <Example
        md={`
We currently support top-level field selection. 
What this means is you can restrict which fields are returned by a query using the fields
query parameter, but this does not yet apply to included relationships.
        `}
      />

      <Example
        md={`
Currently valid
        `}
        lang={"http"}
        code={`
GET /articles?fields[articles]=title,body HTTP/1.1
Accept: application/vnd.api+json
        `}
      />

      <Example
        md={`
Not yet supported
        `}
        lang={"http"}
        code={`
GET /articles?include=author&fields[articles]=title,body&fields[people]=name HTTP/1.1
Accept: application/vnd.api+json
        `}
      />
    </SplitPage>
  );
};
