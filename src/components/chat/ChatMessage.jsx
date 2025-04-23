import React, { useState,useContext, useEffect } from 'react';
import '../../App.css';
import { AppContext } from '../../stores/AppContext';
import ReactionPanel from './ReactionPanel';
import { getChatData } from '../../services/api';
import AnimatedChatMessage from './AnimatedChatMessage';

const formatText = (text) => {
  return text.split(/\n/g).map((item, index) => (
    <React.Fragment key={index}>
      {item}
      {index < text.split(/\n/g).length - 1 && <br />}
      {item === '' && <br />}
    </React.Fragment>
  ));
};


const ChatMessage = ({message, userName, type, summary, scrollcallback, responseId, question, chatId, animateChatMessage,isliked,isdisliked}) => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [viewLabelText, setViewLabelText] = useState('view more...');
  const [chatMessage, setChatMessage] = useState('');
  const [chatSummary, setChatSummary] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const [renderingAnimatedChatMessage, setRenderingAnimatedChatMessage] = useState(false);

  useEffect(() => {
    setChatMessage(message);
    setChatSummary(summary);
    if(animateChatMessage) {
      setRenderingAnimatedChatMessage(true);
    }

    showSummary('');
  }, [message]);

  const showSummary=(summary)=>{
    dispatch({type: 'SET_SUMMARY_TEXT', payload: summary});
  };

  const setSummaryVisible=(isVisible)=>{
    setIsSummaryVisible(isVisible);
    if(isVisible){
      setViewLabelText('view less...');
    }
    else{
      setViewLabelText('view more...')
    }
    scrollcallback();
  };

  const refreshMessage = async (query) => {
    try {
      const response = await getChatData(query, true,state.sessionTokenId, state.userId,state.userEmail);
      if(response && response.answer) {
        setChatMessage(response.answer);
        setChatSummary(response?.docs);
        setIsSummaryVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const doneChatAnimation = () => {
    setRenderingAnimatedChatMessage(prev => !prev)
  }

  return (
    <li className="chat-list left">
        <div className="conversation-list">
            <div className={type}>{userName}</div>													
            <div className="user-chat-content">
                <div className="ctext-wrap">
                    <div className="ctext-wrap-content">
                        <p className="mb-0 ctext-content">{animateChatMessage ? <AnimatedChatMessage message={message} doneChatAnimation={doneChatAnimation} /> : formatText(chatMessage)}</p>
                        {!renderingAnimatedChatMessage && chatSummary?.length>0 && 
                          <span className='viewmore' onClick={() => setSummaryVisible(!isSummaryVisible)}>{viewLabelText}</span>
                        }
                         {!renderingAnimatedChatMessage && isSummaryVisible && (
                            <div>
                              {chatSummary.map((item, index) => (
                                 <span className='indent' key={index} onClick={() => showSummary(item)}> {index+1}. {(item.metadata.source.split("?")[0]).split('/').pop().substring(0, 15) }...  </span> 
                              ))}
                            </div>
                            
                          )}
                    </div>															   
                </div>
                {!renderingAnimatedChatMessage && <ReactionPanel type={type} text={chatMessage} responseId={responseId} question={question} refreshMessage={refreshMessage} chatId={chatId} isliked={isliked} isdisliked={isdisliked} />}												
            </div>	
        </div>
    </li> 
  )
}

export default ChatMessage;
