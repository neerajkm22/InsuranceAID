import { useState, useContext,useEffect } from 'react';

import dislike from '../../assets/icons/BadResponse.svg';
import like from '../../assets/icons/GoodResponse.svg';
import disliked from '../../assets/icons/disliked.svg';
import liked from '../../assets/icons/liked.svg';
import { updateReaction } from '../../services/api';
import { AppContext } from '../../stores/AppContext';

const ReactionButton = ({responseId,isliked,isdisliked}) => {
    const [likeTitle, setLikeTitle] = useState('Like');
    const [dislikeTitle, setDislikeTitle] = useState('Dislike');
    const { state } = useContext(AppContext);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsdisliked] = useState(false);
    const [disable, setDisable] = useState(false);
    const [isReactionUpdated, setIsReactionUpdated] = useState('');

    useEffect(() => {

        setIsReactionUpdated('');

        if(isReactionUpdated==''){
        if(isliked){
            setLikeTitle('Liked');
        }
        else{
            setLikeTitle('Like');
        }

        if(isdisliked){
            setDislikeTitle('Disliked');
        }
        else{
            setDislikeTitle('Dislike');
        }
        setDisable(true);
        setIsLiked(isliked);
        setIsdisliked(isdisliked);
        setDisable(false);
    }
    },[isliked,isdisliked]);
    
    const onLike = async () => {
        setDisable(true);
        try {
            if(!isLiked) {
                 await updateReaction({response_id: responseId, user_id: state.userId, action: 'like'});
            }
            setIsLiked(prevVal => !prevVal);
            setIsdisliked(false);
            setDisable(false);
            setLikeTitle('Liked');
            setIsReactionUpdated('liked');
        } catch (error) {
            console.error(error);
            setDisable(false);
        }       
    }

    const onDislike = async () => {
        setDisable(true);
        try {
            if(!isDisliked) {
                await updateReaction({response_id: responseId, user_id: state.userId, action: 'dislike'});
            }

            setIsdisliked(prevVal => !prevVal);
            setIsReactionUpdated('disliked')
            setIsLiked(false);
            setDisable(false);
            setDislikeTitle('Disliked');
        } catch (error) {
            console.error(error);
            setDisable(false);
        }        
    }

    return (
        <>
            <button disabled={disable ? "disabled" : ""} className="btn" onClick={() => onDislike()} style={{border: 'none'}} title={dislikeTitle} ><span className="dislike"><img src={isDisliked ? disliked : dislike} alt="Dislike" height="29"/></span></button>
            <button disabled={disable ? "disabled" : ""} className="btn" onClick={() => onLike()} style={{border: 'none'}} title={likeTitle} ><span className="like"><img src={isLiked ? liked : like} alt="Like" height="29"/></span></button>         
        </>
    )
}

export default ReactionButton