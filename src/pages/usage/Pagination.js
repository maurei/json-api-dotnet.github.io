import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Pagination</ContentHeader>
      <Example
        md={`
Resources can be paginated. 
This query would fetch the second page of 10 articles (articles 11 - 21).
        `}
        lang={"http"}
        code={`
GET /articles?page[size]=10&page[number]=2 HTTP/1.1
Accept: application/vnd.api+json
        `}
      />
    </SplitPage>
  );
};
