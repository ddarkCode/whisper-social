import React, {useEffect} from 'react';
import {HeartFill, Chat} from 'react-bootstrap-icons';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import { getWhisper } from '../redux/whisper/whispersSlice';
import { formatDate } from '../utils/utils';

import './css/WhisperPage.css'

function WhisperPage({}) {
  const params = useParams();
  const dispatch = useDispatch();
  const {whisper} = useSelector(state => state.whispers);

  useEffect(() => {
    if (Object.keys(whisper).length === 0) {
      dispatch(getWhisper(params.whisperId))
    }
  }, [])

 
  return (
    <main className='single-whisper'>

      <div>
        <img src='https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3' />
        <h2>{whisper.title}</h2>
        <div><span>Sarah</span><span>{formatDate()}</span></div>
        <p>{whisper.whisper}</p>
<div className='reaction-icons'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="2em" height="2em" fill="currentColor"><path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path></svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="2em" height="2em" fill="#C70039"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></svg>
</div>

      </div>
    </main>
  )
}

export default {
  component: WhisperPage,
  loadData: (store, whisperId) => store.dispatch(getWhisper(whisperId))
}