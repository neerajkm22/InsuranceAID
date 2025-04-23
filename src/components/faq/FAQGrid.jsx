import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { BarLoader } from 'react-spinners';
import { getFormattedDate } from "../../utils/utils";
import { getFAQ } from "../../services/faq";
import { AppContext } from '../../stores/AppContext';

const FAQGrid = ({uploadData}) => {
    const context = useContext(AppContext);
    const { state, dispatch } = context;  
    const [pending, setPending] = useState(true);
    const [data, setData] = useState([]); // data coming from API
    const [displayData, setDisplayData] = useState([]); // formated data

    useEffect(() => {

        (async () => {
            try {
                const response = await getFAQ(state.sessionTokenId);
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
        setDisplayData(formatFAQData(data));
    }, [data])

    const formatFAQData = (faqData) => {
        const userFAQData = [];
        try {
            if(faqData) {
                faqData.forEach((val, index) => {
                    userFAQData.push({
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

        return userFAQData;        
    }

    const columns = [
        {
            name: 'Sr No',
            selector: row => row.srno,
            maxWidth: '20px'
        },
        {
            name: 'Name',
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
                minHeight: '56px',
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
     title="Uploaded file list"
     columns={columns} 
     data={displayData}
     pagination
     customStyles={customStyles}
     progressPending={pending} 
     progressComponent={<BarLoader color="#2672ca" />} />
}

export default FAQGrid