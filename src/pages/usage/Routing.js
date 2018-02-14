import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Routing</ContentHeader>
      <Example
        md={`
By default the library will configure routes for each controller. 
Based on the [recommendations](http://jsonapi.org/recommendations/) outlined in the 
JSONAPI spec, routes are hyphenated.
        `}
        lang={"http"}
        code={`
GET /api/compound-models HTTP/1.1
Accept: application/vnd.api+json
        `}
      />
      <ContentHeader>Namespacing and Versioning URLs</ContentHeader>
      <Example
        md={`
You can add a namespace to the URL by specifying it in \`ConfigureServices\`
        `}
        code={`
public IServiceProvider ConfigureServices(IServiceCollection services) {
  services.AddJsonApi<AppDbContext>(
      opt => opt.Namespace = "api/v1");
}
        `}
      />
      <ContentHeader>Disable Convention</ContentHeader>
      <Example
        md={`
You can disable the dasherized convention and specify your own template by using 
the \`DisableRoutingConvention\` Attribute.
        `}
        code={`
[Route("[controller]")]
[DisableRoutingConvention]
public class CamelCasedModelsController : JsonApiController<CamelCasedModel> {
    public CamelCasedModelsController(
        IJsonApiContext jsonApiContext,
        IResourceService<CamelCasedModel> resourceService,
        ILoggerFactory loggerFactory) 
        : base(jsonApiContext, resourceService, loggerFactory)
    { }
}
        `}
      />

      <Example
        md={`
It is important to note that your routes must still end with the model name in the same 
format as the resource name. This is so that we can build accurate resource links in the 
json:api document. For example, if you define a resource as \`MyModels\` the controller 
route must match.
        `}
        code={`
public IServiceProvider ConfigureServices(IServiceCollection services) {
  services.AddJsonApi(options => {
      options.BuildContextGraph((builder) => {
          builder.AddResource<TodoItem>("myModels"); // camelCased
      });
  });
}

// controller definition
[Route("api/myModels"), DisableRoutingConvention]
public class MyModelsController : JsonApiController<TodoItem> { 
  //...
}
        `}
      />
    </SplitPage>
  );
};
