import React from 'react';

const MovingMessage: React.ComponentType = ({ children }) => (
  <div className="header__additional-message openable">
    <div className="message__content">
      {[1, 2, 3].map((index) => (
        /* put the information message content here */
        <div className={`message${index}`}>
          <div className="message__arrow" />
          {children}
        </div>
      ))}
    </div>
  </div>
);

export default MovingMessage;
