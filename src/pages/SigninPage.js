import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Input from '../components/input/Input';
import Form from '../components/form/Form';
import Button from '../components/button/Button';
import AuthButton from '../components/button/AuthButton';
import { signin } from '../redux/auth/authReducer';

function SigninPage() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  })
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    try {
      dispatch(signin(userInput));
      history.push('/whisperer');
      setUserInput({
      email: '',
      password: ''
    })
    } catch (err) {
      console.log(err)
    }

  }
  return (
   <div className='auth'>

    <Form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <Input type={'text'} text='email' value={userInput.email} onChange={handleChange} />
      <Input type={'password'} text='password' value={userInput.password} onChange={handleChange}  />
      <Button type={'submit'} text='next' />
      <AuthButton spanText={'Don\'t Have An Account?'} buttonText={'Sign up'} href={'/signup'} />
    </Form>

   

   </div>
    

  )
}

export default {
  component: SigninPage
}