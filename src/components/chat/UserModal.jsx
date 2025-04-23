import { useEffect, useState, useContext } from "react";
import UsersGrid from "./UsersGrid";
import { AppContext } from "../../stores/AppContext";
import { getUserRolesMaster } from "../../services/api"


const UserModal = () => {
  const modalTitle = "Users";
  const [showGrid, setShowGrid] = useState(false);
  const context = useContext(AppContext);
  const { state, dispatch } = context;  
  const [rolesMaster, setRolesMaster] = useState([]);

  useEffect(() => {
    // API calls
    document.getElementById('userModal').addEventListener('shown.bs.modal', async () => {
      setShowGrid(false);    
      try {
        const rolesMaster = [
          {
              "id": "",
              "name": "Select Role"
          }, ...await getUserRolesMaster(state.sessionTokenId)];
        setRolesMaster(rolesMaster);
        setShowGrid(true);

      } catch (error) {
        console.error(error);
        setShowGrid(false);
      }
    })

    document.getElementById('userModal').addEventListener('hidden.bs.modal', function () {
      setShowGrid(false);
    })
  }, []);

  return (
    <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Add your modal content here */}
          <div className="modal-header">
            <h5 className="modal-title" id="userModalLabel">{modalTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* {!showGrid && <BarLoader color="#2672ca" />} */}
            {showGrid && <UsersGrid rolesMaster={rolesMaster} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
