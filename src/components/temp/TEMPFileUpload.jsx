import React, { useState, useRef, useContext } from 'react';
import { uploadTEMP, getTEMP } from '../../services/temp';
import { ApplicationMessages } from "../../utils/utils";
import { AppContext } from '../../stores/AppContext';
import { ALLOWED_FILE_TYPES, ALLOWED_SIZE, FILE_NAME_CHARACTER_LIMIT } from './config';
import {message} from "antd";
import { ScaleLoader} from 'react-spinners';

const TEMPFileUpload = ({setUploadData}) => {
    const context = useContext(AppContext);
    const { state, dispatch } = context;
    const [errorMessages, setErrorMessages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploadPending, setUploadPending] = useState(false);
       
    const fileInputRef = useRef(null); // Add a ref to the file input

    const fileNameCharacterLimit = FILE_NAME_CHARACTER_LIMIT;
    const allowedSize = ALLOWED_SIZE;
    const allowedFileTypes = ALLOWED_FILE_TYPES;    
  
    const handleFileChange = (e) => {
        const fileDataList = [];
        const files = Array.from(e.target.files);
        let errors = [];
        let validFiles = [];

        files.forEach(file => {
            if (!allowedFileTypes.includes(file.type)) {
                errors.push(`File type ${file.type} is not allowed!`);
            }
            if (file.size > allowedSize) {
                errors.push(`File ${file.name} exceeds the size limit of 2MB!`);
            }
            if (file.name.length > fileNameCharacterLimit) {
                errors.push(`File ${file.name} exceeds the file name character limit of 50!`);
            }

            if (errors.length === 0) {
                validFiles.push(file);
                fileDataList.push(file.name);
            }
        });

        setSelectedFiles(validFiles);
        if (errors.length > 0) {
            setErrorMessages(errors); 
            message.error(ApplicationMessages.FileUploadWrongFile)
        } else {
            setErrorMessages([]);
        }

        setFileList(fileDataList);
    };

    const uploadFile = async () => {
        if (selectedFiles.length === 0) {
            setErrorMessages([ApplicationMessages.FileUploadWrongFile]);
            return;
        }

        setUploadPending(true);

        let fileName = '';
        const formData = new FormData();
        selectedFiles.forEach(file => {
            fileName = file.name;
            formData.append('files', file);
        });

        formData.append('filename', fileName);
        formData.append('uploadedby', state.userEmail);

        try {
            const response = await uploadTEMP(formData, state.sessionTokenId);
            
            if(response && response.filename) {
                setUploadData([response]);
                setErrorMessages([]);
                setSelectedFiles([]);
                setFileList([]);
                fileInputRef.current.value = ''; // Reset the file input
                message.success(ApplicationMessages.FileUploadSuccess)
                setUploadPending(false);

                (async () => {
                    try {
                        const response = await getTEMP(state.userId,state.sessionTokenId);
                        if(response) {                            
                            document.getElementById('usd').innerHTML = (response.total_filesize_mb)?response.total_filesize_mb: 0;
                            
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })();                   
            }            

        } catch (error) {
            if (error.message.includes('504')) {
            // Handle 504 error specifically
            console.error('Gateway Timeout Error:', error);
            // Implement retry logic or display an error message to the user
            } else {
                setErrorMessages(['Error uploading files.']);
                message.error(error.message);
                setUploadPending(false);
            }            
        }
    };

    return (
        <div className="mb-3" style={{ paddingBottom: '10px' }}>            
            <div className="d-flex align-items-center">
                <input
                    className={`form-control ${errorMessages.length > 0 ? 'is-invalid' : ''}`}
                    type="file"
                    id="formFileMultiple"
                    multiple
                    onChange={handleFileChange}
                    style={{ width: '50%' }}
                    ref={fileInputRef} // Attach the ref to the input
                />
                <button
                    disabled={uploadPending ? "disabled" : ""}
                    type="submit"
                    className="btn btn-primary ms-2"
                    onClick={uploadFile}
                >
                    Upload
                </button>
                &nbsp;
                {uploadPending && <ScaleLoader color='#6691e7' style={{paddingLeft:'10px'}}/>}
            </div>
            {fileList.length > 0 && (
                <ul className="valid-feedback" style={{ display: 'block' }}>
                    {fileList.map((fileName, index) => (
                        <li key={index}>{fileName}</li>
                    ))}
                </ul>
            )}
            {errorMessages.length > 0 && (
                <ul className="invalid-feedback" style={{ display: 'block' }}>
                    {errorMessages.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <div style={{fontSize: '10px', color: 'red'}}>   
                <span>Note: Allowed filename length is {fileNameCharacterLimit} character.<br/>Allowed file type: {allowedFileTypes} <br/>Maximum allowed file size is {allowedSize/1024/1024} MB! </span>
            </div>            
        </div>
        
    );
};

export default TEMPFileUpload;
