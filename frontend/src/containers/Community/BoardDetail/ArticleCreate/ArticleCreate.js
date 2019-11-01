/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions';

// import Article from '../../../../components/Article/Article';

class ArticleCreate extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }
  /* eslint-disable */


  render() {
    const handleCreate = () => {
      const { postArticle } = this.props;
      postArticle(title, content);
    };
    const { title } = this.state;
    const { content } = this.state;
    return (
      <div className="ArticleCreate">
        <p className="article-create">ArticleCreate page</p>
        title
        <div className="article-title">
          <input
            type="text"
            id="article-title-input"
            value={title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>
        content
        <div className="article-content">
          <textarea
            id="article-content-input"
            type="text"
            rows="10"
            cols="40"
            value={content}
            onChange={(e) => this.setState({ content: e.target.value })}
          />
        </div>
        <Button
          id="create-article-button"
          onClick={() => handleCreate()}
          disabled={!title || !content}
        >
          Create
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  postArticle: (title, content) => dispatch(
    actionCreators.postArticle(title, content),
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(ArticleCreate);
