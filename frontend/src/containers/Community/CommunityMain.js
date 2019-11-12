/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import ArticleEntry from '../../components/ArticleEntry/ArticleEntry';

class CommunityMain extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllBoard();
    this.props.fetchHotBoard();
  }

  render() {
    const articleParser = (article) => (
      <ArticleEntry article={article} key={article.id} />
    );
    const allBoardThumbnail = this.props.storedAllBoard.map(articleParser);
    const hotBoardThumbnail = this.props.storedHotBoard.map(articleParser);

    return (
      <div className="CommunityMain">
        <Button
          variant="link"
          id="direct-to-hot-board"
          onClick={() => this.props.history.push('/boards/hot/')}
        >
          Hot
        </Button>
        <div className="row">
          {hotBoardThumbnail}
        </div>
        <Button
          variant="link"
          id="direct-to-all-board"
          onClick={() => this.props.history.push('/boards/all/')}
        >
          ALL
        </Button>
        <div className="row">
          {allBoardThumbnail}
        </div>
      </div>
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
