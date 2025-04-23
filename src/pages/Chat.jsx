import { useEffect, useContext } from 'react'
import { signInWithRedirect, getCurrentUser, signOut, fetchUserAttributes,fetchAuthSession, signIn } from "aws-amplify/auth";
import { AppContext } from '../stores/AppContext';
import LeftSection from '../components/chat/LeftSection'
import RightSection from '../components/chat/RightSection'
import PreLoader from '../components/chat/PreLoader';
import { saveLoginDetails,getInactiveUsers } from '../services/api';
import UserModal from '../components/chat/UserModal';
import { UserStatus } from "../utils/utils";
import { useNavigate } from 'react-router-dom';
import FAQModal from '../components/faq/FAQModal';
import TEMPModal from '../components/temp/TEMPModal';

const Chat = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;  
  const navigate = useNavigate();

 useEffect(() => {
    document.getElementById('body').classList.remove('userlogin');
    (async () => {
       try {
        dispatch({type: 'SET_SHOW_PRELOADER', payload: true});
        const userAttributes = await fetchUserAttributes();
         const session = await fetchAuthSession();   // Fetch the authentication session fetchAuthSession({forceRefresh:true}); 

        if(userAttributes) {
          const response=await saveLoginDetails(userAttributes.given_name,userAttributes.family_name,userAttributes.email,userAttributes.email,session.tokens.accessToken.toString(),"true"); //save Login details
          let userStatus=JSON.parse(response.body).active_status?UserStatus.Active:UserStatus.Inactive; 
          dispatch({type: 'SET_USER_STATUS',payload:userStatus});
          localStorage.setItem('USER_STATUS', userStatus);

          if(userStatus!=UserStatus.Active){
            await signOut({global:true});
            navigate('/logout');
          }
          else{
            dispatch({type: 'SET_USERNAME', payload: `${userAttributes.given_name} ${userAttributes.family_name}`});
            dispatch({type: 'SET_USER_EMAIL', payload: userAttributes.email});
            dispatch({type: 'SET_USER_FIRST_NAME', payload: userAttributes.given_name});
            dispatch({type: 'SET_SHOW_PRELOADER', payload: false});
            dispatch({type: 'SET_USERID', payload: userAttributes.email });//userAttributes.identities ? JSON.parse(userAttributes.identities)[0].userId : ''
            dispatch({type: 'SET_SESSION_TOKEN_ID', payload: session.tokens.accessToken.toString()});

            dispatch({type: 'SET_ROLE_ID', payload: JSON.parse(response.body).role_id});
            dispatch({type: 'SET_ROLE_NAME', payload: JSON.parse(response.body).role_name});

            const inactiveresp=await getInactiveUsers(session.tokens.accessToken.toString());
            dispatch({type: 'SET_INACTIVE_USER_COUNT', payload: inactiveresp.length});
          }
        }
       } catch (error) {
        dispatch({type: 'SET_SHOW_PRELOADER', payload: false});
       }       
    })()
  },[])

  return (
    <>
      {!state.showPreLoader && <div id="layout-wrapper">
        <LeftSection />
        <UserModal />
        <FAQModal />
        <TEMPModal />
      </div>}
      {!state.showPreLoader && <RightSection />}
      {state.showPreLoader && <PreLoader />}
    </>
  )
}

export default Chat