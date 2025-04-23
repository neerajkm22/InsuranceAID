import React from 'react'
import { AppContext } from '../../stores/AppContext';
import { useContext } from 'react';
import DownloadFile from '../DownloadFile';

const SummaryBox = () => {

  const { state } = useContext(AppContext);

  return (
    <div className="col-lg-4">
        <div className="card card-height-100">
            <div className="card-header align-items-center">
                <h4 className="card-title mb-0 flex-grow-1">Summary</h4>                
                <div className='summary-text'>
                    {state.summaryText.page_content?.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line} 
                            {/* <br /> */}
                        </React.Fragment>
                        
                    ))}
                     <DownloadFile url={state?.summaryText?.metadata?.source} />
                </div>
            </div>            
        </div>
    </div>	
  )
}

export default SummaryBox