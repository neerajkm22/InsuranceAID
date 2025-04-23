import { AuthenticationDetails, CognitoUser,
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken,
    CognitoUserSession,
 } from 'amazon-cognito-identity-js';
 import UserPool from '../UserPool';

export const authenticateLogin=(Email, Password)=>{

return new Promise((resolve, reject)=>{ 
    const user=new CognitoUser({ Username: Email,
    Pool: UserPool
    });

    const authDetails= new AuthenticationDetails({
    Username: Email,
    Password
    });

    user.authenticateUser(authDetails,{
    onSuccess: (result)=>{
    console.log("login successful");

    const cognitoUser1 = UserPool.getCurrentUser();
    console.log(cognitoUser1);

    if (cognitoUser1 != null) {
        cognitoUser1.getSession((err, session) => {
          if (err) {
            console.log("session error",err);
            return;
          }
          else if (session.isValid()) {
            console.log("Session",session);
            // access your session
        }
        });

        cognitoUser1.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err)
              return
            }
            const userData = attributes.reduce((acc, attribute) => {
              acc[attribute.Name] = attribute.Value;
              console.log('attributes: ',attribute.Name,attribute.Value)
              return acc
            }, {})
    
            resolve({ ...userData, username: cognitoUser.username })
          })
      } else {
        console.log('User is not signed in.');
      }

    cognitoUser1.getSession((err, session) => {
        if (session.isValid()) {
            console.log("session",session);
            // access your session
        }
        else{
            console.log("session error",err);
        }
        // throw error
    });

    resolve(result);
    },
    onFailure: (err)=>{
    console.log("login failed", err); 
    reject(err);
    }
    });

});

};

export const logout = () => {
const cognitoUser = UserPool.getCurrentUser(); 
  if (cognitoUser) {
    cognitoUser.signOut();
    window.location.href = '/Logout';
  }
};


export const signUpCognitoUser=(username,password,emailId)=> {
   
    // UserPool.signUp('poojag1@gmail.com','Password1!', [
    //   new CognitoUserAttribute({
    //     Name: 'email',
    //     Value: 'poojag@gmail.com'
    //   }),
    //   new CognitoUserAttribute({
    //     Name: 'name',
    //     Value: 'Pooja'
    //   })
    // ],null,(err,data)=>{
    //   if(err){
    //     console.error(err);
    //     alert("Couldn't Signup");
    //   }
    //   else{
    //   alert("Signup Sucessfully")
    //  console.log(data);
    //   navigate('/chat');
    //   }
    // })

    return new Promise((resolve, reject) => {
        UserPool.signUp(
            username,// 'pooja1',
          password,//'Password123',
          [{ Name: "email", Value:emailId }],
          null,
          (err, result) => {
            if (err) {
              reject(err);
              alert("Couldn't Signup");
              return;
            }
            alert("Signup Sucessfully");
            resolve(result.user);
          }
        )
      })
}

export const confirmSignUp=(username, code)=> {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: UserPool,
      })
  
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }