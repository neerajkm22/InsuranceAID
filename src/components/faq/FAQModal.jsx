import React, { useEffect, useState } from 'react'
import FAQFileUpload from './FAQFileUpload';
import FAQGrid from './FAQGrid';

const FAQModal = () => {
    const modalTitle = "Manage FAQ";
    const [showUpload, setShowUpload] = useState(false);
    const [uploadData, setUploadData] = useState([]);

    useEffect(() => {
      document.getElementById('faqModal').addEventListener('shown.bs.modal', () => {
        setShowUpload(true);        
      })
  
      document.getElementById('faqModal').addEventListener('hidden.bs.modal', function () {
        setShowUpload(false);
        setUploadData([]);  
      })
    }, []);

    return <div className="modal fade" id="faqModal" tabIndex="-1" aria-labelledby="faqModalLabel" >
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        {/* Add your modal content here */}
        <div className="modal-header">
          <h5 className="modal-title" id="faqModalLabel">{modalTitle}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {showUpload && <FAQFileUpload setUploadData={setUploadData} />}
          {showUpload && <FAQGrid uploadData={uploadData} />}
        </div>
      </div>
    </div>
  </div>
}

export default FAQModal