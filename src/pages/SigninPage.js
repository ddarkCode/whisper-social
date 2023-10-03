import React from 'react';

import Input from '../components/input/Input';
import Form from '../components/form/Form';
import Button from '../components/button/Button';
import AuthButton from '../components/button/AuthButton';

function SigninPage() {
  return (
   <div className='auth'>

    <Form>
      <h1>Sign In</h1>
      <Input text='email' />
      <Input text='password' />
      <Button type={'submit'} text='next' />
      <AuthButton spanText={'Don\'t Have An Account?'} buttonText={'Sign up'} href={'/signup'} />
    </Form>

   

   </div>
    

  )
}

export default {
  component: SigninPage
}