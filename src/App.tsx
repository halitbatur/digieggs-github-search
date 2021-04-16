import React from "react";
import Navbar from "./components/navBar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResults from "./container/searchResults/SearchResults";
import SingleResultPage from "./container/singleResultPage/SingleResultPage";
import Home from "./container/home/Home";
import Bookmarks from "./container/bookmarks/Bookmarks";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route exact path="/search">
            <SearchResults />
          </Route>
          <Route
            path="/single-page/:type/:id"
            children={<SingleResultPage />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
