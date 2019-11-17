/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Button,
  InputGroup,
  DropdownButton,
  DropdownItem,
  Form,
  Pagination,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import ArticleEntry from '../../../components/ArticleEntry/ArticleEntry';
import ArticleCreate from '../../../components/ArticleCreate/ArticleCreate';
import * as actionCreators from '../../../store/actions';
import './BoardDetail.css';

class BoardDetail extends Component {
  constructor(props) {
    super(props);
    const { match, fetchArticles } = this.props;
    this.state = {
      currentPageNumber: 1,
      filterCriteria: 'all',
      sortCriteria: 'new',
      searchCriteria: 'title',
      searchKeyword: '',
      boardName: match.params.boardName,
      articlesPerRequest: 6,
      tmpKeyword: '',
      articleCreateShow: false,
    };
    fetchArticles(this.state);
  }

  render() {
    const setArticleCreateShow = (inputBool) => {
      this.setState({ articleCreateShow: inputBool });
    };

    const statusToSelected = (status) => {
      const { filterCriteria } = this.state;
      return filterCriteria === status ? 'primary' : 'secondary';
    };
    const setAndFetch = (filter) => {
      this.setState({ filterCriteria: filter });
      const { fetchArticles } = this.props;
      fetchArticles({
        ...this.state, filterCriteria: filter,
      });
    };

    const setSortCriteriaAndFetch = (criteria) => {
      this.setState({ sortCriteria: criteria });
      const { fetchArticles } = this.props;
      fetchArticles({
        ...this.state, sortCriteria: criteria,
      });
    };

    const setCurrentPageNumberAndFetch = (num) => {
      this.setState({ currentPageNumber: num });
      const { fetchArticles } = this.props;
      fetchArticles({
        ...this.state, currentPageNumber: num,
      });
    };

    const makeArticleEntry = (article) => (
      <ArticleEntry article={article} key={article.id} />
    );
    const { currentPageNumber } = this.state;
    const { storedPages } = this.props;
    const active = currentPageNumber;
    const items = [];
    const leftEnd = (currentPageNumber - 2 > 0)
      ? (currentPageNumber - 2) : (1);
    const rightEnd = (currentPageNumber + 2 < storedPages)
      ? (currentPageNumber + 2) : (storedPages);
    items.push(
      <Pagination.First
        key="go-first-page"
        onClick={() => setCurrentPageNumberAndFetch(1)}
      />,
    );
    items.push(
      <Pagination.Prev
        key="go-previous-page"
        onClick={() => setCurrentPageNumberAndFetch(
          (currentPageNumber - 1 > 1)
            ? (currentPageNumber - 1) : (1),
        )}
      />,
    );
    if (currentPageNumber > 3) {
      items.push(
        <Pagination.Ellipsis
          key="go-previous-page-group"
          onClick={() => setCurrentPageNumberAndFetch(
            (currentPageNumber - 3),
          )}
        />,
      );
    }

    for (let number = leftEnd; number <= rightEnd; number += 1) {
      items.push(
        <Pagination.Item
          key={number}
          className={`page${number}`}
          active={number === active}
          onClick={() => setCurrentPageNumberAndFetch(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }
    if (currentPageNumber + 2 < storedPages) {
      items.push(
        <Pagination.Ellipsis
          key="go-next-page-group"
          onClick={() => setCurrentPageNumberAndFetch(
            (currentPageNumber + 3),
          )}
        />,
      );
    }

    items.push(
      <Pagination.Next
        key="go-next-page"
        onClick={() => setCurrentPageNumberAndFetch(
          (currentPageNumber < storedPages)
            ? (currentPageNumber + 1) : (storedPages),
        )}
      />,
    );
    items.push(
      <Pagination.Last
        key="go-last-page"
        onClick={() => setCurrentPageNumberAndFetch(
          storedPages,
        )}
      />,
    );

    const pagination = (
      <div>
        <Pagination size="sm">
          {items}
        </Pagination>
      </div>
    );

    const buttonFactory = (name) => {
      const newId = `filter-${name}`;
      return (
        <Button
          id={newId}
          variant={statusToSelected(name)}
          onClick={() => setAndFetch(name)}
        >
          {name}
        </Button>
      );
    };

    const dropdownItemFactory = (type, name) => {
      const newId = `${type}-by-${name}`;
      if (type === 'sort') {
        return (
          <DropdownItem
            id={newId}
            onSelect={() => setSortCriteriaAndFetch(name)}
          >
            {name}
          </DropdownItem>
        );
      }
      return (
        <DropdownItem
          id={newId}
          onSelect={() => this.setState({ searchCriteria: name })}
        >
          {name}
        </DropdownItem>
      );
    };

    const { history, storedArticles, fetchArticles } = this.props;
    const {
      sortCriteria, searchCriteria, tmpKeyword, articleCreateShow,
    } = this.state;
    return (
      <Container fluid className="BoardDetail">
        <Row>
          <Col md={1} lg={2} />
          <Col>
            <Button
              variant="link"
              id="direct-to-board"
              onClick={() => history.push('/boards')}
            >
              go to main page...
            </Button>
            <Row>
              {/* {this.props.match.params.boardName === 'all' ? */}
              {/* <p></p> */}
              {/* : */}
              <Col>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title={sortCriteria}
                  id="sort-criteria"
                >
                  {dropdownItemFactory('sort', 'new')}
                  {dropdownItemFactory('sort', 'old')}
                  {dropdownItemFactory('sort', 'good')}
                </DropdownButton>
              </Col>
              <Col>
                <ButtonGroup
                  aria-label="filter-criteria"
                  className="float-left"
                >
                  {buttonFactory('all')}
                  {buttonFactory('normal')}
                  {buttonFactory('working')}
                  {buttonFactory('done')}
                  {buttonFactory('rejected')}
                </ButtonGroup>
              </Col>

              <Col>
                <Button
                  className="float-right"
                  float="right"
                  id="write-button"
                  onClick={() => setArticleCreateShow(true)}
                >
                  Write
                </Button>
              </Col>
            </Row>

            <Container fluid>
              <Row>
                {storedArticles.map(makeArticleEntry)}
              </Row>
            </Container>
            <InputGroup className="mb-3">
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={searchCriteria}
                id="search-criteria"
              >
                {dropdownItemFactory('search', 'title')}
                {dropdownItemFactory('search', 'nickname')}
              </DropdownButton>
              <Form.Control
                id="search-keyword"
                aria-describedby="search-keyword"
                placeholder="input keyword..."
                value={tmpKeyword}
                onChange={(event) => this.setState({
                  tmpKeyword: event.target.value,
                })}
              />
              <Button
                id="search-button"
                onClick={() => {
                  this.setState((prevState) => ({
                    searchKeyword: prevState.tmpKeyword,
                  }));
                  fetchArticles({
                    ...this.state, searchKeyword: tmpKeyword,
                  });
                }}
                disabled={tmpKeyword.length === 1}
              >
                search
              </Button>
            </InputGroup>
            <div className="board-detail-pagination">
              {pagination}
            </div>
          </Col>
          <Col md={1} lg={2} />
        </Row>
        <ArticleCreate
          show={articleCreateShow}
          onHide={() => setArticleCreateShow(false)}
          title=""
          content=""
        />
      </Container>
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

BoardDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storedArticles: PropTypes.array.isRequired,
  storedPages: PropTypes.number.isRequired,
  fetchArticles: PropTypes.func.isRequired,
};
