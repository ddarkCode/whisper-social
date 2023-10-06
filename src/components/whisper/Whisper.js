import React from 'react';
import {Link} from 'react-router-dom';

import './Whisper.css';

function Whisper({image_url, title, whisper, _id}) {
  return (
    <section>
      <Link to={`/whispers/${_id}`}  className='whisper-container'>
        <img src={image_url} alt='whisper' />
        <h2>{title}</h2>
        <p>{whisper.substring(0, 150)}...</p>
      </Link>
    </section>
  )
}

export default Whisper