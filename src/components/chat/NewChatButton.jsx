import { useContext } from 'react'
import { AppContext } from '../../stores/AppContext';

const NewChatButton = () => {
  const { state, dispatch } = useContext(AppContext);

  const newChat = () => {
    // dispatch({type: 'SET_CLEARCHAT', payload: !state.clearChat})
    window.open('/', '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="open-new-chat-window" style={{paddingTop: "0px"}}>
        <button type="button" className="newchat-btn" id="new-window" onClick={() => newChat()}>+New Chat</button>
    </div>
  )
}

export default NewChatButton