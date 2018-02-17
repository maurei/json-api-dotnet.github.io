import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";
import GithubLink from "../../components/GithubLink";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Resource Services</ContentHeader>
      <Example
        md={`
The [IResourceService](https://github.com/json-api-dotnet/JsonApiDotNetCore/blob/master/src/JsonApiDotNetCore/Services/Contract/IResourceService.cs) 
acts as a service layer between the controller and the data access layer. 
This allows you to customize it however you want and not be dependent upon Entity Framework. 
This is also a good place to implement custom business logic.
        `}
      />

      <ContentHeader>Supplementing Default Behavior</ContentHeader>
      <Example
        md={`
If you don't need to alter the actual persistence mechanism, you can inherit from the
\`EntityResourceService<TModel>\` and override the existing methods.
In simple cases, you can also just wrap the base implementation with your custom logic.


A simple example would be to send notifications when an entity gets created.
        `}
        code={`
public class TodoItemService : EntityResourceService<TodoItem> 
{
    private readonly INotificationService _notificationService;

    public TodoItemService(
        IJsonApiContext jsonApiContext,
        IEntityRepository<T, TId> repository,
        ILoggerFactory loggerFactory,
        INotificationService notificationService) 
    : base(jsonApiContext, repository, loggerFactory)
    {
        _notificationService = notificationService;
    }

    public override async Task<TEntity> CreateAsync(TEntity entity)
    {
        // call the base implementation which uses Entity Framework
        var newEntity = await base.CreateAsync(entity);

        // custom code
        _notificationService.Notify($"Entity created: { newEntity.Id }");

        // don't forget to return the new entity
        return entity;
    }
}
        `}
      />

      <ContentHeader>Not Using Entity Framework?</ContentHeader>
      <Example
        md={`
As previously discussed, this library uses Entity Framework by default. 
If you'd like to use another ORM that does not implement \`IQueryable\`, you can 
use a custom \`IResourceService<TModel>\` implementation.
        `}
        code={`
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // add the service override for MyModel
    services.AddScoped<IResourceService<MyModel>, MyModelService>();

    // add your own DAO
    services.AddScoped<IMyModelDao, MyModelDao>();
    // ...
}

// MyModelService.cs
public class MyModelService : IResourceService<MyModel>
{
    private readonly IMyModelDao _dao;

    public MyModelService(IMyModelDao dao)
    { 
        _dao = dao;
    } 

    public Task<IEnumerable<MyModel>> GetAsync()
    {
        return await _dao.GetModelAsync();
    }

    // ...
}
        `}
      />

      <ContentHeader>Limited Requirements</ContentHeader>
      <Example
        md={`
In some cases it may be necessary to only expose a few methods on the resource.
For this reason, we have created a hierarchy of service interfaces that can be used to get the exact 
implementation you require.

This interface hierarchy is defined by this tree structure.
        `}
        code={`
        IResourceService
        |
        ├── IResourceQueryService
        |   |
        │   ├── IGetAllService
        │   │   GET /
        |   |
        │   ├── IGetByIdService
        |   |   GET /{id}
        |   |
        │   ├── IGetRelationshipService
        |   |   GET /{id}/{relationship}
        |   |
        │   └── IGetRelationshipsService
        |       GET /{id}/relationships/{relationship}
        |
        └── IResourceCmdService
            |
            ├── ICreateService
            |   POST /
            |
            ├── IDeleteService
            |   DELETE /{id}
            |
            ├── IUpdateService
            |   PATCH /{id}
            |
            └── IUpdateRelationshipService
                PATCH /{id}/relationships/{relationship}
                `}
      />
      <Example
        md={`
In order to take advantage of these interfaces you first need to inject the 
service for each implemented interface.
        `}
        code={`
public class ArticleService : ICreateService<Article>, IDeleteService<Article> 
{
  // ...
}

public class Startup 
{
    public IServiceProvider ConfigureServices(IServiceCollection services) 
    {
        services.AddScoped<ICreateService<Article>, ArticleService>();
        services.AddScoped<IDeleteService<Article>, ArticleService>();
    }
}
        `}
      />

      <Example
        md={`
Other dependency injection frameworks such as [Autofac](https://autofac.org/) 
can be used to simplify this syntax.
        `}
        code={`
builder.RegisterType<ArticleService>().AsImplementedInterfaces();
        `}
      />
      <Example
        md={`
Then in the controller, you should inherit the base controller and pass the services 
into the named, optional base parameters:
        `}
        code={`
public class ArticlesController : BaseJsonApiController<Article> 
{
    public ArticlesController(
        IJsonApiContext jsonApiContext, 
        ICreateService<Article> create,
        IDeleteService<Article> delete
    ) : base(jsonApiContext, create: create, delete: delete) { }

    [HttpPost]
    public override async Task<IActionResult> PostAsync([FromBody] Article entity) 
        => await base.PostAsync(entity);

    [HttpDelete("{id}")]
    public override async Task<IActionResult>DeleteAsync(int id) 
        => await base.DeleteAsync(id);
}
        `}
      />
    </SplitPage>
  );
};
