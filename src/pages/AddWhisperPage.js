import React, {useState} from 'react';
import Form from '../components/form/Form';
import Input from '../components/input/Input';
import Button from '../components/button/Button';

import './css/AddWhisperPage.css';

function AddWhisperPage() {
  const [whisper, setWhisper] = useState({
    'title': '',
    'image-url': '',
    'whisper': ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setWhisper(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
    console.log(whisper)
  }

  return (
    <div className='auth' id='add-whisper'>
      <Form>
        <h1>Whisper To The World</h1>
        <Input type={'text'} text={'title'} value={whisper['title']} onChange={handleChange}/>
        <Input type={'text'} text={'image-url'} value={whisper['image-url']} onChange={handleChange} />
        <div>
          <label htmlFor='whisper'>Whisperings</label>
          <textarea  name={'whisper'} id='whisper' value={whisper.whisper} onChange={handleChange} >

          </textarea>
        </div>
        <Button type={'submit'} text={'Add Whispering'} />
      </Form>

    </div>
  )
}

export default {
  component: AddWhisperPage
}