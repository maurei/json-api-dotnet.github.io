import React from "react";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <a href="https://github.com/json-api-dotnet/JsonApiDotNetCore">
        <img src="logo.png" alt="JSON API .Net Core" className="logo" />
      </a>
      <div>{props.children}</div>
    </div>
  );
};

export default Sidebar;
