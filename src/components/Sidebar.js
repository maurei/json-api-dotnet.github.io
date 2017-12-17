import React from "react";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <img src="logo.png" alt="JSON API .Net Core" className="logo" />
      <div>{props.children}</div>
    </div>
  );
};

export default Sidebar;
