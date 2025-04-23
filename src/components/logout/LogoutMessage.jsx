import { Link } from "react-router-dom";
import logo from '../../assets/icons/logo.svg';

const LogoutMessage = () => {
  return (
    <div className="auth-page-content">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center mt-sm-5  text-white-50">
                        <div>	
                           <Link to="/" className="d-inline-block auth-logo">
                                <img src={logo} alt="logo" style={{width:'auto', height:'164px'}} />
                           </Link>                        
                        </div>
                        {/* <p className="mt-3 fs-15 fw-medium">BrokerAiD User Logout</p> */}
                    </div>
                </div>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="card mt-4">
                        <div className="card-body p-4 text-center">                       

                            <div className="mt-4 pt-2">
                                <h5>You are Logged Out</h5>
                                <p className="text-muted">Thank you for using <span className="fw-semibold">brokerAiD</span> chat</p>
                                <div className="mt-4">
                                    <Link to="/" className="btn btn-success w-100">Sign In</Link>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>                
            </div>            
        </div>        
    </div>  
  )
}

export default LogoutMessage