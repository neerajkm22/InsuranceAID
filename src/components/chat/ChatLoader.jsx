
import { SyncLoader } from 'react-spinners';

const ChatLoader = () => {
    return (
        <li className="chat-list left">
            <div className="conversation-list">
                <div className=""> </div>													
                <div className="user-chat-content">
                    <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                            <p className="mb-0 ctext-content">
                                <SyncLoader size={6} />
                            </p>
                        </div>															   
                    </div>															
                </div>	
            </div>
        </li> 
    )
}

export default ChatLoader