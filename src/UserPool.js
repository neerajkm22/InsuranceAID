import {CognitoUserPool} from 'amazon-cognito-identity-js';

const PoolData={
    UserPoolId:"us-east-1_ZYILwn8Aq",
    ClientId:"5i5ful90a2tdb6uh4lqgum8tnj"
}

export default new CognitoUserPool(PoolData);