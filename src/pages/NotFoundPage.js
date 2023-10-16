import React from 'react';
import { Link } from 'react-router-dom';

import './css/NotFoundPage.css';

function NotFoundPage({ staticContext = {} }) {
  staticContext.notFound = true;
  return (
    <div className="notfound-page-container">
      <div className="notfound-page-image-container">
        <img src="https://media.istockphoto.com/id/1456566772/photo/page-not-found-404-design-404-error-web-page-concept-on-a-computer-screen-3d-illustration.webp?b=1&s=170667a&w=0&k=20&c=w__eFEK9WtdPvxVzxWJb1bJpgTqyA-T7OgPhk8KNnng=" />
      </div>
      <p>
        You didn't break the internet, but we can't find what you are looking
        for.
      </p>
      <Link to="/">Head Back Home</Link>
    </div>
  );
}

export default NotFoundPage;
