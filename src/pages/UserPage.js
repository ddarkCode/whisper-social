import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { size } from "lodash";
import { GeoAlt, CalendarHeart } from "react-bootstrap-icons";
import {useParams} from 'react-router-dom';

import Whisper from "../components/whisper/Whisper";
import { formatDate } from "../utils/utils";
import {
  getWhispererWhispers,
} from "../redux/whisper/whispersSlice";
import { getAUserProfile, followUser, unfollowUser } from "../redux/users/usersSlice";
import DefaultImage from "../components/images/DefaultImage";
import { DefaultImageUser } from "../components/images/DefaultImage";

import "./css/WhispererPage.css";

function UserPage() {
  const [change, setChange] = useState(false)
  const auth = useSelector((state) => state.auth);
  const whispers = useSelector((state) => state.whispers);
  const user = useSelector(state => state.users.user);
  const params = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWhispererWhispers(params.userId));
    dispatch(getAUserProfile(params.userId))
  }, [change]);

  const whispererPosts = whispers.whispererWhispers;

  const spanStyle = {
    display: "flex",
    alignItems: "center",
  };

  let followStatus;

  if (auth.user && user) {
    followStatus = user.followers[auth.user._id]
  }
  console.log( followStatus )

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
          
          <button className="follow-button" onClick={handleFollowUnfollow}>{followStatus ? 'Following' : 'Follow'}</button>
    
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
    </main>
  );
}

export default {
  component: UserPage,
  loadData: (store, whisperId, userId) =>
    store.dispatch(getWhispererWhispers(whisperId)),
};
