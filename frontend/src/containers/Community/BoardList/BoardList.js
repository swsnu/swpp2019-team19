import React, { Component } from 'react';
import { Grid, Icon, Header, Segment } from 'semantic-ui-react';
import './BoardList.css';
class BoardList extends Component {
  state = {};
  render() {
    return (
      <Grid divided='vertically' className='BoardList'>
        <Grid.Row className='Board'>Here Board A</Grid.Row>
        <Grid.Row className='Board'>Here Board B</Grid.Row>
        <Grid.Row className='Board'>Here Board C</Grid.Row>
      </Grid>
    );
  }
}

export default BoardList;
