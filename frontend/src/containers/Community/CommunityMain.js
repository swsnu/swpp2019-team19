/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button, CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
// import ArticleEntry from '../../components/ArticleEntry/ArticleEntry';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';

class CommunityMain extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllBoard();
    this.props.fetchHotBoard();
  }

  render() {
    const articleParser = (article) => (
      <ArticleDetail article={article} key={article.id} />
    );
    const allBoardThumbnail = this.props.storedAllBoard.map(articleParser);
    const hotBoardThumbnail = this.props.storedHotBoard.map(articleParser);

    return (
      <div className="CommunityMain">
        <Button
          id="direct-to-hot-board"
          onClick={() => this.props.history.push('/boards/hot/')}
        >
          Hot
        </Button>
        <CardColumns>
          {hotBoardThumbnail}
        </CardColumns>
        <Button
          id="direct-to-all-board"
          onClick={() => this.props.history.push('/boards/all/')}
        >
          ALL
        </Button>
        <CardColumns>
          {allBoardThumbnail}
        </CardColumns>
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
    articlesPerRequest: 8,
  })),
  fetchHotBoard: () => dispatch(actionCreators.fetchHotBoard({
    currentPageNumber: 1,
    filterCriteria: 'all',
    sortCriteria: 'new',
    searchCriteria: '',
    searchKeyword: '',
    boardName: 'hot',
    articlesPerRequest: 8,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityMain);
