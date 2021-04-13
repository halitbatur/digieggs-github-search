import React from "react";
import Navbar from "./components/navBar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResults from "./container/searchResults/SearchResults";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/search">
            <SearchResults />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
