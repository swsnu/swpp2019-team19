import React, { Component } from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Chat from './containers/Chat/Chat';
import CommunityMain from './containers/Community/CommunityMain';
import BoardDetail from './containers/Community/BoardDetail/BoardDetail';
import ArticleDetail from './containers/Community/BoardDetail/ArticleDetail/ArticleDetail';

import Signin from './containers/User/Signin/Signin';
import Signup from './containers/User/Signup/Signup';
import AccountInformation from './containers/User/AccountInformation/AccountInformation';
import About from './containers/About/About';
import NotFound from './containers/NotFound/NotFound';

import ArticleCreate from './containers/Community/BoardDetail/ArticleCreate/ArticleCreate';
import ArticleEdit from './containers/Community/BoardDetail/ArticleDetail/ArticleEdit/ArticleEdit';


import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
export class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          <Switch>
            <Redirect exact from="/" to="/chat" />

            <Route path="/chat" exact component={Chat} />
            <Route path="/boards" exact component={CommunityMain} />

            <Route path="/boards/:boardName" exact component={BoardDetail} />
            <Route
              path="/boards/:boardName/:article_id"
              exact
              component={ArticleDetail}
            />
            <Route
              path="/boards/:boardName/create"
              exact
              component={ArticleCreate}
            />
            <Route
              path="/boards/:boardName/:article_id/edit"
              exact
              component={ArticleEdit}
            />

            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/account" exact component={AccountInformation} />

            <Route path="/about" exact component={About} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
