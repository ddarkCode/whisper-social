import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Whisper from '../components/whisper/Whisper';
import { getWhispers } from '../redux/whisper/whispersSlice';
import Loading from '../components/loading/Loading';

import './css/Whispers.css';

function WhispersPage() {
  const dispatch = useDispatch();
  let { whispers, paginationOptions } = useSelector((state) => state.whispers);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (whispers.length === 0) {
      dispatch(getWhispers({ page: 1, limit: 10 }));
    }
  }, []);

  function handleSearchChange(e) {
    const { value, name } = e.target;
    setSearch(value);
  }
  whispers = whispers.filter(
    (whisper) =>
      whisper.title.toLowerCase().includes(search.toLowerCase()) ||
      whisper.whispererUsername.toLowerCase().includes(search.toLowerCase())
  );

  const { limit, hasNextPage, nextPage } = paginationOptions;

  const fetchMoreData = () => {
    dispatch(getWhispers({ page: nextPage, limit }));
  };

  return (
    <main>
      {whispers.length === 0 ? (
        <Loading />
      ) : (
        <>
          <input
            className="search_input"
            name="search"
            placeholder="Search Whispers Or Whisperers"
            value={search}
            onChange={handleSearchChange}
          />
          <InfiniteScroll
            dataLength={whispers.length}
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
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '18px',
                  margin: '20px 0',
                }}
              >
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="whisper-page">
              {whispers.map((whisper, index) => (
                <Whisper key={whisper._id} {...whisper} />
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </main>
  );
}

export default {
  component: WhispersPage,
  loadData: (store) => store.dispatch(getWhispers({ page: 1, limit: 10 })),
};
