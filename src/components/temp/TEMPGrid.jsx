import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { BarLoader } from 'react-spinners';
import { getFormattedDate } from "../../utils/utils";
import { getTEMP,delTEMP } from "../../services/temp";
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
                    setData(response);
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
                                setData(response);
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
        <button type="button" className="btn btn-danger btn-sm">Delete</button>               
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
                        uploadedTime: val.uploadedat
                    });
                });
            }      
        } catch (error) {
            console.error(error);
        }         

        return userTEMPData;      
    }

    const columns = [
        {
            name: 'Sr No',
            selector: row => row.srno,
            maxWidth: '20px'
        },
        {
            name: 'File Name',
            selector: row => row.name,
            sortable: true
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
        {
            name: 'Action',
            selector: row =><UserDeleteFile username={row.uploadedBy}  id={row.fileid} filename={row.name}/>,
        }
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
        },
    };

    return <DataTable 
     title="My upload history "
     columns={columns} 
     data={displayData}
     pagination
     customStyles={customStyles}
     progressPending={pending} 
     progressComponent={<BarLoader color="#2672ca" />} />
}

export default TEMPGrid