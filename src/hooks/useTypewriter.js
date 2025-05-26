import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setIsTyping(true);
        setDisplayedText('');
        let currentIndex = 0;
        let timeoutId;
        
        const typeText = () => {
            if (currentIndex < text?.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
                timeoutId = setTimeout(typeText, speed);
            } else {
                setIsTyping(false);
            }
        };

        if (text) {
            typeText();
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [text, speed]);

    return { displayedText, isTyping };
};
