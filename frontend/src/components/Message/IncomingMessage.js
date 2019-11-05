/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const IncomingMessage = (props) => (
  <React.Fragment>
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src="https://ptetutorials.com/images/user-profile.png" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default IncomingMessage;

