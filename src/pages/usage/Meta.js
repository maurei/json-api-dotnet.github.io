import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Meta Information</ContentHeader>
      <Content
        render={() => (
          <div>
            Non-standard meta information can be added to your API responses in
            2 ways. Resource and Request meta. In the event of a key collision,
            the Request Meta will take precendence.
          </div>
        )}
      />

      <ContentHeader>Resource meta</ContentHeader>
      <Example
        md={`
Metadata defined on the resource itself by implementing the \`IHasMeta\` interface.
        `}
        code={`
public class Person : Identifiable<int>, IHasMeta
{
    // ...

    public Dictionary<string, object> GetMeta(IJsonApiContext context)
    {
        return new Dictionary<string, object> {
            { "copyright", "Copyright 2015 Example Corp." },
            { "authors", new string[] { "Jared Nance" } }
        };
    }
}
        `}
      />

      <ContentHeader>Request meta</ContentHeader>
      <Example
        md={`
Request Meta can be added by injecting a service that implements \`IRequestMeta\`. 
This is useful if you need access to other injected services to build the meta object.
`}
        code={`
public class RequestMetaService : IRequestMeta
{
    public RequestMetaService(/*...other dependencies here */) {
        // ...
    }

    public Dictionary<string, object> GetMeta(IJsonApiContext context)
        => return new Dictionary<string, object> {
                { "copyright", "Copyright 2015 Example Corp." },
                { "authors", new string[] { "Jared Nance" } }
            };
}
`}
      />

      <Example
        lang="json"
        code={`
{
  "meta": {
    "copyright": "Copyright 2015 Example Corp.",
    "authors": [
      "Jared Nance"
    ]
  },
  "data": {
    // ...
  }
}
        `}
      />
    </SplitPage>
  );
};
