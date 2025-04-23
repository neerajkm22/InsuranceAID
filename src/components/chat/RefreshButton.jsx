import { useState } from 'react';
import refresh from '../../assets/icons/regenerate-response.svg';

const RefreshButton = ({responseId, question, refreshMessage}) => {
    const [title, setTitle] = useState('Regenerate');

    const onRefresh = async () => {
        try {
            refreshMessage(question);
        } catch (error) {
            console.error(error)
        }        
    }

    return (
        <button className="btn" onClick={() => onRefresh()} title={title}>
            <span className="refresh">
                <img src={refresh} alt="regenerate-response" height="12"/>
            </span>
        </button>
    )
}

export default RefreshButton