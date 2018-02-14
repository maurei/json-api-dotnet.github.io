import React from "react";
import ReactMarkdown from "react-markdown";

import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import MarkdownContent from "../../components/MarkdownContent";

export default () => {
  return (
    <SplitPage>
      <MarkdownContent
        md={`
# Installation

Click [here](https://www.nuget.org/packages/JsonApiDotnetCore/) for the latest NuGet version.
`}
      />

      <Example md={`## CLI`} code={`dotnet add package JsonApiDotnetCore`} />
      <Example
        md={`## Visual Studio`}
        code={`Install-Package JsonApiDotnetCore`}
      />
      <Example
        md={`## *.csproj`}
        code={`
<ItemGroup>
  <!-- Be sure to check NuGet for the latest version # -->
  <PackageReference Include="JsonApiDotNetCore" Version="2.1.10" />
</ItemGroup>`}
        lang="xml"
      />
      <Example
        md={`## Pre-Release Packages

For pre-releases (develop branch), add the [MyGet](https://www.myget.org/feed/Details/research-institute) 
package feed to your nuget configuration.
      `}
        code={`
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="JADNC Pre-Release" value="https://www.myget.org/F/research-institute/api/v3/index.json" />
  </packageSources>
</configuration>
          `}
        lang="xml"
      />
    </SplitPage>
  );
};
