import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import user from "./user";
import Menu from "./menu";
import Publications from "./publications";

const Prueba = () => <div>hola</div>;

const App = props => (
  <BrowserRouter>
    <Menu />
    <div id="margen">
      <Route exact path="/" component={user} />
      <Route exact path="/task" component={Prueba} />
      <Route exact path="/user/:key?/publications" component={Publications} />
      
    </div>
  </BrowserRouter>
);

export default App;