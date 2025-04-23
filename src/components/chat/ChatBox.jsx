import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getChatData, updateChatHistory } from '../../services/api';
import sendImage from '../../assets/icons/send.svg';
import docUpload from '../../assets/icons/doc-upload.svg';
import ChatMessage from './ChatMessage';
import { AppContext } from '../../stores/AppContext';
import { getFirstLetterCaps, getFormattedDate, ApplicationMessages } from '../../utils/utils';
import ChatLoader from './ChatLoader';

const ChatBox = () => {
    let chatHistory = [];
    const [message, setMessage] = useState('');
    const [messageComponents, setMessageComponents] = useState([]);
    const [showChatLoader, setShowChatLoader] = useState(false);
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        if(!messageComponents){
            setMessageComponents([]);
        }
        else{
            handleScrollToBottom();
        }
    }, [state.clearChat,messageComponents]);

    useEffect(() => {    
        var previousChats;
        // fetch previous chat data stored in sessionStorage
        if(!state.clearChat){
          previousChats = getChatHistory();
        }
        else{
            sessionStorage.removeItem('chatHistory');
            setMessageComponents([]);
            chatHistory=[];
            state.selectedHistoryResponse.forEach(resp=>{
                chatHistory.push(resp.Response);
            });

            setChatHistory();
            previousChats = getChatHistory();
        }
         
        // if any chats found then render those chat components 
        if(previousChats) {
          
            const newMessageComponents = [];
            previousChats.forEach(chat => {
                newMessageComponents.push(<ChatMessage  
                    key={newMessageComponents.length} 
                    chatId={uuidv4()}
                    message={chat.question} 
                    userName={getFirstLetterCaps(state.userName)} 
                    type='query'
                    responseId=''
                    question=''
                    animateChatMessage={false}
                    isliked={false}
                    isdisliked={false}
                    />);

                let isliked=false;
                let isdisliked=false;
                var selChatHistoryReaction=state.selectedHistoryResponse.length? state.selectedHistoryResponse:
                JSON.parse(sessionStorage.getItem('chatReactionHistory'));
                
                 if(selChatHistoryReaction){
                    let isRecordFound=selChatHistoryReaction?.find(x=>x.Response.response_id==chat.response_id);
                    if(isRecordFound){
                        isliked=isRecordFound.liked==undefined?false:isRecordFound.liked;
                        isdisliked=isRecordFound.disliked==undefined?false:isRecordFound.disliked;
                    }
                 }

                newMessageComponents.push(<ChatMessage  
                    key={newMessageComponents.length}
                    chatId={uuidv4()}
                    message={chat.answer} 
                    userName={state.aiName} 
                    summary={chat.docs}
                    scrollcallback={handleScrollToBottom}
                    type='response'
                    responseId={chat.response_id}
                    question={chat.question}
                    animateChatMessage={false}
                    isliked={isliked}
                    isdisliked={isdisliked}
                    />);
            });                 
            
            setMessageComponents(newMessageComponents);
        }
        
    }, [state.clearChat,state.selectedHistoryResponse]);

    const handleScrollToBottom = () => {
        const element = document.getElementById('chatwindow');
        element.scrollTop = element.scrollHeight;
      };

    const getChatHistory = () => {
        const previousChat = sessionStorage.getItem('chatHistory'); 
        return  (previousChat) ? JSON.parse(previousChat) : [];
    }

    const setChatHistory = (chatResopnse) => {
        const previousChat = sessionStorage.getItem('chatHistory'); 
        chatHistory = (previousChat) ? JSON.parse(previousChat) : chatHistory;
        if(chatResopnse) chatHistory.push(chatResopnse);
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory))       
    }

    const getChat = async () => {
        if(message) {
            
            handleScrollToBottom();
            const userName = getFirstLetterCaps();
            const question = message;
            setMessageComponents((prevMessageComponents) => [...prevMessageComponents, <ChatMessage  
                key={prevMessageComponents.length} 
                chatId={uuidv4()}
                message={question} 
                userName={getFirstLetterCaps(state.userName)} 
                type='query'
                responseId=''
                animateChatMessage={false}
                isliked={false}
                isdisliked={false}
                />]);

            setMessage('');

            try {
                setShowChatLoader(true);
                const response = await getChatData(question, true, state.sessionTokenId, state.userId,state.userEmail);
                if(response && response.answer) {
                    // update the chat history
                    await updateChatHistory({userid: state.userId, Query: response.question, Response_id : response.response_id, Response: response, Query_time: getFormattedDate()})
                    dispatch({type: 'SET_UPDATEHISTORY', payload: !state.updateHistory});
                    setShowChatLoader(false);
                    setMessageComponents((prevMessageComponents) => [...prevMessageComponents, <ChatMessage 
                        key={`${prevMessageComponents.length}`} 
                        chatId={uuidv4()}
                        message={response.answer} 
                        userName={state.aiName} 
                        type='response'
                        summary={response?.docs}
                        scrollcallback={handleScrollToBottom}
                        responseId={response.response_id}
                        question={response.question}
                        animateChatMessage={true}
                        isliked={false}
                        isdisliked={false}
                        />]);

                    setChatHistory(response);
                } else {
                    setShowChatLoader(false);
                }
                
            } catch (error) {
                setShowChatLoader(false);
                console.log(error);
            }            
        }       
   }

  return (
    <div className="col-lg-6 col-lg-8 chat">
        <div className="card chat card-height-100">
            <div className="card-header align-items-center d-flex">	
                <div className="banner-message">{ApplicationMessages.BannerMessage}</div>									
            </div>
            <div className="card-body p-0">
                <div className="chat-conversation p-3 simplebar-scrollable-y" id="chatwindow">
                    <div className="simplebar-content" >
                        <ul className="list-unstyled chat-conversation-list chat-sm" id="users-conversation">
                              {messageComponents}  
                              {showChatLoader && <ChatLoader />}                       				
                        </ul>
                    </div>
                </div>
                <div className="border-top border-top-dashed">
                    <div className="row g-2 mx-3 mt-2 mb-3">
                        <div className="col searchcol">
                            <div className="position-relative searchfield">
                                <input 
                                    disabled={showChatLoader ? "disabled" : ""}
                                    type="text" 
                                    className="form-control " 
                                    placeholder="Message BrokerAiD..." 
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter') {
                                            e.preventDefault();
                                            getChat()
                                        }
                                    }}
                                    value={message}
                                />
                            </div>
                            <div className="col-auto temp-upload-container">
                                <a href="#"  className="btn uploadbtn" title="Upload File" alt="Upload File" data-bs-toggle="modal" data-bs-target="#tempModal">                            
                                    <span className="upload-doc">
                                        <img src={docUpload} title="Upload File" alt="Upload File" height="30" />
                                    </span>                         
                                </a>
                            </div>
                            <div className="col-auto search-container">
                                <button type="submit" className="btn searchbtn" title="Click to search" alt="search" onClick={() => getChat()}>
                                    <span className="logo-lg">
                                        <img src={sendImage} title="Click to search" alt="search" height="36" />
                                    </span>
                                    <i className="mdi mdi-send float-end"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatBox