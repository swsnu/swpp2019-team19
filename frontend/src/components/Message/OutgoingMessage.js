import React from 'react';

import PropTypes from 'prop-types';

const OutgoingMessage = (props) => {
  const { message } = props;
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default OutgoingMessage;

OutgoingMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
