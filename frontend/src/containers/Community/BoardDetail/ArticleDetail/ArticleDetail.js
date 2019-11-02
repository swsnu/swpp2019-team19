/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as actionCreators from '../../../../store/actions';


class ArticleDetail extends Component {
  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleId);
  }

  render() {
    const VoteHandler = (vote) => {
      this.props.putVote(vote, this.props.storedArticle.id);
      window.location.reload(false);
      /* window.location.replace(`/boards/${this.props.match.params.boardName}/
      ${this.props.match.params.articleId}/`); */
    };
    return (
      <div className="ArticleDetail">
        <Button id="direct-to-board" onClick={() => this.props.history.push(`/boards/${this.props.match.params.boardName}/`)}>
          Back to Board
        </Button>
        <br />
        <br />
        Article Number:
        <p id="article-id">{this.props.storedArticle.id}</p>
        Author:
        <p id="article-author">{this.props.storedArticle.author}</p>
        Title:
        <p id="article-title">{this.props.storedArticle.title}</p>
        Content:
        <p id="article-content">{this.props.storedArticle.content}</p>
        <Button id="direct-to-like" onClick={() => VoteHandler('like')}>
          like
        </Button>
        <p id="article-like">{this.props.storedArticle.like}</p>
        <Button id="direct-to-dislike" onClick={() => VoteHandler('dislike')}>
          dislike
        </Button>
        <p id="article-dislike">{this.props.storedArticle.dislike}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedArticle: state.article.article,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(actionCreators.fetchArticle(id)),
  putVote: (vote, id) => dispatch(actionCreators.putVote(vote, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail);
