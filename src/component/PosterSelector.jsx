import { useState, useEffect, useRef } from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import '../PosterSelector.css';

const POSTERS = [
    { id: 'null', label: 'NULL', detail: '' },
    { id: 'trace', label: 'TRACE', detail: '' },
    { id: 'residue', label: 'RESIDUE', detail: '' },
    { id: 'jam', label: 'JAM', detail: '' },
    { id: 'fall', label: 'FALL', detail: '' },
];

export default function PosterSelector({ current, onSelect }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useKeyboardNavigation(current, POSTERS, onSelect);

    useEffect(() => {
        if (window.innerWidth < 768) setOpen(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={`poster-selector ${open ? 'open' : 'closed'}`}>
            <button
                className="selector-header-btn"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span className="title">RECOVERY — ARCHIVE:0</span>
                <span className="caret">{open ? '▾' : '▸'}</span>
            </button>

            <div className="selector-entries-wrapper">
                <div className="selector-entries">
                    {POSTERS.map(({ id, label, detail }) => (
                        <div
                            key={id}
                            className={`entry ${current === id ? 'active' : ''}`}
                            onClick={() => onSelect(id)}
                        >
                            <span className="arrow">→</span>
                            <span className="label">{label}</span>
                            <span className="detail">{detail}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
