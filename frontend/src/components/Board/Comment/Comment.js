import React from 'react';

const comment = (props) => {
  <div className='comment'>
    <div className='comment-content'>
      {props.content}
    </div>
    <div className='comment-author'>
      {props.author}
    </div>
  </div>
}
export default comment;