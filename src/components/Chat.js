import React from 'react';
import {Link} from 'react-router-dom';

function Chat({image_url, username, date, message, to}) {
  return (
    <li className="chat-container">
    <div className={`single-chat ${to ? 'mine': 'other'}`}>
      <div className="chat-header">
        <div className="chat-profile-container">
          <Link to={to ? `/users/${to}` : `/whisperer`}>
           <span>
            <img src={image_url ? image_url : 'https://media.istockphoto.com/id/1442990932/photo/computer-woman-programmer-and-man-training-for-coding-cyber-security-or-software-on-computer.webp?b=1&s=170667a&w=0&k=20&c=67D7gNk7D8DR_gP-fms2FrLlFF0qh1jYOgrPEDcfvrw='} />
          </span>{" "}
           <span>{username}</span>
          </Link>
        </div>

        <div className="chat-header-time">
          {" "}
          <span>{date}</span>
        </div>
      </div>
      <div className="chat-body">
        <p>
          {message}
        </p>
      </div>
    </div>
  </li>
  )
}

export default Chat