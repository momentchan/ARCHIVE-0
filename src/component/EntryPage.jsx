import { useEffect, useState } from 'react';
import '../EntryPage.css';
import { useTypewriter } from '../hooks/useTypewriter';

export default function EntryPage({ onFinish }) {
    const [show, setShow] = useState(true);
    const [isTypingDone, setTypingDone] = useState(false);
    const lines = [
        `Recovered memory logs from a synthetic system.
Timestamps unverifiable. Fragments incomplete.
Do not expect truth. Only remnants.`,
    ];

    const { displayedTexts } = useTypewriter(lines, 50, () => {
        setTypingDone(true);
    })

    const handleFinish = () => {
        setShow(false);
        setTimeout(() => {
            onFinish();
        }, 1000);
    };

    return (
        <div className={`entry-screen ${show ? 'fade-in' : 'fade-out'}`} >
            <div className="entry-text">
                <h1 className="entry-title">[ARCHIVE:0]</h1>
                {displayedTexts.map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
                {isTypingDone && (
                    <p className="entry-hint" onClick={handleFinish}>Click to access archive</p>
                )}
            </div>
        </div>
    );
}
