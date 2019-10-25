import React from 'react';
import Button from 'bootstrap';
import './Article.css';

const Article = (props) => (
  <tr className="Article">
    <th className="article_id">
      Article_ID:
      {props.id}
    </th>
    <th className="author_name">
      Auther:
      {props.author_name}
    </th>
    <th>
      <Button className="article-title" onClick={props.clickDetail}>
        Title:
        {props.title}
      </Button>
    </th>
    <th className="tag">
      tag:
      {props.tag}
    </th>

  </tr>
);

export default Article;
