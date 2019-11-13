/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const IncomingMessage = (props) => (
  <div className="incoming_msg">

    <div className="received_msg">
      <div className="received_withd_msg">
        {
          props.message.text === undefined
            ? <img alt="response-img" src={props.message.image} />
            : <p>{props.message.text}</p>
        }
        <p />
      </div>
    </div>
  </div>
);

export default IncomingMessage;
