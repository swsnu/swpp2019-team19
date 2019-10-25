import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Article from '../../components/Article/Article'
class CommunityMain extends Component {
  componentDidMount() {
    this.props.fetchList('all', 'normal');
  }

  render() {
    const articles = this.props.storedArticles.map(article => {
      return (
        <Article
          id={article.id}
          title={article.title}
          tag={article.tag}
          author_name={article.author}
          clickDetail={() => {
            this.props.history.push('/boards/normal/' + article.id);
          }}
        />
      );
    });

    return (
      <div className="CommunityMain">
        <button id="direct-to-all-board" onClick={() => this.props.history.push('/boards/normal/')}>
          ALL
        </button>
        {articles}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedArticles: state.article.articleList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: (boardName, tag) => dispatch(actionCreators.fetchList(8, boardName, tag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityMain);
