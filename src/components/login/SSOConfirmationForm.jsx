import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, confirmSignUp } from "aws-amplify/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SSOConfirmationForm = ({userName, password}) => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [diasbleButton, setDiasbleButton] = useState(false);

    const verifyCode = async () => {
        setDiasbleButton(true);
        
        if(!code) {
            toast.error('Please enter code.', { autoClose: false });
            setDiasbleButton(false);
            return false;
        }

        if(code && userName) {
            try {
                const response = await confirmSignUp({
                    username: userName,
                    confirmationCode: code
                });

                const res = await signIn({username: userName, password: password});
                navigate('/chat');     
            } catch (error) {
                console.error(error);
                toast.error(error.message, { autoClose: false });
                setDiasbleButton(false);
            }
        }
    }

    return <>
        <div className="mb-3">
            <label className="form-label">
                Verify Code
            </label>
            <input
                type="text"
                className="form-control"
                id="code"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </div>
        <div className="mt-4">
            <button disabled={diasbleButton ? "disabled" : ""} className="btn btn-success w-100" type="submit" onClick={() => verifyCode()}>
                Submit
            </button>
        </div>
    </>
}

export default SSOConfirmationForm;