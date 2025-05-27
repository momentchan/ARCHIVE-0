import { useState } from 'react';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { POSTERS } from './data/posters';

function App() {
    const [currentPosterId, setCurrentPosterId] = useState(POSTERS[0].id);

    const handleNavigate = (direction) => {
        const currentIndex = POSTERS.findIndex(poster => poster.id === currentPosterId);
        if (direction === 'prev' && currentIndex > 0) {
            setCurrentPosterId(POSTERS[currentIndex - 1].id);
        } else if (direction === 'next' && currentIndex < POSTERS.length - 1) {
            setCurrentPosterId(POSTERS[currentIndex + 1].id);
        }
    };

    useKeyboardNavigation(handleNavigate);

    return (
        <div>
            {/* Existing code for rendering posters and other components */}
        </div>
    );
}

export default App;