/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions';


class ArticleDetail extends Component {
  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleId);
  }

  render() {
    return (
      <div className="ArticleDetail">
        Article Number:
        <p id="article-id">{this.props.storedArticle.id}</p>
        Author:
        <p id="article-author">{this.props.storedArticle.author}</p>
        Title:1
        <p id="article-title">{this.props.storedArticle.title}</p>
        Content:
        <p id="article-content">{this.props.storedArticle.content}</p>
        Like:
        <p id="article-like">{this.props.storedArticle.like}</p>
        Dislike:
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail);
