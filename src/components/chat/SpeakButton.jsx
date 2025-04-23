import muteaudio from '../../assets/icons/mute-audio.svg';
import readAloud from '../../assets/icons/Audio.svg';

import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../stores/AppContext';


const SpeakButton = ({ text, chatId }) => {
    const { state, dispatch } = useContext(AppContext);
    const [isMute, setIsMute] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterances, setUtterances] = useState([]);
    const [title, setTitle] = useState('Read');

    useEffect(() => {
        if(state.activeSpeakerId !== chatId) {
            setIsMute(false)
        }
    }, [state.activeSpeakerId])

    useEffect(() => {
        const synth = window.speechSynthesis;

        // Split text into chunks to ensure it's not too long
        const maxChunkLength = 100;
        const textChunks = [];
        let start = 0;

        while (start < text?.length) {
            let end = start + maxChunkLength;

            // Make sure we don't split words
            if (end < text.length) {
                while (end > start && text[end] !== ' ') {
                    end--;
                }
            }

            textChunks.push(text.substring(start, end));
            start = end + 1;
        }

        const utterancesArray = textChunks.map(chunk => {
            const u = new SpeechSynthesisUtterance(chunk);
            u.onend = () => {
                if (synth.speaking || synth.pending) {
                    // Continue speaking
                    return;
                }
                setIsMute(false);
            };
            return u;
        });

        setUtterances(utterancesArray);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const onPlay = () => {
        onStop();
        dispatch({type: 'SET_ACTIVE_SPEAKER_ID', payload: chatId});
        const synth = window.speechSynthesis;
        if (isPaused) {
            synth.resume();
        } else if (!synth.speaking && !synth.pending) {
            utterances.forEach(utterance => synth.speak(utterance));
        }
        setIsPaused(false);
    };

    const onPause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPaused(true);
    };

    const onSpeech = () => {
        if (isMute) {
            onStop();
        } else {
            onPlay();
        }
        setIsMute(prevVal => !prevVal);
    };

    const onStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(false);
    };

    return (
        <button className="btn" onClick={() => onSpeech()} title={title}>
            <span className="audio"><img src={isMute ? muteaudio : readAloud} alt="Read Aloud" height="12" /></span>
        </button>
    );
}

export default SpeakButton;
