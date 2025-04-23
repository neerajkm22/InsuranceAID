import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateLogin } from "../../services/cognitoAuthenticate";
import { validateEmail } from "../../utils/utils";
import { signIn } from "aws-amplify/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SSOLoginForm = ({setShowSignupForm}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [diasbleButton, setDiasbleButton] = useState(false);

    const login = async () => {
         setDiasbleButton(true);
         if(!validateEmail(email)) {
            toast.error('Please enter a valid email.', { autoClose: false });
            setDiasbleButton(false);
            return false;
         }

         if(!password) {
            toast.error('Please enter password.', { autoClose: false });
            setDiasbleButton(false);
            return false;
         }

        if(email && password && validateEmail(email)) {
            try {
                const res = await signIn({username: email, password: password});
                if(res && res.isSignedIn) {
                    navigate('/chat');  
                } else {
                    setDiasbleButton(false);
                    toast.error('Something went wrong.', { autoClose: false });
                }             
            } 
            catch (error) {
                console.error(error)
                toast.error(error.message, { autoClose: false });
                setDiasbleButton(false);
            }
        }
    }

  return <>
        <div className="mb-3">
            <label className="form-label">
                Email
            </label>
            <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label className="form-label" >
                Password
            </label>
            <div className="position-relative auth-pass-inputgroup mb-3">
                <input
                    type="password"
                    className="form-control pe-5 password-input"
                    placeholder="Enter password"
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                    type="button"
                    id="password-addon"
                >
                    <i className="ri-eye-fill align-middle"></i>
                </button>
            </div>
        </div>

        <div className="form-check">
            <div className="float-strt">
                <a href="#" className="text-muted">
                Forgot password?
                </a>
            </div>
            <div className="float-end">
                <a href="#" className="text-muted" onClick={(e) => {
                    e.preventDefault();
                    console.log("Sho")
                    setShowSignupForm(false);
                }}>
                Signup?
                </a>
            </div>
        </div>

        <div className="form-check">
            
        </div>

        <div className="mt-4">
            <button disabled={diasbleButton ? "disabled" : ""} className="btn btn-success w-100" type="submit" onClick={()=>login()}>
                Sign In
            </button>
        </div>
    </>
}

export default SSOLoginForm