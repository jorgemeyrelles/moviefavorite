import React from "react";
import MovieLine from "./components/MovieLine";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import { MoviesProvider } from "./context/MoviesContext";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ MovieLine } />
      <MoviesProvider>
        <Route exact path="/home" component={ Home } />
      </MoviesProvider>
    </Switch>
  );
}

export default App;
