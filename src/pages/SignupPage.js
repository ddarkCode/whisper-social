import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Input from '../components/input/Input';
import Form from '../components/form/Form';
import Button from '../components/button/Button';
import AuthButton from '../components/button/AuthButton';

import { signup, update } from '../redux/auth/authReducer';

import './css/auth.css';

function SignupPage() {
  const auth = useSelector(state => state.auth);
  const [userInput, setUserInput] = useState({
    username: auth.user ? auth.user.username.slice(1) : '',
    firstname: auth.user ? auth.user.firstname : '',
    lastname: auth.user ? auth.user.lastname : '',
    location: auth.user ? auth.user.location : '',
    email: auth.user ? auth.user.email : '',
    password: auth.user ? auth.user.password : '',
    userId: auth.user ? auth.user._id : ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const dispatch = useDispatch()
  const history = useHistory()


  function handleSignupSubmit(e){
    e.preventDefault();
    try {
      dispatch(signup(userInput));
      history.push('/whispers')
      setUserInput({
        username: '',
        firstname: '',
        lastname: '',
        location: '',
        email: '',
        password: ''
      })
    } catch (err) {
      console.log(err)
    }
  }
  function handleUpdateSubmit(e){
    e.preventDefault();
    try {
      dispatch(update(userInput));
      history.push('/whisperer')
      setUserInput({
        username: '',
        firstname: '',
        lastname: '',
        location: '',
        email: '',
        password: ''
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='auth' id='signup'>
      <Form onSubmit={auth.user ? handleUpdateSubmit : handleSignupSubmit}>
        <h1>{auth.user ? 'Edit Profile': 'Sign Up'}</h1>
        <Input type={'text'} text='username' value={userInput.username} onChange={handleChange} />
        <Input type={'text'} text='firstname' value={userInput.firstname} onChange={handleChange} />
        <Input type={'text'} text='lastname' value={userInput.lastname} onChange={handleChange} />
        <Input type={'text'} text='location' value={userInput.location} onChange={handleChange} />
        <Input type={'text'} text='email' value={userInput.email} onChange={handleChange} />
        
        <Input type={'password'} text='password' value={userInput.password} placeholder={auth.user ? 'Leave Empty If You Do Not Wish To Change Your Password': ''} onChange={handleChange} />
        <Button type={'submit'} text='next' />
        <AuthButton spanText={'Already Have An Account?'} buttonText={'Sign in'} href={'/signin'} />
      </Form>
      
    </div>
  )
}

export default {
  component: SignupPage
}