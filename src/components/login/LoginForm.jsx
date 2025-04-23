import "../../components/init";
import { signInWithRedirect, getCurrentUser, signOut, fetchUserAttributes,signUp } from "aws-amplify/auth";
import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import facebook from '../../assets/icons/facebook.svg';
import google from '../../assets/icons/google.svg';
import support from '../../assets/icons/support.svg';
import { useState } from "react";
import SSOLoginForm from "./SSOLoginForm";
import SSOSignupForm from "./SSOSignupForm";

Amplify.configure(awsconfig);

const LoginForm = () => {
    const [showSignupForm, setShowSignupForm] = useState(true);

    function handleSignInClick(customState) {
        signInWithRedirect({
         provider: "Google",
         //customState: window.location.href
        });
    }

    return (
      <div className="card-body">
        <div className="p-2 mt-2">
          <form action="#" name="login" onSubmit={(e) => e.preventDefault()}>
            {showSignupForm && <SSOLoginForm setShowSignupForm={setShowSignupForm} />}
            {!showSignupForm && <SSOSignupForm setShowSignupForm={setShowSignupForm} />}
            <div className="mt-4 text-center">
              <div className="signin-other-title">
                <h5 className="fs-13 mb-4 title">Sign In with</h5>
              </div>
              <div className="">
                <button
                  className="btn btn-lg btn-block btn-primary mb-2 g-btn"
                  type="submit"
                  onClick={() => handleSignInClick()}
                >
                  <img
                    src={google}
                    alt="google"
                    height="18"
                  />{" "}
                  Sign in with google
                </button>
                <button
                  className="btn btn-lg btn-block btn-primary mb-2 f-btn"
                  type="submit"
                >
                  <img
                    src={facebook}
                    alt="facebook"
                    height="18"
                  />
                  Sign in with facebook
                </button>{" "}
              </div>
            </div>
            <div className="section-f">
              <span className="support">
                <img
                  src={support}
                  alt="support BrokerAiD"
                  height="18"
                />{" "}
                Support
              </span>
              <div className="right-reserved">
                © NSEIT Limited Product. All rights reserved.
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default LoginForm