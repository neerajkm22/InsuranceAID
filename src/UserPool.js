import {CognitoUserPool} from 'amazon-cognito-identity-js';

const PoolData={
    UserPoolId:"us-east-1_vvjKmtI2E",
    ClientId:"3m8i9mtjj2tklca7ev05euhjdv"
}

export default new CognitoUserPool(PoolData);