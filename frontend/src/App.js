import React, { Component } from 'react';
import './App.css';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ChatBot from './containers/ChatBot/ChatBot';

export class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className='App'>
          <Switch>
            <Route path='/chat' exact component={ChatBot} />
            <Redirect exact from='/' to='/chat' />
            <Route render={() => this.props.history.push('/chat')} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
