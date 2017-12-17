import React from "react";
import ReactMarkdown from "react-markdown";

const input = `
# JSON API .Net Core

A [{json:api}](http://jsonapi.org/) web application framework. 


Focus on delivering value in your applications by eliminating CRUD boilerplate

Create powerful and flexible web APIs built on the json:api specification

Leverage the built-in data access layer to get sparse field selection, filtering, and sorting from the API all the way to the database

Extend default service and data access layers easily using our open-generic-based dependency injection model

Here are a few options to help you get started:

- View example json:api requests
- Follow our step-by-step guide to get started
- Check out some example applications in our repo

`;

export default () => {
  return (
    <div className="home">
      <ReactMarkdown source={input} />
    </div>
  );
};
