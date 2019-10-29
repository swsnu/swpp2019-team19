import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import Board from '../../../components/Board/Board';

class BoardDetail extends Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.boardName, 'all');
  }

  render() {
    const articleEntry = this.props.storedArticles.map((article) => (
      <Board
        key={article.id}
        id={article.id}
        title={article.title}
        tag={article.tag}
        author_name={article.author}
        clickDetail={() => {
          this.props.history.push(`/boards/${this.props.match.params.boardName}/${article.id}`);
        }}
      />
    ));

    return (
      <div className="BoardDetail">
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
            {articleEntry}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedArticles: state.article.articleList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: (boardName, tag) => dispatch(actionCreators.fetchList(20, boardName, tag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardDetail);
