import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Whisper from '../components/whisper/Whisper';
import {getWhispers} from '../redux/whisper/whispersSlice';

import './css/Whispers.css';

function WhispersPage() {
  const dispatch = useDispatch()
  const {whispers} = useSelector(state => state.whispers)
  useEffect(() => {

       dispatch(getWhispers({}))
      
    
  }, [])

  return (
    <main>
       {
         whispers.map((whisper, index) => <Whisper key={index} {...whisper} />)
       }
       
    </main>
  )
}

export default {
  component: WhispersPage,
  loadData: (store) => store.dispatch(getWhispers({}))
}