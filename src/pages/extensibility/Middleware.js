import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import HtmlContent from "../../components/HtmlContent";
import GithubLink from "../../components/GithubLink";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Middleware</ContentHeader>
      <Example
        md={`
Add the following to your \`Startup.ConfigureServices\` method. 
Replace \`AppDbContext\` with your \`DbContext\`.
        `}
        code={`services.AddJsonApi<AppDbContext>();`}
      />
      <Example
        md={`
Add the middleware to the \`Startup.Configure\` method. Note that under the hood, 
this will call \`app.UseMvc()\` so there is no need to add that as well.
        `}
        code={`
app.UseJsonApi();
        `}
      />
    </SplitPage>
  );
};
