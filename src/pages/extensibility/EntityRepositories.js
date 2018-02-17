import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";
import GithubLink from "../../components/GithubLink";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Entity Repositories</ContentHeader>
      <Example
        md={`
If you want to use EF, but need additional data access logic (such as authorization), 
you can implement custom methods for accessing the data by creating an implementation of 
\`IEntityRepository<Entity, TId>\`. 
If you only need minor changes you can override the methods defined in 
\`DefaultEntityRepository<TEntity, TId>\`.

The repository should then be add to the service collection in Startup.cs.
        `}
        code={`
public IServiceProvider ConfigureServices(IServiceCollection services) 
{
    services.AddScoped<IEntityRepository<Article>, 
            AuthorizedArticleRepository>();
    // ...
}
        `}
      />

      <Example
        md={`
A sample implementation that performs data authorization might look like this.

All of the methods in the \`DefaultEntityRepository\` will use the \`Get()\`
method to get the \`DbSet<TEntity>\` so this is a good method to apply scoped filters
such as user or tenant authorization.
        `}
        code={`
public class AuthorizedArticleRepository 
  : DefaultEntityRepository<Article>
{
    private readonly IAuthenticationService _authenticationService;

    public AuthorizedArticleRepository(
        ILoggerFactory loggerFactory,
        IJsonApiContext jsonApiContext,
        IAuthenticationService authenticationService)
    : base(loggerFactory, jsonApiContext)
    {
        _authenticationService = authenticationService;
    }

    public override IQueryable<MyEntity> Get() 
        => base.Get()
            .Where(e => 
                e.UserId == _authenticationService.UserId
            );
}
        `}
      />
    </SplitPage>
  );
};
