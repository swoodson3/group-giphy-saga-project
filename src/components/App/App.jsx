import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import FavoritesList from '../FavoritesBar/FavoritesList'
import SearchView from '../SearchView/SearchView.jsx';

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Router>
        <Route exact path="/">
          <SearchView />
        </Route>
        <Route exact path="/favorites">
          <FavoritesList />
        </Route>
      </Router>
    </div>
  );
}

export default App;
