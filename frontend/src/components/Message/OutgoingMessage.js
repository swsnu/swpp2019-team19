/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const OutgoingMessage = (props) => (
  <React.Fragment>
    <div class="outgoing_msg">
      <div class="sent_msg">
        <p>{props.message}</p>
      </div>
    </div>
  </React.Fragment >
);

export default OutgoingMessage;

