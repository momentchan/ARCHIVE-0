import { useState, useEffect, useMemo } from 'react';

export const useTypewriter = (texts, speed = 50, onComplete, keepCursor = false) => {
    const [displayedTexts, setDisplayedTexts] = useState([]);
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [hasCalledComplete, setHasCalledComplete] = useState(false);

    const textsKey = useMemo(() => JSON.stringify(texts), [texts]);

    // Reset when texts change
    useEffect(() => {
        setIsTypingDone(false);
        setDisplayedTexts(Array(texts.length).fill(''));
        setTextIndex(0);
        setCharIndex(0);
    }, [textsKey]);

    // Typing effect
    useEffect(() => {
        if (textIndex >= texts.length) return;

        const currentText = texts[textIndex];

        if (charIndex < currentText.length) {
            const timer = setTimeout(() => {
                setDisplayedTexts(prev => {
                    const next = [...prev];
                    next[textIndex] = currentText.substring(0, charIndex + 1);
                    return next;
                });
                setCharIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else if (textIndex < texts.length - 1) {
            const pause = setTimeout(() => {
                setTextIndex(prev => prev + 1);
                setCharIndex(0);
            }, 600);
            return () => clearTimeout(pause);
        }
    }, [textIndex, charIndex, speed, textsKey]);


    useEffect(() => {
        const isLastLine = textIndex === texts.length - 1;
        const currentDone =
            displayedTexts[textIndex]?.length === texts[textIndex]?.length;

        if (!isTypingDone && isLastLine && currentDone) {
            setIsTypingDone(true);
        }
    }, [displayedTexts, textIndex, texts, isTypingDone]);

    useEffect(() => {
        if (textIndex === texts.length) {
            setIsTypingDone(true);
        }
    }, [textIndex, texts.length]);

    useEffect(() => {
        if (isTypingDone && !hasCalledComplete) {
            setHasCalledComplete(true);
            if (typeof onComplete === 'function') {
                onComplete();
            }
        }
    }, [isTypingDone, hasCalledComplete, onComplete]);

    useEffect(() => {
        if (isTypingDone && !keepCursor) return;

        const blink = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);

        return () => clearInterval(blink);
    }, [isTypingDone, keepCursor]);

    const rendered = [...displayedTexts];

    const shouldShowCursor = !isTypingDone || keepCursor;
    if (shouldShowCursor) {
        rendered[textIndex] += cursorVisible ? '▌' : ' ';
    }
    
    return { displayedTexts: rendered };
};
