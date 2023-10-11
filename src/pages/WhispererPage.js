import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {size} from 'lodash';
import {GeoAlt, CalendarHeart} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

import Whisper from '../components/whisper/Whisper';
import { formatDate } from '../utils/utils';
import { getWhispers, getWhispererWhispers } from '../redux/whisper/whispersSlice';

import './css/WhispererPage.css';

function WhispererPage() {
  const auth = useSelector(state => state.auth)
  const whispers = useSelector(state => state.whispers)

  const dispatch = useDispatch()
  useEffect(() => {
    
      dispatch(getWhispererWhispers(auth.user._id))
    
  }, []);

 const whispererPosts = whispers.whispererWhispers;

  const spanStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <main className='profile'>
     <div className='profile-header'>
      <div>
        <div className='profile-info'>
        <img src='https://images.unsplash.com/photo-1505274664176-44ccaa7969a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlY3JldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' />
         <div ><span>{`${auth.user ? auth.user.firstname : ''} ${auth.user ? auth.user.lastname : ''}`}</span> <span>{auth.user ? auth.user.username : ''}</span> </div>
        </div>
        <span><Link to='/signup'>Edit Profile</Link></span>
      </div>
      <div>
        <span> 
          <GeoAlt style={{marginRight: '5px'}}/>
          {`${auth.user ? auth.user.location : ''}`}</span>
        <span>
          <CalendarHeart  style={{marginRight: '10px'}} />
          {`Joined: ${auth.user ? formatDate(auth.user.createdAt) : ''}`}</span>
      </div>
      <div>
        <span>{`Followers: ${auth.user ? size(auth.user.followers) : ''}`}</span>
        <span>{`Following: ${auth.user ? size(auth.user.following) : ''}`}</span>
      </div>
     </div>
     <h3>My Whispers</h3>

     <div className='user-whispers'>
      {
        whispererPosts.map((whisper, index) => <Whisper key={whisper._id} {...whisper} />)
      }
     </div>
    </main>
  )
}

export default {
  component: WhispererPage,
  loadData: (store, whisperId, userId) => store.dispatch(getWhispererWhispers(userId))
}