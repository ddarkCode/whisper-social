import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { size } from "lodash";
import { GeoAlt, CalendarHeart } from "react-bootstrap-icons";
import {useParams} from 'react-router-dom';

import Whisper from "../components/whisper/Whisper";
import { formatDate } from "../utils/utils";
import {
  getWhispererWhispers,
} from "../redux/whisper/whispersSlice";
import { getAUserProfile } from "../redux/users/usersSlice";

import "./css/WhispererPage.css";

function UserPage() {
  const auth = useSelector((state) => state.auth);
  const whispers = useSelector((state) => state.whispers);
  const user = useSelector(state => state.users.user);
  const params = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWhispererWhispers(params.userId));
    dispatch(getAUserProfile(params.userId))
  }, []);

  const whispererPosts = whispers.whispererWhispers;

  const spanStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <main className="profile">
      <div className="profile-header">
        <div>
          <div className="profile-info">
            <img src="https://images.unsplash.com/photo-1505274664176-44ccaa7969a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlY3JldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
            <div>
              <span>{`${user ? user.firstname : ""} ${
                user ? user.lastname : ""
              }`}</span>{" "}
              <span>{user ? user.username : ""}</span>{" "}
            </div>
          </div>
          
          <button className="follow-button" >Follow</button>
    
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
