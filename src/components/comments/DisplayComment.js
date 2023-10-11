import React from "react";
import { Link } from "react-router-dom";

import { formatDate } from "../../utils/utils";
import DefaultImage from "../images/DefaultImage";

function DisplayComment({
  image_url,
  username,
  comment,
  commentStatus,
  createdAt,
  commentById,
}) {
  return (
    <div className="display-comment-container">
      <div className="display-comment-info">
        <div className="display-comment-img-container">
          { image_url ? <img src={image_url}/> : <DefaultImage letter={username.slice(1, 2)} /> }
        </div>
        <Link to={``}>{username}</Link>
      </div>
      <span id="display-comment-date">{formatDate(createdAt)}</span>
      <div className="display-comment-comment">{comment}</div>
    </div>
  );
}

export default DisplayComment;
