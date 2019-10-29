import React from 'react';
import './Board.css';

const Board = (props) => (
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

export default Board;
