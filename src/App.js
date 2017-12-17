import StepBystep from "./pages/getting-started/StepBystep";
import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/getting-started/Home";
import Install from "./pages/getting-started/Install";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Sidebar className="item">
            <nav>
              <h3>Getting Started</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/install">Install</Link>
                </li>
                <li>
                  <Link to="/step-by-step">Step-By-Step</Link>
                </li>
                <li>
                  <Link to="/request-examples">Request Example</Link>
                </li>
              </ul>
            </nav>
          </Sidebar>
          <div className="item main">
            <Route exact path="/" component={Home} />
            <Route exact path="/install" component={Install} />
            <Route exact path="/step-by-step" component={StepBystep} />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
