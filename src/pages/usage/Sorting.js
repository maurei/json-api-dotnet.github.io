import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Sorting</ContentHeader>
      <Example
        md={`
Resources can be sorted by an attribute. 
The default sort order is ascending.
To sort descending, prepend the sort key with a minus (\`-\`) sign.
        `}
      />

      <Example
        md={`
Ascending
        `}
        lang={"http"}
        code={`
GET /api/articles?sort=author HTTP/1.1
Accept: application/vnd.api+json
        `}
      />

      <Example
        md={`
Descending
        `}
        lang={"http"}
        code={`
GET /api/articles?sort=-author HTTP/1.1
Accept: application/vnd.api+json
        `}
      />
    </SplitPage>
  );
};
