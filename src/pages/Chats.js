import React, { useState, useEffect } from "react";

import Chat from "../components/Chat";

import "./css/Chats.css";

function Chats({display, setDisplay, value, onChange, handleSendMessage, chatMessages }) {
  const [messages, setMessages] = useState([
    {
      image_url: 'https://media.istockphoto.com/id/1430286027/photo/information-technology-businessman-working-on-computer-in-office-for-digital-app-software.webp?b=1&s=170667a&w=0&k=20&c=YFwXXbAFfDtX7-2iNcbH6N-ttS3CcnMt7rlUlwIXZ2g=',
      username: '@Ryan',
      time: '12:46',
      to: true,
      message: 'This example demonstrates direct messaging without using rooms, allowing users to send private messages to specific recipients.'
    },
    {
      image_url: 'https://media.istockphoto.com/id/1430286027/photo/information-technology-businessman-working-on-computer-in-office-for-digital-app-software.webp?b=1&s=170667a&w=0&k=20&c=YFwXXbAFfDtX7-2iNcbH6N-ttS3CcnMt7rlUlwIXZ2g=',
      username: '@Ryan',
      time: '12:46',
      to: true,
      message: 'This example demonstrates direct messaging without using rooms, allowing users to send private messages to specific recipients.'
    },
    {
      image_url: 'https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.webp?b=1&s=170667a&w=0&k=20&c=bHXqxhYseYfmPLqYPOAbfGlv1Ye8d9KeUraRzad5XCg=',
      username: '@Tasia',
      time: '12:46',
      to: false,
      message: 'This example demonstrates direct messaging without using rooms, allowing users to send private messages to specific recipients.'
    }
  ]);
 
const messageInfos = [
  {
      "from": "65200acd00208429be4d3f29",
      "message": "Hello too",
      "image_url": "https://images.unsplash.com/photo-1696887350319-86341eda4b71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      "date": "20:41",
      "username": "@Tasia"
  },
  {
    "to": "65200acd00208429be4d3f29",
    "message": "Hello too",
    "image_url": "https://images.unsplash.com/photo-1694399120199-72ac9241c2f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "date": "20:41",
    "username": "@Tasia"
}
]
  return (
    <div className="chats-container" style={{display: display ? 'block' : 'none', zIndex: '1'}}>
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
          {chatMessages.length > 0 ? chatMessages.map((msg, index) => <Chat key={index} {...msg} />)
         :
          messageInfos.map((message, index) => <Chat key={index}  {...message} />)
         }
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
