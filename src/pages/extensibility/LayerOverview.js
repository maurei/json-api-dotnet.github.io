import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Layer Overview</ContentHeader>
      <HtmlContent>
      By default, data retrieval is distributed across 3 layers:

<p>
<a href="https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/Controllers/JsonApiController.cs">JsonApiController</a> (required)
<br />
└── <a href="https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/Services/EntityResourceService.cs">EntityResourceService</a> : <a href="https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/Services/Contract/IResourceService.cs">IResourceService</a>
<br />
&nbsp;&nbsp;&nbsp;&nbsp;└── <a href="https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/Data/DefaultEntityRepository.cs">DefaultEntityRepository</a> : <a href="https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/Data/IEntityRepository.cs">IEntityRepository</a>
</p>
      </HtmlContent>
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
