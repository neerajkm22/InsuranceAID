import { useState } from "react";
import SSOConfirmationForm from "./SSOConfirmationForm";
import { signUp } from "aws-amplify/auth";
import { validateEmail } from "../../utils/utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SSOSignupForm = ({setShowSignupForm}) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showConfirmationForm, setShowConfirmationForm] = useState(false);
    const [diasbleButton, setDiasbleButton] = useState(false);

    const register = async () => {
        setDiasbleButton(true);
        if(!validateEmail(email)) {
            toast.error('Please enter a valid email.', { autoClose: false });
            setDiasbleButton(false);
            return false;
        }

        if(!userName) {
            toast.error('Please enter username.', { autoClose: false });
            setDiasbleButton(false);
            return false;
        }

        if(!password) {
            toast.error('Please enter password.', { autoClose: false });
            setDiasbleButton(false);
            return false;
        }

        try {
            if(userName, password, email) {
                const response = await signUp({
                    username: email,
                    password,
                    options: {
                        userAttributes: {
                            email,
                            "given_name": userName,
                            "family_name": ""
                        }
                    }
                })

                console.log(response);
                setDiasbleButton(false);
                setShowConfirmationForm(true);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message, { autoClose: false });
            setDiasbleButton(false);
        }
    }

    return <>
        {!showConfirmationForm && (<><div className="mb-3">
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
            <label className="form-label">
                Username
            </label>
            <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                    setShowSignupForm(true);
                }}>
                Signin?
                </a>
            </div>
        </div>

        <div className="form-check">
            
        </div>

        <div className="mt-4">
            <button disabled={diasbleButton ? "disabled" : ""} className="btn btn-success w-100" type="submit" onClick={() => register()}>
                Sign Up
            </button>
        </div></>)}
        {showConfirmationForm && <SSOConfirmationForm userName={email} password={password} /> }
    </>
}

export default SSOSignupForm