import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { size } from 'lodash';
import { GeoAlt, CalendarHeart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Whisper from '../components/whisper/Whisper';
import { formatDate } from '../utils/utils';
import { getWhispererWhispers } from '../redux/whisper/whispersSlice';

import { DefaultImageUser } from '../components/images/DefaultImage';
import withAuthStatus from '../components/hoc/withAuthStatus';
import Loading from '../components/loading/Loading';

import './css/WhispererPage.css';

function WhispererPage() {
  const auth = useSelector((state) => state.auth);
  const { whispererWhispers, paginationOptions } = useSelector(
    (state) => state.whispers
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getWhispererWhispers({ page: 1, limit: 10, userId: auth.user._id })
    );
  }, []);

  let letter;
  if (auth.user) {
    letter = auth.user.username.slice(1, 2).toUpperCase();
  }

  const { limit, hasNextPage, nextPage } = paginationOptions;
  const fetchMoreData = () => {
    dispatch(getWhispererWhispers({ nextPage, limit, userId: auth.user._id }));
  };

  return (
    <main className="profile">
      <div className="profile-header">
        <div>
          <div className="profile-info">
            {auth.user && auth.user.image_url ? (
              <img src={auth.user.image_url} alt="user profile pic" />
            ) : (
              <DefaultImageUser letter={letter} />
            )}
            <div>
              <span>{`${auth.user ? auth.user.firstname : ''} ${
                auth.user ? auth.user.lastname : ''
              }`}</span>{' '}
              <span>{auth.user ? auth.user.username : ''}</span>{' '}
            </div>
          </div>
          <span>
            <Link className="edit-profile" to="/signup">
              Edit Profile
            </Link>
          </span>
        </div>
        <div>
          <span>
            <GeoAlt style={{ marginRight: '5px' }} />
            {`${auth.user ? auth.user.location : ''}`}
          </span>
          <span>
            <CalendarHeart style={{ marginRight: '10px' }} />
            {`Joined: ${auth.user ? formatDate(auth.user.createdAt) : ''}`}
          </span>
        </div>
        <div>
          <span>{`Followers: ${
            auth.user ? size(auth.user.followers) : ''
          }`}</span>
          <span>{`Following: ${
            auth.user ? size(auth.user.following) : ''
          }`}</span>
        </div>
      </div>
      <h3>{auth.user.username} Whispers</h3>

      {whispererWhispers.length === 0 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={whispererWhispers.length}
          next={fetchMoreData}
          hasMore={hasNextPage}
          loader={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loading />
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="user-whispers">
            {whispererWhispers.map((whisper, index) => (
              <Whisper key={whisper._id} {...whisper} userId={auth.user._id} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </main>
  );
}

export default {
  component: withAuthStatus(WhispererPage),
  loadData: (store, whisperId, userId) =>
    store.dispatch(getWhispererWhispers(userId)),
};
