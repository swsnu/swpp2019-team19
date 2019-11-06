/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IncomingMessage = (props) => (
  <div className="incoming_msg">
    <div className="incoming_msg_img">
      <FontAwesomeIcon icon={faRobot} />
    </div>
    <div className="received_msg">
      <div className="received_withd_msg">
        <p>{props.message}</p>
      </div>
    </div>
  </div>
);

export default IncomingMessage;
