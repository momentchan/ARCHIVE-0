import React, { useState, useEffect } from 'react';
import { Center, Html, Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../data/fonts';
import { useThree } from '@react-three/fiber';

const Poster = ({ position, title = '', subtitle = '', description = '', children }) => {
    const [fontIndex, setFontIndex] = useState(0); // Single font index for both title and description
    const [currentFont, setCurrentFont] = useState(Object.keys(fontPaths)[0]); // Single font state
    const fontKeys = Object.keys(fontPaths);

    const controls = useControls('Poster Text', {
        shared: folder({
            textColor: { value: '#000000' },
            textAlpha: { value: 1, min: 0, max: 1, step: 0.01 },
        }),
        title: folder({
            titleText: { value: title },
            titleSize: { value: 0.2, min: 0.1, max: 1, step: 0.01 },
            titleSpacing: { value: 0.5, min: 0, max: 1, step: 0.01 },
        }),
        subtitle: folder({
            subtitleText: { value: subtitle },
            subtitleSize: { value: 0.1, min: 0.05, max: 0.5, step: 0.01 },
        }),
        description: folder({
            descriptionText: { value: description },
            descriptionSize: { value: 0.06, min: 0.02, max: 0.5, step: 0.01 },
        }),
    });

    const sharedTextProps = {
        materialTransparent: true,
        materialOpacity: controls.textAlpha,
        color: controls.textColor,
        font: fontPaths[currentFont],
        maxWidth: 2
    }

    const viewport = useThree((state) => state.viewport)

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
        <Center
            position={[0, 0.2, 0.1]}>
            <Text
                position={[0, -1.3, 0]}
                fontSize={controls.titleSize}
                anchorX="center"
                anchorY="middle"
                letterSpacing={controls.titleSpacing}
                {...sharedTextProps}
            >
                {controls.titleText}
            </Text>
            <Text
                position={[0, -1.5, 0]}
                fontSize={controls.subtitleSize}
                anchorX="center"
                anchorY="middle"
                {...sharedTextProps}
            >
                {controls.subtitleText}
            </Text>
            <Text
                position={[-1, -1.8, 0]}
                fontSize={controls.descriptionSize}
                textAlign='left'
                anchorX="left"
                anchorY="top"
                {...sharedTextProps}
            >
                {controls.descriptionText}
            </Text>
            {children}
        </Center>
    );
};

export default Poster;