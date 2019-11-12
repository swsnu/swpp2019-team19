/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const ArticleEntry = (props) => (
  <tr className="Board">
    <th className="article_id">
      {props.id}
    </th>
    <th className="article-title" onClick={props.clickDetail}>
      {props.title}
    </th>
    <th className="author_name">
      {props.author_name}
    </th>
    <th className="tag">
      {props.tag}
    </th>

  </tr>
);

export default ArticleEntry;
