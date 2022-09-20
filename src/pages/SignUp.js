import React, {useState} from 'react'
import { SignUpUser } from '../functions/CognitoLogic';
import styled from 'styled-components';

import { CustomForm, CustomButton, CustomTextInput, PageContainer} from '../component/StyleComponents';


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

function SignUp() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const SignUpSubmitHandler = (event) => {
        event.preventDefault();
        //console.log(username, password)
        SignUpUser(username, password);
        setUsername('');
        setPassword('');
    }

    // how will the cognito password requirments be imposed?
    // 6 characters minimum, special characters etc.

    // add field labels + spacing

    return (
    <PageContainer>
        <h2>Create an Account</h2>
        <SignUpCustomForm onSubmit={SignUpSubmitHandler}>
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
          <CustomButton type="submit">Sign Up</CustomButton>
        </SignUpCustomForm>
        
    </PageContainer>
    )
}

export default SignUp