import { Link } from "react-router-dom";
import logo from '../../assets/icons/logo.svg';
import NewChatButton from "./NewChatButton";

const Logo = () => {
  return (
    <div className="navbar-brand-box vertical-logo">								
        <Link to="/" className="logo">
          <span className="logo-lg">
            <img src={logo} alt="BrokerAiD" height="64" style={{width: "202px", height: "118px"}} />
          </span>	
        </Link> 							
        <NewChatButton />       
    </div>
  )
}

export default Logo