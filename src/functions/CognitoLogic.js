import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js';

const POOL_DATA = {
    UserPoolId: 'us-west-1_gmOHe0HWR',
	ClientId: '62jg669ceo17n1dan9e7propqc', 
}

const userPool = new CognitoUserPool(POOL_DATA);

export const GetAuthenticatedUser = () => {
    // should do error check here
    return userPool.getCurrentUser()
}

export const logout = () => {
    GetAuthenticatedUser().signOut();
    console.log("logged out")
}    

export const SignUpUser = (username, password) => {
    const attributeList = [];
    userPool.signUp(username, password, attributeList, null, function(
        err,
        result
    ) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

export const LoginUser = (username, password, dispatchHandler) => {
    var authenticationData = {
        Username: username,
        Password: password,
    };
    var authenticationDetails = new AuthenticationDetails(
        authenticationData
    );

    var userData = {
        Username: username,
        Pool: userPool,
    };

    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
            console.log(result)
            dispatchHandler();
        },
        onFailure(err) {
            console.log(err)
        }
    })

};