/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  ButtonGroup, Button, InputGroup, DropdownButton, DropdownItem, FormControl, Pagination,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import ArticleEntry from '../../../components/ArticleEntry/ArticleEntry';
import './BoardDetail.css';

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
      articlesPerRequest: 6,
      tmpKeyword: '',
    }
    this.props.fetchArticles(this.state);
  }
  /* eslint-disable */


  render() {
    console.log(this.props.storedArticles);
    const statusToSelected = (status) => {
      return this.state.filterCriteria === status ? 'primary' : 'secondary';
    }
    const setAndFetch = (filter) => {
      this.setState({ filterCriteria: filter });
      this.props.fetchArticles({
        ...this.state, filterCriteria: filter
      });
    }

    const setCurrentPageNumberAndFetch = (num) => {
      this.setState({ currentPageNumber: num });
      this.props.fetchArticles({
        ...this.state, currentPageNumber: num
      });
    }

    const makeArticleEntry = (article) => (
      <ArticleEntry article={article} key={article.id} />
    );
    let active = this.state.currentPageNumber;
    let items = [];
    const leftEnd = (this.state.currentPageNumber - 2 > 0) ? (this.state.currentPageNumber - 2) : (1);
    const rightEnd = (this.state.currentPageNumber + 2 < this.props.storedPages) ? (this.state.currentPageNumber + 2) : (this.props.storedPages);
    items.push(
      <Pagination.First key='go-first-page' onClick={() => setCurrentPageNumberAndFetch(1)} />
    );
    items.push(
      <Pagination.Prev key='go-previous-page' onClick={() => setCurrentPageNumberAndFetch((this.state.currentPageNumber - 1 > 1) ? (this.state.currentPageNumber - 1) : (1))} />
    );
    if (this.state.currentPageNumber > 3) {
      items.push(
        <Pagination.Ellipsis key='go-previous-page-group' onClick={() => setCurrentPageNumberAndFetch((this.state.currentPageNumber - 3))} />
      );
    }

    for (let number = leftEnd; number <= rightEnd; number++) {
      items.push(
        <Pagination.Item key={number} className={"page" + number} active={number === active} onClick={() => setCurrentPageNumberAndFetch(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    if (this.state.currentPageNumber + 2 < this.props.storedPages) {
      items.push(
        <Pagination.Ellipsis key='go-next-page-group' onClick={() => setCurrentPageNumberAndFetch((this.state.currentPageNumber + 3))} />
      );
    }

    items.push(
      <Pagination.Next key='go-next-page' onClick={() => setCurrentPageNumberAndFetch((this.state.currentPageNumber < this.props.storedPages) ? (this.state.currentPageNumber + 1) : (this.props.storedPages))} />
    );
    items.push(
      <Pagination.Last key='go-last-page' onClick={() => setCurrentPageNumberAndFetch(this.props.storedPages)} />
    );

    const pagination = (
      <div>
        <Pagination size="sm">
          {items}
        </Pagination>
      </div>
    );

    return (
      <div className='BoardDetail'>
        <Button
          variant='link'
          id='direct-to-board'
          onClick={() => this.props.history.push('/boards')}
        >
          go to main page...
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
                onSelect={() => this.setState({ sortCriteria: 'old' })}
              >old</DropdownItem>
              <DropdownItem
                onSelect={() => this.setState({ sortCriteria: 'good' })}
              >good</DropdownItem>
            </DropdownButton>
          </ButtonGroup>


          <Button
            id='write-button'
            onClick={() => {
              this.props.history.push('/boards/all/create');
            }}
          >
            Write
          </Button>
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
                onSelect={() => this.setState({ searchCriteria: 'nickname' })}
              >nickname</DropdownItem>
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
          <div className="row">
            {this.props.storedArticles.map(makeArticleEntry)}
          </div>
          <div className="board-detail-pagination">
            {pagination}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedArticles: state.article.articleList,
  storedPages: state.article.articlePages,
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
