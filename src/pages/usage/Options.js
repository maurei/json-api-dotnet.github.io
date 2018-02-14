import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Global Options</ContentHeader>
      <Example
        md={`
Configuration can be applied when adding the services to the DI container.
        `}
        code={`
public IServiceProvider ConfigureServices(IServiceCollection services) {
    services.AddJsonApi<AppDbContext>(options => {
        // configure the options here
    });
}
        `}
      />

      <ContentHeader>Client Generated Ids</ContentHeader>
      <Example
        md={`
By default, the server will respond with a \`403 Forbidden\` HTTP Status Code if a \`POST\` 
request is received with a client generated id. 

However, this can be allowed by setting the \`AllowClientGeneratedIds\` flag in the options`}
        code={`
options.AllowClientGeneratedIds = true;
`}
      />

      <ContentHeader>Pagination</ContentHeader>
      <Example
        md={`
If you would like pagination implemented for all resources, 
you can specify a default page size.
`}
        code={`
options.DefaultPageSize = 10
`}
      />
      <Example
        md={`
You can also include the total number of records in each request.
Note that when using this feature, it does add some query overhead since we have to
also request the total number of records.
`}
        code={`
options.IncludeTotalRecordCount = true;
`}
      />

      <ContentHeader>Relative Links</ContentHeader>
      <Example
        md={`
All links are absolute by default. However, you can configure relative links.
`}
        code={`
options.RelativeLinks = true
`}
      />
      <Example
        lang="json"
        code={`
{
  "type": "articles",
  "id": "4309",
  "relationships": {
     "author": {
       "links": {
         "self": "/api/v1/articles/4309/relationships/author",
         "related": "/api/v1/articles/4309/author"
       }
     }
  }
}
`}
      />

      <ContentHeader>Custom Query Parameters</ContentHeader>
      <Example
        md={`
If you would like to use custom query params (parameters not reserved by the json:api specification), 
you can set \`AllowCustomQueryParameters = true\`.
The default behavior is to return an HTTP 400 Bad Request for unknown query parameters.
`}
        code={`
options.AllowCustomQueryParameters = true
`}
      />

      <ContentHeader>Custom Serializer Settings</ContentHeader>
      <Example
        md={`
We use Newtonsoft.Json for all serialization needs. 
If you want to change the default serializer settings, you can:
`}
        code={`
options.SerializerSettings = new JsonSerializerSettings()
{
    NullValueHandling = NullValueHandling.Ignore,
    ContractResolver = new DasherizedResolver()
}
`}
      />
    </SplitPage>
  );
};
