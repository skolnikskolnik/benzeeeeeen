import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AcidDatabase from "./pages/AcidDatabase";
import TitrationCurve from "./pages/TitrationCurve";
import Calculator from "./pages/Calculator";
import StrongAcidStrongBase from "./pages/StrongAcidStrongBase";

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
        <Route exact path="/titrationcurve">
          <TitrationCurve />
        </Route>
        <Route exact path="/calculator">
          <Calculator />
        </Route>
              <Route exact path="/strongacidstrongbase">
          <StrongAcidStrongBase />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;