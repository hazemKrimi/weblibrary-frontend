import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainNav from './components/MainNav';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Settings from './components/Settings';
import CreateBook from './components/CreateBook';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  return (
    <React.Fragment>
      <MainNav />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/create-book">
            <CreateBook />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
