import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";
import MarkdownContent from "../../components/MarkdownContent";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Defining Resources: The ContextGraph</ContentHeader>
      <MarkdownContent
        md={`
The ContextGraph is a map of all the json:api resources and their 
relationships that your API serves.

It is built at app startup and available as a singleton through Dependency Injection.
`}
      />

      <ContentHeader>Using Entity Framework</ContentHeader>
      <Example
        md={`
If you are using Entity Framework Core as your ORM, you can add an entire \`DbContext\` 
with one line.
        `}
        code={`
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddJsonApi<AppDbContext>();
}
        `}
      />

      <ContentHeader>Defining Non-EF Resources</ContentHeader>
      <Example
        md={`
If you have resources that are not members of a \`DbContext\`,
you can manually add them to the graph.
        `}
        code={`
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    var mvcBuilder = services.AddMvc();

    services.AddJsonApi(options => {
        options.BuildContextGraph((builder) => {
            builder.AddResource<MyModel>("my-models");
        });
    }, mvcBuilder);
}
        `}
      />

      <ContentHeader>Changing Resource Names</ContentHeader>
      <Example
        md={`
If a \`DbContext\` is specified when adding the services,
the context will be used to define the resources and their names. 
By default, these names will be hyphenated.
        `}
        code={`
public class AppDbContext : DbContext {
    // this will be translated into "my-models"
    public DbSet<MyModel> MyModels { get; set; }
}
        `}
      />
      <Example
        md={`
You can also specify your own resource name.
        `}
        code={`
public class AppDbContext : DbContext {
    // this will be translated into "someModels"
    [Resource("someModels")]
    public DbSet<MyModel> MyModels { get; set; }
}
        `}
      />
    </SplitPage>
  );
};
