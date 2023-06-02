import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StatsPage from './components/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/stats" component={StatsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;