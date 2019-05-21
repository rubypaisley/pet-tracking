import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import Survey from './Survey';
import View from './View';
import Compare from './Compare';
import firebase from './firebase';


class App extends React.Component {
  componentDidMount() {
    firebase.auth().signInAnonymously();
  }
  render() {
    return (
      <Router>
        <div className="bg-info d-flex justify-content-between">
          <h2>Fido Has Feelings Too!</h2>
          <Link to="/" className="text-light">Home</Link>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/:id/survey" component={Survey} />
        <Route path="/:id/view" component={View} />
        <Route path="/:id/compare" component={Compare} />
      </Router>

    )
  }
}

export default App;
