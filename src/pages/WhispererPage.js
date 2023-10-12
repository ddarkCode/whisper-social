import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { size } from "lodash";
import { GeoAlt, CalendarHeart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import Whisper from "../components/whisper/Whisper";
import { formatDate } from "../utils/utils";
import {
  getWhispers,
  getWhispererWhispers,
} from "../redux/whisper/whispersSlice";

import { DefaultImageUser } from "../components/images/DefaultImage";

import "./css/WhispererPage.css";

function WhispererPage() {
  const auth = useSelector((state) => state.auth);
  const whispers = useSelector((state) => state.whispers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWhispererWhispers(auth.user._id));
  }, []);

  const whispererPosts = whispers.whispererWhispers;

 let letter;
 if (auth.user) {
  letter = auth.user.username.slice(1, 2).toUpperCase()
 }

  return (
    <main className="profile">
      <div className="profile-header">
        <div>
          <div className="profile-info">
          {
              auth.user && auth.user.image_url ? <img src={auth.user.image_url} alt="user profile pic" />
            :
           <DefaultImageUser letter={letter} />
            }
            <div>
              <span>{`${auth.user ? auth.user.firstname : ""} ${
                auth.user ? auth.user.lastname : ""
              }`}</span>{" "}
              <span>{auth.user ? auth.user.username : ""}</span>{" "}
            </div>
          </div>
          <span >
            <Link className="edit-profile" to="/signup">Edit Profile</Link>
          </span>
        </div>
        <div>
          <span>
            <GeoAlt style={{ marginRight: "5px" }} />
            {`${auth.user ? auth.user.location : ""}`}
          </span>
          <span>
            <CalendarHeart style={{ marginRight: "10px" }} />
            {`Joined: ${auth.user ? formatDate(auth.user.createdAt) : ""}`}
          </span>
        </div>
        <div>
          <span>{`Followers: ${
            auth.user ? size(auth.user.followers) : ""
          }`}</span>
          <span>{`Following: ${
            auth.user ? size(auth.user.following) : ""
          }`}</span>
        </div>
      </div>
      <h3>My Whispers</h3>

      <div className="user-whispers">
        {whispererPosts.map((whisper, index) => (
          <Whisper key={whisper._id} {...whisper} />
        ))}
      </div>
    </main>
  );
}

export default {
  component: WhispererPage,
  loadData: (store, whisperId, userId) =>
    store.dispatch(getWhispererWhispers(userId)),
};
