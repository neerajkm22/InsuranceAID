import axios from "axios";

const ENV_MODE  = import.meta.env.MODE;

const VITE_GET_FAQ_DATA = import.meta.env.VITE_GET_FAQ_DATA;
const VITE_UPLOAD_FAQ = import.meta.env.VITE_UPLOAD_FAQ;

export const getFAQ = async (authorization_token) => {
    try {
        const response = await axios({
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":authorization_token
            },
            method: 'get',
            url:VITE_GET_FAQ_DATA
        });
        return response.data ? response.data : {}
    } catch (error) {
        console.error(error);
    }

    return {}
}

export const uploadFAQ = async (formData, authorization_token) => {
    try {
        const response = await axios({
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization":authorization_token
            },
            method: 'post',
            url: VITE_UPLOAD_FAQ,
            data: formData
        });
        
        return response.data ? response.data : {}      
    } catch (error) {
        console.error('Error uploading FAQ:', error);
    }

    return {}
}