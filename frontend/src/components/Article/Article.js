import React from 'react';

import './Article.css';

const Article = props => {
  return (
    <div className='Article'>
      <div className='article_id'>
        Article_ID:
        {props.id}
      </div>
      <div className='author_name'>
        Auther:
        {props.author_name}
      </div>
      <button className='article-title' onClick={props.clickDetail}>
        Title:
        {props.title}
      </button>
      <div className='tag'>
        tag:
        {props.tag}
      </div>

    </div>
  );
};

export default Article;
