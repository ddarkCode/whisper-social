import React from 'react';
import {useSelector} from 'react-redux';
import {size} from 'lodash';
import {GeoAlt, CalendarHeart} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

import Whisper from '../components/whisper/Whisper';
import { formatDate } from '../utils/utils';

import './css/WhispererPage.css';

function WhispererPage() {
  const auth = useSelector(state => state.auth)
  const whispererPosts = [
    {
      'image_url': 'https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3',
      'title': 'Hello World',
      'whisper': 'Embrace your inner hero on our platform, where your tweets resonate far and wide, sparking conversations that change the world one post at a time'
  },
  {
    'image_url': 'https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3',
    'title': 'Hello World',
    'whisper': 'Embrace your inner hero on our platform, where your tweets resonate far and wide, sparking conversations that change the world one post at a time'
},
{
  'image_url': 'https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3',
  'title': 'Hello World',
  'whisper': 'Embrace your inner hero on our platform, where your tweets resonate far and wide, sparking conversations that change the world one post at a time'
},   {
  'image_url': 'https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3',
  'title': 'Hello World',
  'whisper': 'Embrace your inner hero on our platform, where your tweets resonate far and wide, sparking conversations that change the world one post at a time'
},   {
  'image_url': 'https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3',
  'title': 'Hello World',
  'whisper': 'Embrace your inner hero on our platform, where your tweets resonate far and wide, sparking conversations that change the world one post at a time'
},   {
  'image_url': 'https://cdn-misc.wimages.net/stories/fcc1002b-fe3b-4b14-a35f-dd790a179de4.jpg?v=3',
  'title': 'Hello World',
  'whisper': 'Embrace your inner hero on our platform, where your tweets resonate far and wide, sparking conversations that change the world one post at a time'
}, 
  ]

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
        whispererPosts.map((whisper, index) => <Whisper key={index} {...whisper} />)
      }
     </div>
    </main>
  )
}

export default {
  component: WhispererPage
}