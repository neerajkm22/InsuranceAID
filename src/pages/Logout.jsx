import React,{useEffect} from 'react';
import LogoutMessage from '../components/logout/LogoutMessage';
import LogoutFooter from '../components/logout/LogoutFooter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationMessages, UserStatus } from "../utils/utils";


const Logout = () => {
 useEffect(() => {
  if(localStorage.getItem('USER_STATUS')==UserStatus.Inactive){
  toast.error(ApplicationMessages.InactiveUserLoginMessage, { autoClose: 60000 });
 // localStorage.removeItem('USER_STATUS');
  }
  else{
    localStorage.removeItem('USER_STATUS');
  }
 });

  return (
    <div className="auth-page-wrapper pt-5">
        <LogoutMessage />    
        <LogoutFooter />        
    </div>
  )
}

export default Logout