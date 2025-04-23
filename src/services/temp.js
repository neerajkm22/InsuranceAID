import axios from "axios";

const ENV_MODE  = import.meta.env.MODE;

const VITE_GET_TEMP_DATA = import.meta.env.VITE_GET_TEMP_DATA;
const VITE_UPLOAD_TEMP = import.meta.env.VITE_UPLOAD_TEMP;

export const getTEMP = async (userid, authorization_token) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":authorization_token
            },
            method: 'get',
            url:VITE_GET_TEMP_DATA,
            params: {userid}
        });
        
        return response.data.files ? response.data.files : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}

export const uploadTEMP = async (formData, authorization_token) => {
    try {
        const response = await axios({
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization":authorization_token
            },
            method: 'post',
            url: VITE_UPLOAD_TEMP,
            data: formData
        });
        
        return response.data ? response.data : {}      
    } catch (error) {
        console.error('Error uploading TEMP:', error);
    }

    return {}
}