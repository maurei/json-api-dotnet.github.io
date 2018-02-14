import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Including Relationships</ContentHeader>
      <Example
        md={`
JADNC supports [request include params](http://jsonapi.org/format/#fetching-includes) out of the box, 
for side loading related resources.
        `}
        lang={"http"}
        code={`
GET /articles/1?include=comments HTTP/1.1
Accept: application/vnd.api+json
        `}
      />
      <Example
        md={``}
        lang={``}
        code={`
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    },
    "relationships": {
      "comments": {
        "links": {
          "self": "http://example.com/articles/1/relationships/comments",
          "related": "http://example.com/articles/1/comments"
        },
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    }
  },
  "included": [
    {
      "type": "comments",
      "id": "5",
      "attributes": {
        "body": "First!"
      }
    }, 
    {
      "type": "comments",
      "id": "12",
      "attributes": {
        "body": "I like XML better"
      }
    }
  ]
}
        `}
      />
    </SplitPage>
  );
};
