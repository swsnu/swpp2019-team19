/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const OutgoingMessage = (props) => (
  <>
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{props.message}</p>
      </div>
    </div>
  </>
);

export default OutgoingMessage;
