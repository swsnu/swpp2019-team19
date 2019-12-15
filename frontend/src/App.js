import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';

import Chat from './containers/Chat/Chat';
import CommunityMain from './containers/Community/CommunityMain';
import BoardDetail from './containers/Community/BoardDetail/BoardDetail';

import Signin from './containers/User/Signin/Signin';
import Signup from './containers/User/Signup/Signup';
import AccountInformation from './containers/User/AccountInformation/AccountInformation';

import About from './containers/About/About';
import NotFound from './containers/NotFound/NotFound';

import CustomNavbar from './components/Navbar/CustomNavbar';

import './App.css';

const App = (props) => {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <CustomNavbar history={history} />

        <div className="BodyContainer">
          <Switch>
            <Redirect exact from="/" to="/chat" />

            <Route path="/chat" exact component={Chat} />
            <Route path="/boards" exact component={CommunityMain} />

            <Route
              path="/boards/:boardName(all|hot)"
              exact
              // eslint-disable-next-line react/jsx-props-no-spreading
              component={(pass) => <BoardDetail key={pass.match.params.boardName} {...pass} />}
            />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/account" exact component={AccountInformation} />

            <Route path="/about" exact component={About} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  );
};

export default App;

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
