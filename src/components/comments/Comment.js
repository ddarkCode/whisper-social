import React from 'react';

import Form from '../form/Form';
import TextArea from '../textarea/TextArea';
import Button from '../button/Button';
import DisplayComment from './DisplayComment';

import './Comment.css';

function Comment({
  comments,
  comment,
  onSubmit,
  onChange,
  display,
  setDisplay,
}) {
  return (
    <div
      className="comments-main"
      style={{ display: display ? 'block' : 'none' }}
    >
      <Form onSubmit={onSubmit}>
        <div>
          <h1>Leave A Comment</h1>
          <svg
            onClick={() => setDisplay(!display)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="3em"
            height="3em"
            fill="#000"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </div>
        <div className="comment-inputs">
          <TextArea
            name={'comment'}
            display={display}
            value={comment}
            onChange={onChange}
            placeholder={'What Are Your Thoughts?'}
          />
          <Button type={'submit'} text={'post'} />
        </div>
      </Form>

      <div className="comments-container">
        {comments.length === 0 ? (
          <h1>Be The First To Leave A Comment</h1>
        ) : (
          comments.map((comment) => (
            <DisplayComment key={comment._id} {...comment} />
          ))
        )}
      </div>
    </div>
  );
}

export default Comment;
