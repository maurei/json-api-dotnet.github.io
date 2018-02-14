import React from "react";
import glamorous from "glamorous";

import Code from "../../components/Code";
import Colors from "../../components/utility/Colors";

const { h1, div, ul } = glamorous;
const Title = h1({
  fontSize: "3em"
});

const Home = div({
  position: "relative",
  padding: "0 10%"
});

const Content = div({
  fontSize: "1.2em",
  lineHeight: "2em"
});

const Bullets = ul({
  listStyleType: "square"
});

const CodeContainer = div({
  width: "80%",
  margin: "auto",
  padding: "0px 20px",
  backgroundColor: Colors.CodeBackground
});

export default () => {
  return (
    <Home>
      <Title>JSON API .Net Core</Title>
      <Content>
        <div>
          A <a href="http://jsonapi.org/">{`{ json:api }`}</a> web application
          framework.
        </div>
        <Bullets>
          <li>
            Focus on delivering value in your applications by eliminating CRUD
            boilerplate
          </li>
          <li>
            Create powerful and flexible web APIs built on the json:api
            specification
          </li>
          <li>
            Leverage the built-in data access layer to get <u>filtering</u>,{" "}
            <u>sorting</u>, <u>pagination</u>, <u>sparse field selection</u> and
            more features from the API all the way to the database
          </li>
          <li>
            Extend default service and data access layers easily using our
            open-generic-based dependency injection model
          </li>
        </Bullets>
      </Content>
      <h2>
        Simple controller definitions with built-in support for GET, POST,
        PATCH, and DELETE requests.
      </h2>
      <CodeContainer>
        <Code>
          {`
[Route("api/[controller]")]
public class ArticlesController : JsonApiController<Article>
{
    public ArticlesController(
        IJsonApiContext jsonApiContext,
        IResourceService<Article> resourceService) 
    : base(jsonApiContext, resourceService) { }
}`}
        </Code>
      </CodeContainer>
      <h2>Generic service layer for easy extensibility.</h2>
      <CodeContainer>
        <Code>
          {`
public class ArticlesService : EntityResourceService<Article>
{
    private readonly IEntityRepository<Article> _articles;

    public ArticlesService(
        IJsonApiContext jsonApiContext,
        IEntityRepository<Article> articlesRepository)
    : base(jsonApiContext, articlesRepository) 
    { 
      _articles = articlesRepository;
    }

    public override async Task<Article> CreateAsync(Article article)
    {
        // ...custom business logic goes here...
        return await _articles.CreateAsync(article);
    }
}`}
        </Code>
      </CodeContainer>
      <h2>
        Create a powerful API built on the json:api specification without
        thinking about json:api
      </h2>
      <CodeContainer>
        <Code lang="http">
          {`
GET /api/v1/todo-items HTTP/1.1
Accept: application/vnd.api+json
          `}
        </Code>
        <Code lang="json">
          {`
{
  "data": [
    {
      "type": "todo-items",
      "id": "2026",
      "attributes": {
        "description": "That thing I should be doing.",
        "priority": 1,
        "created-at": "2017-07-25T16:46:27.563205"
      },
      "relationships": {
        "owner": {
          "links": {
            "self": "http://localhost:5000/api/v1/todo-items/2026/relationships/owner",
            "related": "http://localhost:5000/api/v1/todo-items/2026/owner"
          }
        },
        "assignee": {
          "links": {
            "self": "http://localhost:5000/api/v1/todo-items/2026/relationships/assignee",
            "related": "http://localhost:5000/api/v1/todo-items/2026/assignee"
          }
        }
      }
    }
  ],
  "meta": {
    "total-records": 1
  }
}`}
        </Code>
      </CodeContainer>
      <h2>Easily sideload relationships</h2>
      <CodeContainer>
        <Code lang="http">
          {`
GET /api/v1/todo-items/2026?include=owner HTTP/1.1
Accept: application/vnd.api+json
          `}
        </Code>
        <Code lang="json">
          {`
{
  "data": {
    "type": "todo-items",
    "id": "2026",
    "attributes": {
      "description": "That thing I should be doing",
      "priority": 1,
      "created-at": "2017-07-25T16:46:27.563205"
    },
    "relationships": {
      "owner": {
        "links": {
          "self": "http://localhost:5000/api/v1/todo-items/2026/relationships/owner",
          "related": "http://localhost:5000/api/v1/todo-items/2026/owner"
        },
        "data": {
          "type": "people",
          "id": "672"
        }
      },
      "assignee": {
        "links": {
          "self": "http://localhost:5000/api/v1/todo-items/2026/relationships/assignee",
          "related": "http://localhost:5000/api/v1/todo-items/2026/assignee"
        }
      }
    }
  },
  "included": [
    {
      "type": "people",
      "id": "672",
      "attributes": {
        "first-name": "John",
        "last-name": "Doe"
      },
      "relationships": {
        "todo-items": {
          "links": {
            "self": "http://localhost:5000/api/v1/people/672/relationships/todo-items",
            "related": "http://localhost:5000/api/v1/people/672/todo-items"
          }
        },
        "assigned-todo-items": {
          "links": {
            "self": "http://localhost:5000/api/v1/people/672/relationships/assigned-todo-items",
            "related": "http://localhost:5000/api/v1/people/672/assigned-todo-items"
          }
        }
      }
    }
  ]
}`}
        </Code>
      </CodeContainer>
    </Home>
  );
};
