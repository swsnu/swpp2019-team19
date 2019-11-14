/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as actionCreators from '../../../../store/actions';


class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.props.fetchArticle(this.props.match.params.articleId);
    this.props.fetchComment(this.props.match.params.articleId);
    this.state = {
      content: ''
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('shouldupdate call');
  //   if (nextProps === undefined) {
  //     return false;
  //   }
  //   if (nextProps.storedArticle.like !== this.props.storedArticle.like
  //     || nextProps.storedArticle.dislike !== this.props.storedArticle.dislike) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    const VoteHandler = (vote) => {
      this.props.putVote(vote, this.props.storedArticle.id);
      // window.location.reload(false);
    };
    const handleCommentCreate = () => {
      const { postComment } = this.props;
      const { content } = this.state;
      postComment(this.props.match.params.articleId, content);
    }

    const { content } = this.state;
    const { like, dislike } = this.props.storedArticle;
    const { commentList } = this.props.storedComment;
    console.log(commentList);
    return (
      <div className="ArticleDetail">
        <Button
          id="direct-to-board"
          onClick={() => this.props.history
            .push(`/boards/${this.props.match.params.boardName}/`)}
        >
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
        <Button
          id="direct-to-like"
          onClick={() => VoteHandler('like')}
        >
          {like + (' like'.concat(like === 1 ? '' : 's'))}
        </Button>
        <Button
          id="direct-to-dislike"
          onClick={() => VoteHandler('dislike')}
        >
          {dislike + (' dislike'.concat(dislike === 1 ? '' : 's'))}
        </Button>
        <div className='comment'>
          <div className='new-comment'>
            <input
              type="text"
              id='new-comment-input'
              value={content}
              placeholder="input comment"
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </div>
          <Button
            id='create-comment-button'
            onClick={() => handleCommentCreate()}
            disabled={!content}
          >Comment</Button><br></br>
          <div className='comment-list'>{commentList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedArticle: state.article.article,
  storedComment: state.comment.commentList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(actionCreators.fetchArticle(id)),
  putVote: (vote, id) => dispatch(actionCreators.putVote(vote, id)),
  fetchComment: (id) => dispatch(actionCreators.fetchComment(id)),
  postComment: (id, content) => dispatch(actionCreators.postComment(id, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail);
