import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";
import GithubLink from "../../components/GithubLink";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Controllers</ContentHeader>
      <Example
        code={`
public class ArticlesController : JsonApiController<Article>
{
    public ArticlesController(
        IJsonApiContext jsonApiContext,
        IResourceService<Article> resourceService,
        ILoggerFactory loggerFactory) 
    : base(jsonApiContext, resourceService, loggerFactory)
    { }
}
        `}
      >
        {
          <span>
            You need to create controllers that inherit from&nbsp;
            <GithubLink path="Controllers/JsonApiController.cs">
              {"JsonApiController<TEntity>"}
            </GithubLink>
          </span>
        }
      </Example>

      <ContentHeader>Non-Integer Type Keys</ContentHeader>
      <Example
        md={`
If your model is using a type other than int for the primary key, 
you must explicitly declare it in the controller and service generic type definitions.
        `}
        code={`
public class ArticlesController : JsonApiController<Article, Guid>
//---------------------- ^^^^
{
    public ArticlesController(
        IJsonApiContext jsonApiContext,
        IResourceService<Article, Guid> resourceService,
        //--------------------- ^^^^

        ILoggerFactory loggerFactory) 
    : base(jsonApiContext, resourceService, loggerFactory)
    { }
}
        `}
      />

      <ContentHeader>Resource Access Control</ContentHeader>
      <Example
        md={`
It is often desirable to limit what methods are exposed on your controller.
The first way, you can do this is to simply inherit from \`BaseJsonApiController\` 
and explicitly declare what methods are available.

In this example, if a client attempts to do anything other than \`GET\` a resource, 
an \`HTTP 404 Not Found\` response will be returned since no other methods are exposed.

This approach is ok, but introduces some boilerplate that can easily be avoided.
        `}
        code={`
public class ArticlesController : BaseJsonApiController<Article>
{
    public ArticlesController(
        IJsonApiContext jsonApiContext,
        IResourceService<Article> resourceService) 
    : base(jsonApiContext, resourceService)
    { }

    [HttpGet]
    public override async Task<IActionResult> GetAsync() 
        => await base.GetAsync();

    [HttpGet("{id}")]
    public override async Task<IActionResult> GetAsync(TId id) 
        => await base.GetAsync(id);
}
        `}
      />

      <ContentHeader>Using ActionFilterAttributes</ContentHeader>
      <Example
        md={`
The next option is to use the \`ActionFilterAttribute\`s that ship with the library.
The available attributes are:
- \`NoHttpPost\`: disallow POST requests
- \`NoHttpPatch\`: disallow PATCH requests
- \`NoHttpDelete\`: disallow DELETE requests
- \`HttpReadOnly\`: all of the above

Not only does this reduce boilerplate, but it also provides a more meaningful HTTP response code.
An attempt to use one blacklisted methods will result in a \`HTTP 405 Method Not Allowed\` response. 
        `}
        code={`
[HttpReadOnly]
public class ArticlesController : BaseJsonApiController<Article>
{
    public ArticlesController(
        IJsonApiContext jsonApiContext,
        IResourceService<Article> resourceService) 
    : base(jsonApiContext, resourceService)
    { }
}
        `}
      />

      <ContentHeader>Implicit Access By Service Injection</ContentHeader>
      <Example
        md={`
Finally, you can control the allowed methods by supplying only the available service implementations.
In some cases, resources may be an aggregation of entities or a view on top of the underlying entities.
In these cases, there may not be a writable \`IResourceService\` implementation. In these cases, simply
inject the implementation that is available.

As with the ActionFilterAttributes, if a service implementation is not available to service
a request, \`HTTP 405 Method Not Allowed\` will be returned.

For more information about resource injection, see the next section titled Resource Services.
        `}
        code={`
public class ReportsController : BaseJsonApiController<Report> 
{
    public ReportsController(
        IJsonApiContext jsonApiContext, 
        IGetAllService<Report> getAll)
    : base(jsonApiContext, getAll: getAll)
    { }

    [HttpGet]
    public override async Task<IActionResult> GetAsync() 
        => await base.GetAsync();
}
        `}
      />
    </SplitPage>
  );
};
