/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Table, ButtonGroup, Button, InputGroup, DropdownButton, DropdownItem, FormControl,
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
      articlesPerRequest: 20,
      tmpKeyword: '',
    }
    this.props.fetchArticles(this.state);
  }
  /* eslint-disable */

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

    const statusToSelected = (status) => {
      return this.state.filterCriteria === status ? 'primary' : 'secondary';
    }
    const setAndFetch = (filter) => {
      this.setState({ filterCriteria: filter });
      this.props.fetchArticles({
        ...this.state, filterCriteria: filter
      });
    }

    return (
      <div className='BoardDetail'>
        <Button
          id='direct-to-board'
          onClick={() => this.props.history.push('/boards')}
        >
          Main
        </Button>
        <div className='board-detail-view'>
          {/* {this.props.match.params.boardName === 'all' ? */}
          {/* <p></p> */}
          {/* : */}
          <ButtonGroup aria-label='filter-criteria'>
            <Button
              id='filter-all'
              variant={statusToSelected('all')}
              onClick={() => setAndFetch('all')}
            >all</Button>
            <Button
              id='filter-normal'
              variant={statusToSelected('normal')}
              onClick={() => setAndFetch('normal')}
            >normal</Button>
            <Button
              id='filter-working'
              variant={statusToSelected('working')}
              onClick={() => setAndFetch('working')}
            >working</Button>
            <Button
              id='filter-done'
              variant={statusToSelected('done')}
              onClick={() => setAndFetch('done')}
            >done</Button>
            <Button
              id='filter-rejected'
              variant={statusToSelected('rejected')}
              onClick={() => setAndFetch('rejected')}
            >rejected</Button>
          </ButtonGroup>

          <DropdownButton
            as={InputGroup.Prepend}
            variant='outline-secondary'
            title={this.state.sortCriteria}
            id='sort-criteria'
          >
            <DropdownItem
              onSelect={() => this.setState({ sortCriteria: 'new' })}
            >new</DropdownItem>
            <DropdownItem
              onSelect={() => this.setState({ sortCriteria: 'good' })}
            >good</DropdownItem>
          </DropdownButton>

          <Button
            id='write-button'
            onClick={() => {
              this.props.history.push('/boards/all/create');
            }}
          >
            Write
          </Button>
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
              <DropdownItem
                onSelect={() => this.setState({ searchCriteria: 'title' })}
              >title</DropdownItem>
              <DropdownItem
                onSelect={() => this.setState({ searchCriteria: 'username' })}
              >username</DropdownItem>
            </DropdownButton>
            <FormControl
              id='search-keyword'
              aria-describedby='search-keyword'
              placeholder='input keyword...'
              value={this.state.tmpKeyword}
              onChange={(event) => this.setState({
                tmpKeyword: event.target.value
              })}
            />
            <Button
              id='search-button'
              onClick={() => {
                this.setState({ searchKeyword: this.state.tmpKeyword });
                this.props.fetchArticles({
                  ...this.state, searchKeyword: this.state.tmpKeyword
                })
              }}
              disabled={this.state.tmpKeyword.length === 1}
            >search</Button>
          </InputGroup>
        </div>
      </div >
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
