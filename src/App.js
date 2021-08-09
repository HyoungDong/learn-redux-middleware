import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
      <Route path="/" component={PostListPage} exact></Route>
      <Route path="/:id" component={PostPage}></Route>
    </>
  );
}

export default App;
