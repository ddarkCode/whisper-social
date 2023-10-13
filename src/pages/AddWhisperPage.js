import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getWhisper, postAWhisper, updateWhisper } from '../redux/whisper/whispersSlice';

import Form from '../components/form/Form';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import TextArea from '../components/textarea/TextArea';

import withAuthStatus from '../components/hoc/withAuthStatus';

import './css/AddWhisperPage.css';

function AddWhisperPage() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.whisperId) {
      dispatch(getWhisper(params.whisperId))
    }
  }, [])
 
  const stateWhisper = useSelector(state => state.whispers.whisper)


  const [whisper, setWhisper] = useState({
    'title': stateWhisper.title || '',
    'image_url': stateWhisper.image_url || '',
    'whisper': stateWhisper.whisper || '',
    'whispererId': auth.user && auth.user._id
  })


  const handleChange = (e) => {
    const {name, value} = e.target;
    setWhisper(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (params.whisperId) {
      whisper.whisperId = params.whisperId
      dispatch(updateWhisper({whisperId: params.whisperId, updateData: whisper}))
    } else {
      dispatch(postAWhisper(whisper))
    }
  }

  return (
    <div className='auth' id='add-whisper'>
      <Form onSubmit={handleSubmit}>
        <h1>Whisper To The World</h1>
        <Input type={'text'} text={'title'} value={whisper.title} onChange={handleChange}/>
        <Input type={'text'} text={'image_url'} value={whisper.image_url} onChange={handleChange} />
        <TextArea title={'Whisperings'} name={'whisper'} value={whisper.whisper} onChange={handleChange} />
        <Button type={'submit'} text={'Add Whispering'} />
      </Form>

    </div>
  )
}

export default {
  component: withAuthStatus(AddWhisperPage),
  loadData: (store, whisperId) => store.dispatch(getWhisper(whisperId))
}