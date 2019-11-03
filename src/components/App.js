import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import user from "./user";
import Menu from "./menu";

const Prueba = () => <div>hola</div>;

const App = props => (
  <BrowserRouter>
    <Menu />
    <div id="margen">
      <Route exact path="/" component={user} />
      <Route exact path="/task" component={Prueba} />
    </div>
  </BrowserRouter>
);

export default App;