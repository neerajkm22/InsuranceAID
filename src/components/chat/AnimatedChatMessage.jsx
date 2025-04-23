import { useEffect, useState } from "react";

const AnimatedChatMessage = ({ message, doneChatAnimation }) => {
    const [completedTyping, setCompletedTyping] = useState(false);
    const [displayResponse, setDisplayResponse] = useState('');

    useEffect(() => {
        setCompletedTyping(false);
        setDisplayResponse('');
        let i = 0;
        const stringResponse = message;

        const intervalId = setInterval(() => {
            // Correctly set the next letter by slicing the message
            setDisplayResponse((prev) => stringResponse.slice(0, i + 1));

            i++;

            if (i >= stringResponse.length) {
                clearInterval(intervalId);
                setCompletedTyping(true);
                doneChatAnimation();
            }
        }, 25);

        return () => clearInterval(intervalId);
    }, [message]);

    const CursorSVG = () => {
        return (
            <svg
                viewBox="8 4 8 16"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor"
            >
                <rect x="10" y="6" width="4" height="12" fill="#000" />
            </svg>
        );
    };

    const renderMessageWithLineBreaks = (text) => {
        return text.split(/(\n\n|\n)/).map((part, index) => {
            if (part === '\n\n') {
                return <><br key={`${index}-double`} /><br /></>;
            } else if (part === '\n') {
                return <br key={`${index}-single`} />;
            } else {
                return <span key={`${index}-text`}>{part}</span>;
            }
        });
    };

    return (
        <>
            {renderMessageWithLineBreaks(displayResponse)}
            {!completedTyping && <CursorSVG />}
        </>
    );
};

export default AnimatedChatMessage;
