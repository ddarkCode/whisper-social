import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  getWhisper,
  getComments,
  getLikes,
  postLike,
  deleteLike,
  postComment,
  deleteWhisper,
} from '../redux/whisper/whispersSlice';
import { formatDate } from '../utils/utils';
import Comment from '../components/comments/Comment';

import './css/WhisperPage.css';

function WhisperPage({}) {
  const params = useParams();
  const dispatch = useDispatch();
  const whispers = useSelector((state) => state.whispers);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [liked, setLiked] = useState(false);
  const [display, setDisplay] = useState(false);
  const [comment, setComment] = useState('');
  const { whisper, comments, likes } = whispers;
  const { whisperId } = params;

  let whisperStatus = false;
  if (auth.user && whisper) {
    if (whisper.whispererId === auth.user._id) {
      whisperStatus = true;
    }
  }

  useEffect(() => {
    dispatch(getWhisper(whisperId));
    dispatch(getLikes(whisperId));
    dispatch(getComments(whisperId));
  }, [liked]);

  function handleLike() {
    dispatch(postLike({ whisperId, likedById: auth.user._id }));
  }
  function handleDeleteLike() {
    dispatch(deleteLike(whisper.likeStatus._id));
  }
  function handleLikeButton() {
    if (liked) {
      setLiked(false);
      handleDeleteLike();
    } else {
      setLiked(true);
      handleLike();
    }
  }
  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    dispatch(
      postComment({
        commentById: auth.user._id,
        whisperId,
        comment,
      })
    );

    setComment('');
    history.push(`/whispers/${whisperId}`);
  }

  function handleCommentButton() {
    if (auth.user) {
      setDisplay(!display);
    } else {
      history.push('/signin');
    }
  }

  function renderWhisper() {
    return Object.keys(whisper).length === 0 ? (
      <h1>Loading</h1>
    ) : (
      <main className="single-whisper">
        <Comment
          comments={comments}
          display={display}
          setDisplay={setDisplay}
          comment={comment}
          onSubmit={handleCommentSubmit}
          onChange={handleCommentChange}
        />
        <div>
          <img src={whisper.image_url} />
          <h2>{whisper.title}</h2>
          <div>
            <span>{`${whisper.firstname} ${whisper.lastname}`}</span>
            <span>
              {whisper.createdAt
                ? formatDate(whisper.createdAt)
                : 'October 2023'}
            </span>
          </div>
          <Link
            className="whisper-whisperer-link"
            to={whisperStatus ? '/whisperer' : `/users/${whisper.whispererId}`}
          >
            {whisper.username}
          </Link>
          <p>{whisper.whisper}</p>
          <div className="reaction-icons">
            <div onClick={handleCommentButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="2em"
                height="2em"
                fill="currentColor"
              >
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
              </svg>
              <span>{comments.length}</span>
            </div>
            <div>
              <button
                disabled={auth.user ? false : true}
                onClick={handleLikeButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="2em"
                  height="2em"
                  fill={liked ? '#C70039' : '#fff'}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  ></path>
                </svg>
              </button>
              <span>{likes.length}</span>
            </div>
          </div>
          {whisperStatus ? (
            <div className="whisperer-edit-delete">
              <Link to={`/addwhisper/${whisperId}`}>Edit Whisper</Link>
              <button onClick={() => dispatch(deleteWhisper(whisperId))}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </main>
    );
  }

  return renderWhisper();
}

export default {
  component: WhisperPage,
  loadData: (store, whisperId) => {
    store.dispatch(getWhisper(whisperId));
    store.dispatch(getLikes(whisperId));
    store.dispatch(getComments(whisperId));
  },
};
