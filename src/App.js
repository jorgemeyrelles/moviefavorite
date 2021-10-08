import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import './components/movieLine.css';
import './components/featuredMovie.css';

function App() {
  return (
    <Switch>
      <Route exact path="/moviefavorite/" component={ Home } />
    </Switch>
  );
}

export default App;
