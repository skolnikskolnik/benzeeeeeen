import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AcidDatabase from "./pages/AcidDatabase";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
    <NavBar />
      <Switch>
        <Route exact path={["/", "/home"]}>
          <Home />
        </Route>
        <Route exact path="/aciddatabase">
          <AcidDatabase />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;