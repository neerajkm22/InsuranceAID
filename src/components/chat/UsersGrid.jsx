import { useContext, useEffect, useState } from "react"
import { getAllUsers,updateUserData,getInactiveUsers } from "../../services/api";
import { AppContext } from "../../stores/AppContext";
import DataTable from "react-data-table-component";
import UserEditForm from "./UserEditForm";
import SubHeader from "./SubHeader";
import { BarLoader } from 'react-spinners';
import activeIcon from '../../assets/icons/active.svg';
import inActiveIcon from '../../assets/icons/inactive.svg';
import editIcon from '../../assets/icons/edit.svg';
import { Button,message,Popconfirm } from "antd";
import { ApplicationMessages,formatString,UserStatus } from "../../utils/utils";

const UsersGrid = ({rolesMaster}) => {
   const context = useContext(AppContext);
   const { state,dispatch } = context;  

   const [data, setData] = useState([]);
   const [initialData, setInitialData] = useState([]);
   const [expandedRows, setExpandedRows] = useState([]);
   const [search, setSearch] = useState('');
   const [pending, setPending] = useState(true);
   const [currentRow, setCurrentRow] = useState(null);

   useEffect(() => {
    (async () => {
        try {
            var response = await getAllUsers(state.sessionTokenId);
            if(response) {
                response=response.filter(x=>x.userid!=state.userId);
               
                setData(formatUserData(response));
                setInitialData(formatUserData(response));
            }     
            
            setPending(false);
        } catch (error) {
            console.log(error);
            setPending(false);
        }
        
    })();
    
}, []);

   useEffect(() => {     
        try {
            const result = initialData.filter((item) => {
                return (item.name.toLowerCase().match(search.toLowerCase()) || item.email.toLowerCase().match(search.toLowerCase()));
            });

            setData(result);
        } catch (error) {
            console.log(error);
        }
   }, [search]);

   const columns = [
        {
            name: 'Sr No',
            selector: row => row.srno,
            maxWidth: '20px'
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            maxWidth: '200px',
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Role',
            maxWidth: '200px',
            selector: row => row.role,
        },
        {
            name: 'Status',
            selector: row => row.status,
            maxWidth: '130px',
            sortable: true
        },
        {
            name: 'Action',
            maxWidth: '5px',
            selector: row => <EditButton row={row} />,
        },
    ];

    const paginationComponentOptions = {

    }

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
    
    const EditButton = ({ row }) => {
        const handleClick = () => {
            if(currentRow && currentRow.srno && currentRow.srno === row.srno) {
                setCurrentRow(null)
            } else{
                setCurrentRow(row)
            }
        };

        return <a href="#" onClick={() => handleClick()}><img src={editIcon} alt='Edit'  className='edit' /> Edit</a>;
    };

    const UserStatusUpdate = ({userId,indx,statusresp,status,roleid}) => {

        const confirm = (userId, statusresp) => (e) => {
            e.stopPropagation(); // Prevent scroll caused by event propagation
            handleStatusClick(userId,statusresp);
        };
    
        const handleStatusClick = async (userId,statusresp) => {
            
            try {
              const statusUpdateReponse = await updateUserData(userId,!statusresp,null,state.sessionTokenId);
              if(statusUpdateReponse.status==200){
                message.success(ApplicationMessages.UserStatusUpdateMessage);

                var updatedData = await getAllUsers(state.sessionTokenId);
                updatedData=updatedData.filter(x=>x.userid!=state.userId);
                setData(formatUserData(updatedData));
                setInitialData(formatUserData(updatedData));

                const inactiveresp=await getInactiveUsers(state.sessionTokenId);
                dispatch({type: 'SET_INACTIVE_USER_COUNT', payload: inactiveresp.length});
              }
              else{
                message.error(ApplicationMessages.ErrorMsg);
              }
             
              
            } catch (error) {
              console.error('Error updating status:', error);
            }
          };
        
          return (
            <Popconfirm
            title={ApplicationMessages.UserDataUpdateTitle}
            description={formatString(ApplicationMessages.UserDataUpdateDescription, 'update', 'status')}
            onConfirm={confirm(userId,statusresp)}
            okText="Yes"
            cancelText="Cancel">
              <a href="#"  
                //onClick={(e) => {
                  //e.preventDefault(); // Prevent the default anchor behavior
                  //handleStatusClick(userId, statusresp);
                //}}
              ><span className="statustext">{status}</span>                
                <img 
                src={status === UserStatus.Active ? activeIcon : inActiveIcon}
                alt={status}
                className={status} // Adjust size as needed
              />
              </a>
              </Popconfirm>
          );
    }

    const formatUserData = (data) => {
        const userData = [];
        try {
            if(data) {
                data.forEach((val, index) => {
                    userData.push({
                            srno: (index + 1),
                            name: `${val.firstname} ${val.lastname}`,
                            email: val.email,
                            role: val.role ? val.role.name : "",
                            status: <UserStatusUpdate userId={val.userid} indx={index} statusresp={val.active_status} status={val.active_status ? 'Active' : 'Inactive'}  roleid={val.role} />,
                            action: <EditButton />,
                            userid: val.userid,
                            role_id: val.role ? val.role.id : "",
                            status_id: val.active_status,
                        });
                });
            }      
        } catch (error) {
            console.error(error);
        }         

        return userData;        
    }

    const closeRow = (srno, userRow) => {  
        try {
            setCurrentRow(null)
            updateUserDataRow(userRow);
        } catch (error) {
            console.error(error);
        }
    };

    const onResetSearch = (isRefresh) => {
        if(isRefresh) {
            setSearch("");
        }     
        
        setData(initialData);
    }

    const updateUserDataRow = (userRow) => {
        try {
            const newRow = formatUserData([userRow]);
            if(newRow && newRow[0]) {
                const newData = initialData.map((userData) => {
                    if(userData.userid === userRow.userid) {
                        newRow[0].srno = userData.srno;
                        return {...userData, ...newRow[0]}
                    }
        
                    return userData;
                })
        
                setData(newData);
                setInitialData(newData);
                setSearch("");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            expandableRows
            expandableRowExpanded={(row) => (row === currentRow)}
            onRowExpandToggled={(bool, row) => {
               setCurrentRow(bool ? row : null)
            }}
            expandableRowsComponent={(props) => (
                <UserEditForm {...props} closeRow={closeRow} rolesMaster={rolesMaster} />
            )}
            subHeader
            subHeaderComponent={<SubHeader search={search} setSearch={setSearch} onResetSearch={onResetSearch}  />}
            progressPending={pending} 
            progressComponent={<BarLoader color="#2672ca" />}
        />
    );
}

export default UsersGrid