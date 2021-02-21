import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

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
      </Switch>
    </div>
    </Router>
  );
}

export default App;