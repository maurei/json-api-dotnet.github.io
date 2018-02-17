import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";
import GithubLink from "../../components/GithubLink";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Layer Overview</ContentHeader>
      <HtmlContent>
      By default, data retrieval is distributed across 3 layers:

<p>
<GithubLink path="Controllers/JsonApiController.cs">JsonApiController</GithubLink> (required)
<br />
└── <GithubLink path="Services/EntityResourceService.cs">EntityResourceService</GithubLink> 
  : <GithubLink path="Services/Contract/IResourceService.cs">IResourceService</GithubLink>
<br />
&nbsp;&nbsp;&nbsp;&nbsp;
  └── <GithubLink path="Data/DefaultEntityRepository.cs">DefaultEntityRepository</GithubLink> 
  : <GithubLink path="Data/IEntityRepository.cs">IEntityRepository</GithubLink>
</p>
      </HtmlContent>
      <Example
        md={`
Customization can be done at any of these layers. 
However, it is recommended that you make your customizations at the service or the repository layer 
when possible to keep the controllers free of unnecessary logic. 
You can use the following as a general rule of thumb for where to put business logic:

- **Controller**: simple validation logic that should result in the return of specific HTTP status codes such as model validation
- **IResourceService**: advanced BL and replacement of data access mechanisms
- **IEntityRepository**: custom logic that builds on the EF APIs, such as Authorization of data
        `}
      />

      <ContentHeader>Replacing Services</ContentHeader>


      <Example
        md={`
Replacing services is done on a per resource basis and can be done through simple DI in your Startup.cs file.
        `}
        code={`
public IServiceProvider ConfigureServices(IServiceCollection services)
{
    // custom service
    services.AddScoped<IEntityRepository<Person>, CustomPersonService>();

    // custom repository
    services.AddScoped<IEntityRepository<TodoItem>, AuthorizedTodoItemRepository>();

    // ...
}
        `}
      />
    </SplitPage>
  );
};
