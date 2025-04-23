import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

import LoginForm from '../components/login/LoginForm';

import logo from '../assets/icons/logo.svg';
import LoginFooter from '../components/login/LoginFooter';

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    (async() => {
      try {
        const user = await getCurrentUser();
        if(user && user.userId) {
            setIsAuthenticated(true);
            navigate('/chat');
        }
      } catch (error) {
        setIsAuthenticated(false);
      }      
    })();
  });

  useEffect(() => {
    document.body.classList.add('userlogin')
  }, [location]);

  const loginSection = () => {
     return <div className="userlogin">
      <div className="auth-page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-5"></div>
            <div className="col-md-6 col-lg-6 col-xl-5">
              <div className="text-center text-white-50 p-2 mt-4">
                <span className="logo-lg">
                  <img
                    src={logo}
                    alt="BrokerAiD"
                    style={{width: "373px", height: "193px", marginBottom: "0px"}}
                  />
                </span>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>

        <LoginFooter />
      </div>
    </div>;
  }

  return (!isAuthenticated && loginSection())
}

export default Login;