import React from 'react';

import Input from '../components/input/Input';
import Form from '../components/form/Form';
import Button from '../components/button/Button';
import AuthButton from '../components/button/AuthButton';

import './css/auth.css';

function SignupPage() {
  return (
    <div className='auth' id='signup'>
      <Form>
        <h1>Sign up</h1>
        <Input text='username'/>
        <Input text='email' />
        <Input text='password' />
        <Button type={'submit'} text='next' />
        <AuthButton spanText={'Already Have An Account?'} buttonText={'Sign in'} href={'/signin'} />
      </Form>
      
    </div>
  )
}

export default {
  component: SignupPage
}