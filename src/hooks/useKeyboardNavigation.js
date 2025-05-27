import { useEffect } from 'react';

export const useKeyboardNavigation = (currentId, items, onSelect) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const currentIndex = items.findIndex(item => item.id === currentId);
            
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                const nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                onSelect(items[nextIndex].id);
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                onSelect(items[nextIndex].id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentId, items, onSelect]);
};
