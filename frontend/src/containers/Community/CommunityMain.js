/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Board from '../../components/Board/Board';

class CommunityMain extends Component {
  componentDidMount() {
    this.props.fetchAllBoard();
    this.props.fetchHotBoard();
  }

  render() {
    const allBoardEntry = this.props.storedAllBoard.map((article) => (
      <Board
        key={article.id}
        id={article.id}
        title={article.title}
        tag={article.tag}
        author_name={article.author}
        clickDetail={() => {
          this.props.history.push(`/boards/normal/${article.id}`);
        }}
      />
    ));
    const hotBoardEntry = this.props.storedHotBoard.map((article) => (
      <Board
        key={article.id}
        id={article.id}
        title={article.title}
        tag={article.tag}
        author_name={article.author}
        clickDetail={() => {
          this.props.history.push(`/boards/normal/${article.id}`);
        }}
      />
    ));

    return (
      <div className="CommunityMain">
        <Button id="direct-to-all-board" onClick={() => this.props.history.push('/boards/all/')}>
          ALL
        </Button>
        <Table hover size="sm">
          <thead>
            <tr>
              <th>ArticleID</th>
              <th>Title</th>
              <th>Auther</th>
              <th>tag</th>
            </tr>
          </thead>
          <tbody>
            {allBoardEntry}
          </tbody>
        </Table>
        <Button id="direct-to-hot-board" onClick={() => this.props.history.push('/boards/hot/')}>
          Hot
        </Button>
        <Table hover size="sm">
          <thead>
            <tr>
              <th>ArticleID</th>
              <th>Title</th>
              <th>Auther</th>
              <th>tag</th>
            </tr>
          </thead>
          <tbody>
            {hotBoardEntry}
          </tbody>
        </Table>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedAllBoard: state.article.articleListAll,
  storedHotBoard: state.article.articleListHot,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllBoard: () => dispatch(actionCreators.fetchAllBoard(8, 'all')),
  fetchHotBoard: () => dispatch(actionCreators.fetchHotBoard(8, 'all')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityMain);
