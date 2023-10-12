import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Whisper from '../components/whisper/Whisper';
import {getWhispers} from '../redux/whisper/whispersSlice';

import './css/Whispers.css';

function WhispersPage() {
  const dispatch = useDispatch()
  let {whispers} = useSelector(state => state.whispers)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getWhispers({}));
  }, [])

  function handleSearchChange(e) {
    const {value, name} = e.target;
    setSearch(value);
  }
  whispers = whispers.filter(whisper => whisper.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main> 
     
      <input className='search_input' name='search' placeholder='Search Whispers' value={search} onChange={handleSearchChange} />

      <div className='whisper-page'>
      {
         whispers.map((whisper, index) => <Whisper key={index} {...whisper} />)
       }
      </div>
       
    </main>
  )
}

export default {
  component: WhispersPage,
  loadData: (store) => store.dispatch(getWhispers({}))
}