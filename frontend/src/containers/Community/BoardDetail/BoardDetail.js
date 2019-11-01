/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Table, ButtonGroup, Button, InputGroup, DropdownButton, Dropdown, FormControl,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import Board from '../../../components/Board/Board';

class BoardDetail extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1,
      filterCriteria: 'all',
      sortCriteria: 'new',
      searchCriteria: 'title',
      searchKeyword: '',
      boardName: this.props.match.params.boardName,
      numArticlesPerRequest: 20,
    }
  }
  /* eslint-disable */

  componentDidMount() {
    this.props.fetchArticles(this.state);
  }

  render() {
    const articleEntries = this.props.storedArticles.map((article) => (
      <Board
        key={article.id}
        id={article.id}
        title={article.title}
        tag={article.tag}
        author_name={article.author}
        clickDetail={() => {
          this.props.history.push(
            `/boards/${this.props.match.params.boardName}/${article.id}`,
          );
        }}
      />
    ));

    const setCriteria = (criteria) => {
      this.setState({ searchCriteria: criteria });
    };

    const fetch = () => {
      this.props.fetchArticles(this.state);
    };

    const statusToSelected = (status) => {
      return this.state.filterCriteria === status ? 'primary' : 'secondary';
    }
    const setAndFetch = (filter) => {
      this.setState({ filterCriteria: filter });
      fetch();
    }

    return (
      <div className='BoardDetail'>
        <Button
          id='direct-to-board'
          onClick={() => this.props.history.push('/boards')}
        >
          Main
        </Button>
        <div className=''>
          <ButtonGroup aria-label='filter-criteria'>
            <Button
              variant={statusToSelected('all')}
              onClick={() => setAndFetch('all')}
            >all</Button>
            <Button
              variant={statusToSelected('normal')}
              onClick={() => setAndFetch('normal')}
            >normal</Button>
            <Button
              variant={statusToSelected('working')}
              onClick={() => setAndFetch('working')}
            >working</Button>
            <Button
              variant={statusToSelected('done')}
              onClick={() => setAndFetch('done')}
            >done</Button>
            <Button
              variant={statusToSelected('rejected')}
              onClick={() => setAndFetch('rejected')}
            >rejected</Button>
          </ButtonGroup>
          <Table hover size='sm'>
            <thead>
              <tr>
                <th>ArticleID</th>
                <th>Title</th>
                <th>Author</th>
                <th>tag</th>
              </tr>
            </thead>
            <tbody>
              {articleEntries}
            </tbody>
          </Table>
          <InputGroup className='mb-3'>
            <DropdownButton
              as={InputGroup.Prepend}
              variant='outline-secondary'
              title={this.state.searchCriteria}
              id='search-criteria'
            >
              <Dropdown.Item
                onSelect={() => setCriteria('title')}
              >title</Dropdown.Item>
              <Dropdown.Item
                onSelect={() => setCriteria('content')}
              >content</Dropdown.Item>
            </DropdownButton>
            <FormControl
              aria-describedby='search-keyword'
              placeholder='input keyword...'
              value={this.state.searchKeyword}
              onChange={(event) => this.setState({
                searchKeyword: event.target.value
              })}
            />
            <Button
              id='search-button'
              onClick={() => fetch()}
              disabled={this.state.searchKeyword.length < 2}
            >search</Button>
          </InputGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedArticles: state.article.articleList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: (options) => dispatch(
    actionCreators.fetchArticleList(options),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardDetail);
