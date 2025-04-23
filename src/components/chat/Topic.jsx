import React from 'react';
import { useState, useEffect,useContext,useRef } from 'react';
import { getTopicHistory } from '../../services/api';
import { AppContext } from '../../stores/AppContext';

const Topic = () => {
  const topicHistoryData = useRef([]);
  const [topicHistoryList, setTopicHistoryList] = useState([]);
  const [top5UniqueDates, setTop5UniqueDates] = useState([]);
  const {state,dispatch } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState('Topics');

  useEffect(() => {     
    (async function() {
      try {
        topicHistoryData.current=state.userId !='' ? await getTopicHistory(state.userId) : [];//"100678990506020761366"
        Top5Topicfunc();
      } catch (e) {
          console.error(e);
      }
  })();
  },[state.updateHistory]);

  const Top5Topicfunc=()=>{
    var top5Query = topicHistoryData.current.sort((a,b) => new Date(b.Query_time?.replace(' ', 'T'))-new Date(a.Query_time?.replace(' ', 'T'))).slice(0,5);
    setTopicHistoryList(top5Query);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    if(tabName=='Topics'){
      Top5Topicfunc();
    }
    else{
      const top5UniqueDatesList = [...new Set(topicHistoryData.current
        .map(item => {
            if (item.Query_time) {
                // Split based on space or 'T', and get the first part which is the date
                return item.Query_time.includes(' ')
                    ? item.Query_time.split(' ')[0]
                    : item.Query_time.split('T')[0];
            }
            return null; // Handle undefined or null QueryTime
        })
        .filter(date => date))] // Filter out null or undefined values
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(0, 5); // Get the top 5 unique dates

      setTop5UniqueDates(top5UniqueDatesList);
    }
};

const showSelectedHistoryChatResponse=async (searchText)=>{
  dispatch({type: 'SET_CLEARCHAT', payload: true});

  var searchedResult;
  topicHistoryData.current=state.userId !='' ? await getTopicHistory(state.userId) : [];
  if(selectedTab =='Topics'){
    searchedResult=topicHistoryData.current.filter(x=>String(x.Id).toLowerCase() === String(searchText).toLowerCase());
  }
  else{
    searchedResult=topicHistoryData.current.filter(x=>x.Query_time.split(' ')[0]==searchText);
  }

  if(searchedResult){
    dispatch({type: 'SET_SELECTEDHISTORYREPSONSE', payload: searchedResult});
    sessionStorage.setItem('chatReactionHistory', JSON.stringify(searchedResult))
  }
};

  return (
    <div className="search-history">
        <span>Historical search by</span>				
        <ul className="nav nav-fill nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="fill-tab-0" data-bs-toggle="tab" 
            href="#fill-tabpanel-0" role="tab" aria-controls="fill-tabpanel-0" aria-selected="true"
            onClick={() => handleTabClick('Topics')}> Topics </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="fill-tab-1" data-bs-toggle="tab" 
            href="#fill-tabpanel-1" role="tab" aria-controls="fill-tabpanel-1" aria-selected="false"
            onClick={() => handleTabClick('Dates')}> Dates </a>
          </li>  
        </ul>
        <div className="tab-content pt-5" id="tab-content">
          <div className="tab-pane active" id="fill-tabpanel-0" role="tabpanel" aria-labelledby="fill-tab-0">
            <ul className="topics">
              {topicHistoryList.map((item, index) => (
                      <li key={index}>
                         <a onClick={()=>showSelectedHistoryChatResponse(`${item.Id}`)}>{item.Query}</a>
                      </li>
                  ))}
            </ul>
          </div>
          <div className="tab-pane" id="fill-tabpanel-1" role="tabpanel" aria-labelledby="fill-tab-1">
            <ul className="topics-by-date">
              {top5UniqueDates.map((item, index) => (
                      <li key={index}>
                         <a onClick={()=>showSelectedHistoryChatResponse(`${item}`)}>{item}</a>
                      </li>
                  ))}
            </ul>
          </div> 
        </div>					
      </div>
  )
}

export default Topic