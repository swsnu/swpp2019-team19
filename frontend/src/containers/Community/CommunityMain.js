import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button, Row, Col, Container,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import ArticleEntry from '../../components/ArticleEntry/ArticleEntry';
import * as actionCreators from '../../store/actions';

class CommunityMain extends Component {
  constructor(props) {
    super(props);
    const { fetchAllBoard, fetchHotBoard } = this.props;
    fetchAllBoard();
    fetchHotBoard();
  }

  render() {
    const articleParser = (article) => (
      <ArticleEntry article={article} key={article.id} />
    );
    const { history, storedAllBoard, storedHotBoard } = this.props;

    return (
      <Container className="CommunityMain" fluid>
        <Row>
          <Col md={1} lg={2} />
          <Col>
            <Button
              variant="link"
              id="direct-to-hot-board"
              onClick={() => history.push('/boards/hot/')}
            >
              Hot
            </Button>
            <Container fluid>
              <Row>
                {storedHotBoard.map(articleParser)}
              </Row>
            </Container>
            <Button
              variant="link"
              id="direct-to-all-board"
              onClick={() => history.push('/boards/all/')}
            >
              ALL
            </Button>
            <Container fluid>
              <Row>
                {storedAllBoard.map(articleParser)}
              </Row>
            </Container>
          </Col>
          <Col md={1} lg={2} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  storedAllBoard: state.article.articleListAll,
  storedHotBoard: state.article.articleListHot,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllBoard: () => dispatch(actionCreators.fetchAllBoard({
    currentPageNumber: 1,
    filterCriteria: 'all',
    sortCriteria: 'new',
    searchCriteria: '',
    searchKeyword: '',
    boardName: 'all',
    articlesPerRequest: 6,
  })),
  fetchHotBoard: () => dispatch(actionCreators.fetchHotBoard({
    currentPageNumber: 1,
    filterCriteria: 'all',
    sortCriteria: 'new',
    searchCriteria: '',
    searchKeyword: '',
    boardName: 'hot',
    articlesPerRequest: 6,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityMain);

CommunityMain.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storedAllBoard: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storedHotBoard: PropTypes.array.isRequired,
  fetchAllBoard: PropTypes.func.isRequired,
  fetchHotBoard: PropTypes.func.isRequired,
};
