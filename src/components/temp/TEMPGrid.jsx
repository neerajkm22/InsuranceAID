import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { BarLoader } from 'react-spinners';
import { getFormattedDate } from "../../utils/utils";
import { getTEMP,delTEMP, delSelTEMP } from "../../services/temp";
import { AppContext } from '../../stores/AppContext';
import { message,Popconfirm } from "antd";
import { ApplicationMessages,formatString,UserStatus } from "../../utils/utils";

const TEMPGrid = ({uploadData}) => {
    const context = useContext(AppContext);
    const { state, dispatch } = context;  
    const [pending, setPending] = useState(true);
    const [data, setData] = useState([]); // data coming from API
    const [displayData, setDisplayData] = useState([]); // formated data   
    
    useEffect(() => {

        (async () => {
            try {
                const response = await getTEMP(state.userId,state.sessionTokenId);
                if(response) {
                    setData(response.files);
                    document.getElementById('usd').innerHTML = (response.total_filesize_mb)?response.total_filesize_mb: 0;
                    setPending(false);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        setData(prevData => [...uploadData, ...prevData]);       
    }, [uploadData]);

    useEffect(() => {
        setDisplayData(formatTEMPData(data));
    }, [data]);

    const UserDeleteFile = ({username, id, filename}) => {
    
        const confirm = (username, id) => (e) => {
            e.stopPropagation(); // Prevent scroll caused by event propagation
            handleStatusClick(username, id);
        };
    
        const handleStatusClick = async (username, id) => {            
            try {
                const statusUpdateReponse = await delTEMP(username, id, state.sessionTokenId);
                if(statusUpdateReponse==200){                    
                    message.success(ApplicationMessages.UserFileDeleteMessage);    
                    
                    (async () => {
                        try {
                            const response = await getTEMP(state.userId,state.sessionTokenId);
                            if(response) {
                                setData(response.files);  
                                document.getElementById('usd').innerHTML = (response.total_filesize_mb)?response.total_filesize_mb: 0;                              
                                setPending(false);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })();

                }else{
                    message.error(ApplicationMessages.ErrorMsg);
                }         
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        };
        
        return (
        <Popconfirm
        title={ApplicationMessages.UserFileDeleteTitle}
        description={formatString(ApplicationMessages.UserFileDeleteDescription, filename)}        
        onConfirm={confirm(username,id)}
        okText="Yes"
        cancelText="Cancel">                    
        //<button type="button" className="btn btn-danger btn-sm">Delete</button>               
        </Popconfirm>
        );
    }    

    const formatTEMPData = (tempData) => {
        const userTEMPData = [];
        try {
            if(tempData) {                
                tempData.forEach((val, index) => {
                    userTEMPData.push({
                        srno: (index + 1),
                        fileid: val.id,
                        name: val.filename,
                        uploadedBy: val.uploadedby,
                        uploadedTime: val.uploadedat,
                        fileSize: val.filesize_mb
                    });
                });
            }      
        } catch (error) {
            console.error(error);
        }         

        return userTEMPData;      
    }

    const columns = [
        /*{
            name: 'Sr No',
            selector: row => row.srno,
            maxWidth: '5px'
        },*/
        {
            name: 'File Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Size (MB)',
            selector: row => row.fileSize,
            maxWidth: '15px'
        },
        {
            name: 'Uploaded By',
            selector: row => row.uploadedBy,
            sortable: true
        },
        {
            name: 'Uploaded Time',
            selector: row => row.uploadedTime,
        },        
        /*{
            name: 'Action',
            selector: row =><UserDeleteFile username={row.uploadedBy}  id={row.fileid} filename={row.name}/>,
            maxWidth: '20px'
        }*/
    ];

    const customStyles = {
        header: {
            style: {
                minHeight: '56px'
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                // borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    // borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    // borderRightColor: defaultThemes.default.divider.default,
                },
            },
        }        
    };

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    // Handle selected rows
    const handleSelectedRowsChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const handleClick = async (username, file_ids) => { 
            try {
            const statusUpdateReponse = await delSelTEMP(username, file_ids, state.sessionTokenId);
            if(statusUpdateReponse==200){                    
                message.success(ApplicationMessages.UserFileDeleteMessage);    
                
                (async () => {
                    try {
                        const response = await getTEMP(state.userId,state.sessionTokenId);
                        if(response) {
                            setData(response.files);  
                            document.getElementById('usd').innerHTML = (response.total_filesize_mb)?response.total_filesize_mb: 0;                              
                            setPending(false);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })();

            }else{
                message.error(ApplicationMessages.ErrorMsg);
            }         
        } catch (error) {
            console.error('Error deleting files:', error);
        }
    };

    const handleDelete = () => {
        const file_ids = selectedRows.map(row => row.fileid);
        const userName = state.userId;
        if(file_ids.length>0) {             
            handleClick(userName, file_ids);          
        }                
        setToggleCleared(prev => !prev);
   
    }
    
    const contextActions = (   <button onClick={handleDelete} className="btn btn-danger btn-sm" > Delete </button> );

    return <DataTable 
     title="My upload history "
     columns={columns} 
     data={displayData}
     pagination
     selectableRows // Enable checkboxes
     onSelectedRowsChange={handleSelectedRowsChange}
     clearSelectedRows={toggleCleared}
     contextActions={contextActions}
     customStyles={customStyles}
     progressPending={pending}     
     progressComponent={<BarLoader color="#2672ca" />} />
}

export default TEMPGrid