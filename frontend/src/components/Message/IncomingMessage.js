import React from 'react';

import PropTypes from 'prop-types';

const IncomingMessage = (props) => {
  const { message } = props;
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          {
            message.text === undefined
              ? <img alt="response-img" src={message.image} />
              : <p>{message.text}</p>
          }
          <p />
        </div>
      </div>
    </div>
  );
};


export default IncomingMessage;

IncomingMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
};
