import React from 'react';
import './Article.css';

const Article = (props) => (
  <tr className="Article">
    <th className="article_id">
      {props.id}
    </th>
    <th>
      <th className="article-title" onClick={props.clickDetail}>
        {props.title}
      </th>
    </th>
    <th className="author_name">
      {props.author_name}
    </th>
    <th className="tag">
      {props.tag}
    </th>
  </tr>
);

export default Article;
