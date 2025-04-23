import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../stores/AppContext";
import { updateUserData, getInactiveUsers } from "../../services/api";
import {message,Popconfirm } from "antd";
import { ApplicationMessages,formatString } from "../../utils/utils";

const UserEditForm = ({ data, closeRow, rolesMaster }) => {
    const context = useContext(AppContext);
    const { state, dispatch } = context;
    const [roles, setRoles] = useState([]);
    const [status, setStatus] = useState([
        {id: 'true', name: 'Active'},
        {id: 'false', name: 'InActive'}
    ]);

    const [userRole, setUserRole] = useState(data.role_id ? data.role_id : '');
    const [userStatus, setUserStatus] = useState(data.status_id ? 'true' : 'false');
    const [isLoading, setIsLoading] = useState(false);
    const [selectRoleError, setSelectRoleError] = useState(false);

    useEffect(() => {
        setRoles(rolesMaster);
    }, []);

    const updateUser = async () => {
        setSelectRoleError(false);
        // call API
        try {
            setIsLoading(true);
            if(userRole) {
                const response = await updateUserData(data.userid, (userStatus === "true") ? true : false, userRole, state.sessionTokenId);  
               if(response.status=200){
                const inactiveresp=await getInactiveUsers(state.sessionTokenId);
                dispatch({type: 'SET_INACTIVE_USER_COUNT', payload: inactiveresp.length});
                handleClose(response.data);
                setIsLoading(false);
                
                message.success(ApplicationMessages.UserDataUpdateMessage);
               }
               else{
                message.error(ApplicationMessages.ErrorMsg);
               }
                
            } else {
                setSelectRoleError(true);
                message.error(ApplicationMessages.RoleRequiredErrorMsg);
                setIsLoading(false);
            }
            
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    const resetUser = () => {
        // restore old data
        setUserRole(data.role_id ? data.role_id : '');
        setUserStatus(data.status_id ? data.status_id : false);
    }

    const handleClose = (response) => { 
        try {
            closeRow(data.srno, response);
        } catch (error) {
            console.error(error);
        }
    };

    const confirm =  (e) => {
        updateUser();
    };
    const confirmReset =  (e) => {
        setSelectRoleError(false);
        resetUser();
        message.success(ApplicationMessages.UserResetUpdateMessage);
    };

    
    return <div className="row" style={{marginTop: "20px", marginBottom: "20px"}}>
            <div className="col" style={{textAlign: "center"}}>
                <label className="form-label">{data.name}</label>
            </div>
            <div className="col" style={{textAlign: "center"}}>
                <label className="form-label">Roles</label>
            </div>
            <div className="col" style={{textAlign: "center"}}>
                <select className={selectRoleError ? "form-select is-invalid" : "form-select"} aria-label="Default select example" value={userRole} onChange={(e) => {
                    setSelectRoleError(false);
                    setUserRole(e.target.value)
                }}>
                    {roles.map(role => {
                        return <option  key={role.id} value={role.id}>{role.name}</option>
                    })}
                </select>
                <div style={{display: selectRoleError ? 'block' : 'none'}} className="invalid-feedback">
                    Please select role.
                </div>
            </div>
            <div className="col" style={{textAlign: "center"}}>
                <label className="form-label">Status</label>
            </div>
            <div className="col" style={{textAlign: "center"}}>
                <select className="form-select" aria-label="Default select example" value={userStatus} onChange={(e) => {
                    setUserStatus(e.target.value)
                }}>
                    {status.map(stat => {
                        return <option key={stat.id} value={stat.id}>{stat.name}</option>
                    })}
                </select>
            </div>
            <div className="col" style={{textAlign: "center"}}>
            <Popconfirm
            title={ApplicationMessages.UserDataUpdateTitle}
            description={formatString(ApplicationMessages.UserDataUpdateDescription, 'update', 'data')}
            onConfirm={confirm}
            okText="Yes"
            cancelText="Cancel">
                <button disabled={isLoading ? "disabled" : ""} type="submit" className="btn btn-primary">Submit</button>
            </Popconfirm>
            </div>
            <div className="col" style={{textAlign: "center"}}>
            <Popconfirm
            title={ApplicationMessages.UserDataUpdateTitle}
            description={formatString(ApplicationMessages.UserDataUpdateDescription, 'reset', 'data')}
            onConfirm={confirmReset}
            okText="Yes"
            cancelText="Cancel">
                <button disabled={isLoading ? "disabled" : ""} type="submit" className="btn btn-danger">Reset</button>
            </Popconfirm>
            </div>
        </div>;

}

export default UserEditForm