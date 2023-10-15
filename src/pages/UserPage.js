import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { size } from "lodash";
import { GeoAlt, CalendarHeart, Envelope } from "react-bootstrap-icons";
import {useParams} from 'react-router-dom';
import io from "socket.io-client";

const socket = io('http://localhost:3000');

socket.onAny((e, ...args) => {
  console.log(e, args)
})


import Whisper from "../components/whisper/Whisper";
import { formatDate } from "../utils/utils";
import {
  getWhispererWhispers,
} from "../redux/whisper/whispersSlice";
import { getAUserProfile, followUser, unfollowUser } from "../redux/users/usersSlice";
import { DefaultImageUser } from "../components/images/DefaultImage";
import Chats from "./Chats";

import withAuthStatus from "../components/hoc/withAuthStatus";

import "./css/WhispererPage.css";

function UserPage() {
  const [change, setChange] = useState(false)
  const [display, setDisplay] = useState(false);
  const auth = useSelector((state) => state.auth);
  const whispers = useSelector((state) => state.whispers);
  const user = useSelector(state => state.users.user);
  const params = useParams()
  const dispatch = useDispatch();

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  let loggedInUserId = auth.user ? auth.user._id : null;
  let receiverUserId = user ? user._id : null;
  console.log('Chat Messages:  ', chatMessages)

  useEffect(() => {
    dispatch(getWhispererWhispers(params.userId));
    dispatch(getAUserProfile(params.userId))
  }, [change]);


  useEffect(() => {

    socket.on('connect', () => {
      console.log('Socket COnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnected')
    });

  const savedMessages = localStorage.getItem('chatMessages');
  console.log(JSON.parse(savedMessages))
  if (savedMessages) {
    setChatMessages(JSON.parse(savedMessages));
  }

  socket.emit('join', loggedInUserId);
  
  socket.on('private-message', data => {
    setChatMessages(prevM => [...prevM, data])
    console.log('private-message: ', data)

      localStorage.setItem('chatMessages', JSON.stringify([...chatMessages, data]));
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('private-message');
    }
  }, []);

  

  const whispererPosts = whispers.whispererWhispers;

  let followStatus;

  if (auth.user && Object.keys(user).length !== 0) {
    followStatus = user.followers[auth.user._id]
  }

  function handleFollowUnfollow() {
    if (followStatus) {

       dispatch(unfollowUser({userId: params.userId, whispererId: auth.user._id}))
       setChange(!change)   
    } else {
      dispatch(followUser({userId: params.userId, whispererId: auth.user._id}))
      setChange(!change)
    }
  }
  
  let letter;
  if (user.username) {
    letter = user.username.slice(1, 2).toUpperCase();
  }

  function removeChatDisplay() {
    setDisplay(!display)
  }

  
  const handleSendMessage = () => {
    let date = new Date;
    date = date.getHours() + ':' + date.getMinutes();
    const messageInfo = {
      to: receiverUserId,
      message,
      image_url: auth.user.image_url ? auth.user.image_url :'https://plus.unsplash.com/premium_photo-1682140993556-f263e434000b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      date,
      username: auth.user.username
    }
    socket.emit("private-message", messageInfo);
    setChatMessages(prevM => [...prevM, messageInfo])
    setMessage("");
  };

  function handleMessageChange(e) {
    setMessage(e.target.value)
  }
 
  return (
    <main className="profile">
      
      <div className="profile-header">
        <div>
          <div className="profile-info">
          {
              user && user.image_url ? <img src={user.image_url} alt="user profile pic" />
            :
           <DefaultImageUser letter={letter} />
            }
           
            <div>
              <span>{`${user ? user.firstname : ""} ${
                user ? user.lastname : ""
              }`}</span>{" "}
              <span>{user ? user.username : ""}</span>{" "}
            </div>
          </div>
          
          
        <div>

          <button className="follow-button" onClick={handleFollowUnfollow}>{followStatus ? 'Following' : 'Follow'}</button>
          
          <svg className="envelope" onClick={removeChatDisplay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="7em" height="3em" fill="currentColor" ><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path></svg>
          

        </div>


        </div>
        <div>
          <span>
            <GeoAlt style={{ marginRight: "5px" }} />
            {`${user ? user.location : ""}`}
          </span>
          <span>
            <CalendarHeart style={{ marginRight: "10px" }} />
            {`Joined: ${user ? formatDate(user.createdAt) : ""}`}
          </span>
        </div>
        <div>
          <span>{`Followers: ${
            user ? size(user.followers) : ""
          }`}</span>
          <span>{`Following: ${
            user ? size(user.following) : ""
          }`}</span>
        </div>
      </div>
      <h3>{user.username} Whispers</h3>

      <div className="user-whispers">
        {whispererPosts.map((whisper, index) => (
          <Whisper key={whisper._id} {...whisper} />
        ))}
      </div>
      <Chats display={display} setDisplay={removeChatDisplay} value={message} onChange={handleMessageChange} chatMessages={chatMessages} handleSendMessage={handleSendMessage} />
    </main>
  );
}

export default {
  component: withAuthStatus(UserPage),
  loadData: (store, whisperId, userId) =>
    store.dispatch(getWhispererWhispers(whisperId)),
};
