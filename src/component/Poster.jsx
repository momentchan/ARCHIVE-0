import React, { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../data/fonts';

const Poster = ({ position, title = '', description = '', children }) => {
    const [fontIndex, setFontIndex] = useState(0); // Single font index for both title and description
    const [currentFont, setCurrentFont] = useState(Object.keys(fontPaths)[0]); // Single font state
    const fontKeys = Object.keys(fontPaths);

    const controls = useControls('Poster Text', {
        title: folder({
            titleText: { value: title },
            titleSize: { value: 0.2, min: 0.1, max: 1, step: 0.01 },
            titleSpacing: { value: 0.5, min: 0, max: 1, step: 0.01 },
        }),
        description: folder({
            descriptionText: { value: description },
            descriptionSize: { value: 0.07, min: 0.05, max: 0.5, step: 0.01 },
        }),
        shared: folder({
            textColor: { value: '#000000' },
            textAlpha: { value: 1, min: 0, max: 1, step: 0.01 },
        }),
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                setFontIndex((prevIndex) => (prevIndex + 1) % fontKeys.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [fontKeys]);

    useEffect(() => {
        const newFont = fontKeys[fontIndex];
        setCurrentFont(newFont); // Update the font state for both title and description
    }, [fontIndex, fontKeys]);

    return (
        <group position={position}>
            {controls.titleText && (
                <Text
                    position={[0, -1.2, 0.1]}
                    fontSize={controls.titleSize}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={controls.titleSpacing}
                    material-transparent={true}
                    material-opacity={controls.textAlpha}
                    color={controls.textColor} // Use the same color for title
                    font={fontPaths[currentFont]}
                >
                    {controls.titleText}
                </Text>
            )}
            {controls.descriptionText && (
                <Text
                    position={[0, -1.7, 0.1]}
                    fontSize={controls.descriptionSize}
                    anchorX="center"
                    anchorY="middle"
                    material-transparent={true}
                    material-opacity={controls.textAlpha}
                    color={controls.textColor} // Use the same color for description
                    font={fontPaths[currentFont]}
                >
                    {controls.descriptionText}
                </Text>
            )}
            {children}
        </group>
    );
};

export default Poster;