import React, {useState} from 'react'
import { SignUpUser } from '../functions/CognitoLogic';

function SignUp() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const SignUpSubmitHandler = (event) => {
        event.preventDefault();
        console.log(username, password)
        SignUpUser(username, password);
        setUsername('');
        setPassword('');
    }

    // how will the cognito password requirments be imposed?
    // 6 characters minimum, special characters etc.


    return (
    <div>
        <div>SignUp</div>
        <form onSubmit={SignUpSubmitHandler}>
            <input type="text" id="username" name="username" value={username}
                onChange={e => setUsername(e.target.value)}/>
            <input type="password" id="password" name="password" value={password}
                onChange={e => setPassword(e.target.value)}/>
            <button>Sign Up</button>
        </form>
    </div>
    )
}

export default SignUp