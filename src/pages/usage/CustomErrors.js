import React from "react";
import SplitPage from "../SplitPage";
import Example from "../../components/Example";
import ContentHeader from "../../components/ContentHeader";
import Content from "../../components/Content";
import MarkdownContent from "../../components/MarkdownContent";

export default () => {
  return (
    <SplitPage>
      <ContentHeader>Custom Errors</ContentHeader>
      <MarkdownContent
        md={`
By default, errors will only contain the properties defined by the \`Error\` class.
However, you can create your own by inheriting from \`Error\` and either throwing it in a 
\`JsonApiException\` or returning the error from your controller.
`}
      />
      <Example
        md={`
Custom error definition
        `}
        code={`
public class CustomError : Error 
{
  public CustomError(int status, string title, string detail, string myProp)
  : base(status, title, detail)
  {
     MyCustomProperty = myProp;
  }

  public string MyCustomProperty { get; set; }
}
        `}
      />

      <Example
        md={`
If you throw a \`JsonApiException\` that is unhandled, the middleware will properly serialize it
and return it as a json:api error.
        `}
        code={`
public void MyMethod() 
{
  var error = new CustomError(507, "title", "detail", "custom");
  throw new JsonApiException(error);
}
        `}
      />

      <Example
        md={`
You can use the \`IActionResult Error(Error error)\` method to return a single error message,
or you can use the \`IActionResult Errors(ErrorCollection errors)\` method to return a collection of errors.
        `}
        code={`
[HttpPost]
public override async Task<IActionResult> PostAsync([FromBody] MyEntity entity)
{
  if(_db.IsFull)
    return Error(new CustomError("507", "Database is full.", "Theres no more room.", "Sorry."));
        
  if(model.Validations.IsValid == false)
    return Errors(model.Validations.GetErrors());
}
        `}
      />

      <ContentHeader>Example: Including Links</ContentHeader>

      <Example
        md={`
This example demonstrates one way you can include \`links\` 
with your error payloads. 

This example assumes that there is a
support documentation site that provides additional information
based on the HTTP Status Code.
        `}
        code={`
public class CustomJsonApiException : Error 
{
  public CustomJsonApiException(int status, string title)
  : base(status, title)
  { }

  private const string HELP_DOCS_URI = "https://example.com/errors/";
  public ErrorLink Links => HELP_DOCS_URI + Status;
}

// ...
throw new CustomJsonApiException(401, "You're not allowed to do that.");
        `}
      />

      <Example
        md={""}
        lang={"json"}
        code={`
{
  "errors": [
    {
      "title": "You're not allowed to do that.",
      "status": "401",
      "links": {
        "about": "https://example.com/errors/401"
      }
    }
  ]
}
        `}
      />
    </SplitPage>
  );
};
