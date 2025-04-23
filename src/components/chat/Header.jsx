import { useContext, useEffect } from "react";
import { signOut } from "aws-amplify/auth";
import ThreeDotsIcon from '../../assets/icons/threedots.png'
import { AppContext } from '../../stores/AppContext'
import { getFirstLetterCaps,UserRoles } from "../../utils/utils";
import {toggleLeftMenu, checkViewPort} from '../../assets/app.js';
import { setLogout } from '../../services/api';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const context = useContext(AppContext);

    const { state } = context;

    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        try {
            await setLogout(state.userEmail,state.userId);
            sessionStorage.removeItem('chatHistory');
            sessionStorage.removeItem('chatReactionHistory');
            await signOut({global:true});
            navigate('/logout');    
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        document.getElementById("topnav-hamburger-icon")?.addEventListener("click", toggleLeftMenu);
        //window.addEventListener('load', function() {
        //    checkViewPort();
        //});
        window.onload = checkViewPort();
        window.addEventListener('resize', function() {
            checkViewPort();
        });
    },[])


    return (
        <header id="page-topbar" className="">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">														
                        <button type="button" className="btn btn-sm px-3 fs-16 header-item topnav-hamburger" id="topnav-hamburger-icon" >
                            <span className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>                
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="dropdown ms-sm-3 header-item topbar-user">
                            <div>
                                <b>Role: </b> {state.roleName ? state.roleName :"Role not assigned."} 
                            </div>
                            <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    {state.roleName === UserRoles.ADMIN && (
                                        <div className="red-circle">
                                            {state.inactiveUserCount}
                                        </div>
                                    )}
                                    <div className="userinfo">{getFirstLetterCaps(state.userFirstName)}</div>
                                    <img className="rounded-circle header-profile-user" src={ThreeDotsIcon} />
                                </span>									
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* <!-- item--> */}
                                <h6 className="dropdown-header">Welcome {`${state.userFirstName}!`}</h6>
                                {/* Conditional Rendering of 'Users' Item */}
                                {state.roleName === UserRoles.ADMIN && (
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#userModal">
                                        <i className="mdi mdi-users text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle">Users</span>
                                        <span className="inactive-user-count">{state.inactiveUserCount}</span>
                                        </a>
                                    )}
                                {state.roleName === UserRoles.ADMIN && <a className="dropdown-item" href="#"  data-bs-toggle="modal" data-bs-target="#faqModal"><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Manage FAQ</span></a>
                                                             
                                }   
                                <a className="dropdown-item" href="#" onClick={(e) => logout(e)}><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Logout</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
  )
}

export default Header