import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getWhisper,
  postAWhisper,
  updateWhisper,
} from '../redux/whisper/whispersSlice';

import Form from '../components/form/Form';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import TextArea from '../components/textarea/TextArea';

import withAuthStatus from '../components/hoc/withAuthStatus';

import './css/AddWhisperPage.css';

function AddWhisperPage() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  let stateWhisper;

  if (params.whisperId) {
    stateWhisper = useSelector((state) => state.whispers.whisper);
  }

  const [whisper, setWhisper] = useState({
    title:
      stateWhisper && auth.user._id === stateWhisper.whispererId
        ? stateWhisper.title
        : '',
    image_url:
      stateWhisper && auth.user._id === stateWhisper.whispererId
        ? stateWhisper.image_url
        : '',
    whisper:
      stateWhisper && auth.user._id === stateWhisper.whispererId
        ? stateWhisper.whisper
        : '',
    whispererId: auth.user && auth.user._id,
  });

  const [isSubmited, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (params.whisperId) {
      dispatch(getWhisper(params.whisperId));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWhisper((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (params.whisperId) {
      whisper.whisperId = params.whisperId;
      dispatch(
        updateWhisper({ whisperId: params.whisperId, updateData: whisper })
      );
      setIsSubmitted(!isSubmited);
      setWhisper({
        title: '',
        image_url: '',
        whisper: '',
      });
      history.push(`/whispers/${params.whisperId}`);
    } else {
      dispatch(postAWhisper(whisper));
      setIsSubmitted(!isSubmited);
      setWhisper({
        title: '',
        image_url: '',
        whisper: '',
      });
      history.push('/whispers');
    }
  }

  return (
    <div className="auth" id="add-whisper">
      <Form onSubmit={handleSubmit}>
        <h1>Whisper To The World</h1>
        <Input
          type={'text'}
          text={'title'}
          value={whisper.title}
          onChange={handleChange}
        />
        <Input
          type={'text'}
          text={'image_url'}
          value={whisper.image_url}
          onChange={handleChange}
        />
        <TextArea
          title={'Whisperings'}
          name={'whisper'}
          value={whisper.whisper}
          onChange={handleChange}
        />
        <Button disable={isSubmited} type={'submit'} text={'Add Whispering'} />
      </Form>
    </div>
  );
}

export default {
  component: withAuthStatus(AddWhisperPage),
  loadData: (store, whisperId) => store.dispatch(getWhisper(whisperId)),
};
