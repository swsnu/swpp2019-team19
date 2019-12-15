import React from 'react';

import PropTypes from 'prop-types';

const IncomingMessage = (props) => {
  const { message } = props;
  const parseIncomingText = (text) => {
    let retText = '';
    const splitText = text.split('<br>');
    splitText.forEach((element) => {
      if (element !== '<br/>') {
        retText += `${element}<br>`;
      }
    });
    return retText;
  };
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        {
          message.text === undefined
            ? <img alt="response-img" src={message.image} />
            : (
              <p>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={
                    { __html: parseIncomingText(message.text) }
                  }
                />
              </p>
            )
        }
        <p />
      </div>
    </div>
  );
};


export default IncomingMessage;

IncomingMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
};
