import React from 'react'
import Header from './Header'
import ChatBox from './ChatBox'
import SummaryBox from './SummaryBox'
import Footer from './Footer'
import { AppContext } from '../../stores/AppContext';
import { useContext } from 'react';

const RightSection = () => {

  const { state } = useContext(AppContext);

  return (
    <div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <Header />
                <div className="row">						
                    <ChatBox />
                    {state.summaryText.page_content &&  <SummaryBox />  }              						 
                </div>                
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default RightSection