import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { BarLoader } from 'react-spinners';
import { getFormattedDate } from "../../utils/utils";
import { getTEMP } from "../../services/temp";
import { AppContext } from '../../stores/AppContext';

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
    }, [data])

    const formatTEMPData = (tempData) => {
        const userTEMPData = [];
        try {
            if(tempData) {
                tempData.forEach((val, index) => {
                    userTEMPData.push({
                            srno: (index + 1),
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