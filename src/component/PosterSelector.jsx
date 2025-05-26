import { useState, useEffect, useRef } from 'react';
import '../PosterSelector.css';

const POSTERS = [
    { id: 'null', label: 'NULL', detail: '[static]' },
    { id: 'trace', label: 'TRACE', detail: '[REBUILD:2164.05.06]' },
    { id: 'residue', label: 'RESIDUE', detail: '[FRAGMENT:1973.11.03]' },
    { id: 'jam', label: 'JAM', detail: '[SIGX:2099.07.19]' },
    { id: 'fall', label: 'FALL', detail: '[SYSLOG:1987.03.14]' },
];

export default function PosterSelector({ current, onSelect }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

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
