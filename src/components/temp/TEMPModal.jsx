import React, { useEffect, useState } from 'react'
import TEMPFileUpload from './TEMPFileUpload';
import TEMPGrid from './TEMPGrid';
import { SESSION_DISK_SPACE_LIMIT } from './config';

const TEMPModal = () => {
    const modalTitle = "Upload files for current session";
    const [showUpload, setShowUpload] = useState(false);
    const [uploadData, setUploadData] = useState([]);
    const sessionDiskSpaceLimit = SESSION_DISK_SPACE_LIMIT;

    useEffect(() => {
      document.getElementById('tempModal').addEventListener('shown.bs.modal', () => {
        setShowUpload(true);        
      })
  
      document.getElementById('tempModal').addEventListener('hidden.bs.modal', function () {
        setShowUpload(false);
        setUploadData([]);  
      })
    }, []);

    return <div className="modal fade" id="tempModal" tabIndex="-1" aria-labelledby="tempModalLabel" >
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        {/* Add your modal content here */}
        <div className="modal-header">
          <h5 className="modal-title" id="tempModalLabel">{modalTitle}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {showUpload && <TEMPFileUpload setUploadData={setUploadData} />}
          <div style={{marginTop: '10px'}}>
                <span id="ads" style={{color: 'blue'}}>Allocated Disk Space: {sessionDiskSpaceLimit} MB</span><br/>  
                <span style={{color: 'green'}}>Used: <span id="usd"></span>MB</span><br/>                                         
            </div>
          {showUpload && <TEMPGrid uploadData={uploadData} />}
        </div>
      </div>
    </div>
  </div>
}

export default TEMPModal