import React from "react";
import Example from "../../components/Example";

export default () => {
  return (
    <div>
      <Example
        md={`
  # Unsupported Request Method
  
  Indicates that the service required to handle the request has not been provided to the base controller.
  This example demonstrates a scenario that would result in this error.
  
  In this example, the controller only requests the \`IGetAllService\` and therefore has no
  \`IGetByIdService\` to handle the request.
        `}
        code={`
  public class ArticlesController : JsonApiController<Article>
  {
      public JsonApiController(
          IJsonApiContext jsonApiContext,
          IGetAllService<Article> getAll
      ) : base(jsonApiContext, getAll: getAll)
      { }
  }
      `}
      />
      <Example
        lang="http"
        code={`
  GET /api/v1/todo-items/1 HTTP/1.1
  Host: localhost:5000
      `}
      />
      <Example
        lang="json"
        code={`
  {
      "errors": [
          {
              "title": "Request method is not supported.",
              "detail": "",
              "status": "405",
              "source": "https://json-api-dotnet.github.io/#/errors/UnSupportedRequestMethod",
              "meta": {
                  "stackTrace": [
                  "JsonApiDotNetCore.Internal.JsonApiException: Request method is not supported."
                  ]
              }
          }
      ]
  }
      `}
      />
      <Example
        md={`
  If the controller _should_ be able to handle these requests, you should make sure
  the controller has the required implementation.
        `}
        code={`
  public class ArticlesController : JsonApiController<Article>
  {
      public JsonApiController(
          IJsonApiContext jsonApiContext,
          IGetAllService<Article> getAll,
          IGetByIdService<Article> getById
      ) : base(jsonApiContext, getAll: getAll, getById: getById)
      { }
  }
      `}
      />
    </div>
  );
};
