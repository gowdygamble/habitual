import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { CustomForm, CustomButton, CustomTextInput, PageContainer} from '../component/StyleComponents';
import { LoginUser, logout } from '../functions/CognitoLogic';

const SignUpCustomForm = styled(CustomForm)`
* {
  margin: 5px;
}
`

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const LoginSubmitHandler = (event) => {
      event.preventDefault();
      
      LoginUser(username, password)
      
      navigate("/today");

      setUsername('');
      setPassword('');
  }

  const LogoutHandler = (event) => {
    event.preventDefault()
    logout();
  }


  return (
    <PageContainer>
        <h2>Login</h2>

        <SignUpCustomForm onSubmit={LoginSubmitHandler}>
          <FormFieldContainer>
            <h3>Username</h3>
            <CustomTextInput type="text" id="username" name="username" value={username}
                  onChange={e => setUsername(e.target.value)}/>
          </FormFieldContainer>
          <FormFieldContainer>
            <h3>Password</h3>
            <CustomTextInput type="password" id="password" name="password" value={password}
                  onChange={e => setPassword(e.target.value)} />
          </FormFieldContainer>
          <CustomButton>Login</CustomButton>
        </SignUpCustomForm>
        <CustomButton onClick={LogoutHandler}>Logout</CustomButton>
        </PageContainer>
  )
}

export default Login