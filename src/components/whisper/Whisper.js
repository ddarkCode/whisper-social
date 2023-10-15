import React from 'react';
import { Link } from 'react-router-dom';

import './Whisper.css';

function Whisper({
  image_url,
  title,
  whisper,
  _id,
  whispererUsername,
  whispererId,
  userId,
}) {
  return (
    <section>
      <div className="whisper-container">
        <Link to={userId ? '/whisperer' : `/users/${whispererId}`}>
          <h1>{whispererUsername}</h1>
        </Link>
        <Link to={`/whispers/${_id}`} className="whisper-container-detail">
          <img src={image_url} alt="whisper" />
          <h2>{title}</h2>
          <p>{whisper.substring(0, 150)}...</p>
        </Link>
      </div>
    </section>
  );
}

export default Whisper;
