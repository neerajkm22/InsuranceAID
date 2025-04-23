import axios from "axios";

const ENV_MODE  = import.meta.env.MODE;
const API_URL = ENV_MODE !== 'development' ? `${import.meta.env.VITE_CHAT_API_BASE_URL}/api/v1/llm/rag` : '/api/v1/llm/rag';
const SIGNIN_URL = ENV_MODE !== 'development' ? import.meta.env.VITE_USER_SIGNUP : '/user_signup';
const SIGNOUT_URL = ENV_MODE !== 'development' ? import.meta.env.VITE_USER_LOGOUT : '/loggout_api';
const CHAT_HISTORY_UPDATE_API_URL = import.meta.env.VITE_CHAT_HISTORY_UPDATE_API_URL;
const VITE_REACTION_API = import.meta.env.VITE_REACTION_API;
const TOPIC_HISTORY_API = ENV_MODE !== 'development' ?  import.meta.env.VITE_FETCH_TOPIC_HISTORY_API : '/user';
const INACTIVE_USERS_API = ENV_MODE !== 'development' ?  import.meta.env.VITE_INACTIVE_USER : '/inactive';
const VITE_USERS_API= import.meta.env.VITE_USERS_API;
//const UPDATE_STATUS_USERS_API = import.meta.env.VITE_UPDATE_STATUS_USER; 
const VITE_USER_ROLES_MASTER = import.meta.env.VITE_USER_ROLES_MASTER;
const VITE_UPDATE_USER_DATA = import.meta.env.VITE_UPDATE_USER_DATA;

export const getChatData = async (inputs, verbose, session_id, user_id,email) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'post',
            url: API_URL,
            data: {inputs, verbose, session_id, user_id,email}
        });
        
        return response.data ? response.data : {}      
    } catch (error) {
        console.error(error);
    }

    return {}
}

export const updateChatHistory = async (requestData) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'post',
            url: CHAT_HISTORY_UPDATE_API_URL,
            data: requestData
        });
        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}
export const updateReaction = async (requestData) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'post',
            url: VITE_REACTION_API,
            data: requestData
        });

        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}

export const saveLoginDetails = async(firstname,lastname,email,userid,sessiontoken_id,Isloggedin) => { 
    try {  
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*"
            },
            method: 'post',
            url: SIGNIN_URL,
            data: {firstname,lastname,email,userid,sessiontoken_id,Isloggedin}
        });
        return response.data ? response.data : {}

    } catch (error) {
        console.log(error);
    }

    return {}
}

export const setLogout = async(email,userid) => { 
    try {        
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*"
            },
            method: 'post',
            url: SIGNOUT_URL,
            data: {email,userid}
        });
        return response.data ? response.data : {}

    } catch (error) {
        console.error(error);
    }

    return {}
}

export const getTopicHistory = async (userid) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'get',
            url:TOPIC_HISTORY_API,
            params: {userid}
        });
        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}

export const getInactiveUsers = async (authorization_token) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":authorization_token
            },
            method: 'get',
            url:INACTIVE_USERS_API
        });
        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}


export const getAllUsers = async (authorization_token) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":authorization_token
            },
            method: 'get',
            url:VITE_USERS_API
        });
        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}

// export const updateUserStatus = async(userid,active_status,role_id) => { 
//     try { 
//         let dataParam;
//         if(role_id==null){
//             dataParam={userid,active_status};
//         } 
//         else{
//             dataParam={userid,active_status,role_id};
//         }
//         const response = await axios({
//             headers: {
//                 "accept": "application/json",
//                 "Content-Type": "application/json",
//                 // "Access-Control-Allow-Origin": "*"
//             },
//             method: 'put',
//             url: UPDATE_STATUS_USERS_API,//"https://sygbf78uph.execute-api.ap-south-1.amazonaws.com/prod/user",/"
//             data: dataParam
//         });
//         return response.data ? response.data : {}

//     } catch (error) {
//         console.log(error);
//     }

//     return {}
// }

export const getUserRolesMaster = async (authorization_token) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":authorization_token
            },
            method: 'get',
            url:VITE_USER_ROLES_MASTER
        });
        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}

export const updateUserData = async (userId, status, roleId, authorization_token) => {
    try {
        
        let dataParam;
        if(roleId==null){
            dataParam={userid: userId, active_status: status};
        } 
        else{
            dataParam={userid: userId, active_status: status, role_id: roleId};
        }
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":authorization_token
            },
            method: 'put',
            url:VITE_UPDATE_USER_DATA,
            data: dataParam
        });
        //return response.data ? response.data : {}
        return response;
    } catch (error) {
        console.error(error);
    }

    return {}
}