import React, { useState, useEffect } from 'react';

import Chat from '../components/Chat';

import './css/Chats.css';

function Chats({
  display,
  setDisplay,
  value,
  onChange,
  handleSendMessage,
  chatMessages,
}) {
  return (
    <div
      className="chats-container"
      style={{ display: display ? 'block' : 'none', zIndex: '1' }}
    >
      <div className="chats">
        <svg
          className="chat-cancel"
          onClick={setDisplay}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="3em"
          height="3em"
          fill="#000"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
        </svg>
        <ul>
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => <Chat key={index} {...msg} />)
          ) : (
            <h1>Check Out User Profiles To Chat With Other Users</h1>
          )}
        </ul>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message"
            value={value}
            onChange={onChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
