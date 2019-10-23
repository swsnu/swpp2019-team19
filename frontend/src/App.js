import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Chat from "./containers/Chat/Chat";
import CommunityMain from "./containers/CommunityMain/CommunityMain";

import BoardDetail from "./containers/BoardDetail/BoardDetail";
import ArticleDetail from "./containers/ArticleDetail/ArticleDetail";
import ArticleCreate from "./containers/ArticleCreate/ArticleCreate";
import ArticleEdit from "./containers/ArticleEdit/ArticleEdit";

import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import AccountInformation from "./containers/AccountInformation/AccountInformation";
import About from "./containers/About/About";

import NotFound from "./containers/NotFound/NotFound";

import store from "./store/store";

import "./App.css";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Redirect exact from="/" to="/chat" />

              <Route path="/chat" exact component={Chat} />
              <Route path="/boards" exact component={CommunityMain} />

              {/* TODO : `/cha` resolves to BoardDetail */}
              {/*        `/about` also resolves to BoardDetail */}
              {/* `/boards/:boardName` would be better */}
              {/* OR like "/foo/:id(\d+)" */}
              {/*         "/foo/:path(\w+)" */}
              <Route path="/:boardName" exact component={BoardDetail} />
              <Route
                path="/:boardName/:article_id"
                exact
                component={ArticleDetail}
              />
              <Route
                path="/:boardName/create"
                exact
                component={ArticleCreate}
              />
              <Route
                path="/:boardName/:article_id/edit"
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
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
