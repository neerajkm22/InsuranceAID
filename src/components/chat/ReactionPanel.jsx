import SpeakButton from './SpeakButton';
import ReactionButton from './ReactionButton';
import RefreshButton from './RefreshButton';
import CopyButton from './CopyButton';


const ReactionPanel = ({type, text, responseId, question, refreshMessage, chatId,isliked,isdisliked}) => {
    
    return (
        (type=='response') && (
            <div className="items-center response-audit">
                <SpeakButton text={text} chatId={chatId} />
                <ReactionButton responseId={responseId} isliked={isliked} isdisliked={isdisliked} />
                <RefreshButton responseId={responseId} question={question} refreshMessage={refreshMessage} />
                <CopyButton text={text} />
            </div>  
        )  
    )
}

export default ReactionPanel