/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Comment = (props) => (
  <div className="comment">
    {props.content}
    --
    {props.author}
  </div>
);
export default Comment;
