import React, { useState, useEffect } from 'react';
import { Center, Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../data/fonts';
import { useThree } from '@react-three/fiber';
import { levaStore } from 'leva';

const Poster = ({ title = '', subtitle = '', description = '', presets = {}, children, useHtml = false }) => {
    const [fontIndex, setFontIndex] = useState(0);
    const [currentFont, setCurrentFont] = useState(presets.font || Object.keys(fontPaths)[0]);
    const fontKeys = Object.keys(fontPaths);

    useEffect(() => {
        levaStore.set({
            'Poster Text.title.titleText': title,
            'Poster Text.subtitle.subtitleText': subtitle,
            'Poster Text.description.descriptionText': description,
        });
    }, [title, subtitle, description, presets]);


    const controls = useControls('Poster Text', {
        shared: folder({
            textColor: { value: presets.color || '#000000' },
            textAlpha: { value: 1, min: 0, max: 1, step: 0.01 },
        }),
        title: folder({
            titleText: { value: title },
            titleSize: { value: presets.titleSize || 0.2, min: 0.1, max: 1, step: 0.01 },
            titleSpacing: { value: 0.5, min: 0, max: 1, step: 0.01 },
        }),
        subtitle: folder({
            subtitleText: { value: subtitle },
            subtitleSize: { value: presets.subtitleSize || 0.1, min: 0.05, max: 0.5, step: 0.01 },
        }),
        description: folder({
            descriptionText: { value: description },
            descriptionSize: { value: presets.descriptionSize || 0.06, min: 0.02, max: 0.5, step: 0.01 },
        }),
    });

    const sharedTextProps = {
        materialTransparent: true,
        materialOpacity: controls.textAlpha,
        color: controls.textColor,
        font: fontPaths[currentFont],
        maxWidth: 2
    }
    const viewport = useThree((state) => state.viewport);

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
        setCurrentFont(newFont);
    }, [fontIndex, fontKeys]);

    return (
        <Center
            position={[0, 0.2, 0.1]}>
            <Text
                position={[0, -1.35, 0]}
                fontSize={controls.titleSize}
                anchorX="center"
                anchorY="middle"
                letterSpacing={controls.titleSpacing}
                {...sharedTextProps}
            >
                {controls.titleText}
            </Text>

            <Center
                position={[0, -1.4, 0]}
                left>
                <Text
                    position={[0, 0, 0]}
                    fontSize={controls.subtitleSize}
                    anchorX="left"
                    anchorY="middle"
                    {...sharedTextProps}
                >
                    {controls.subtitleText}
                </Text>
                <Text
                    position={[0, -0.1, 0]}
                    fontSize={controls.descriptionSize}
                    textAlign='left'
                    anchorX="left"
                    anchorY="top"
                    {...sharedTextProps}
                >
                    {controls.descriptionText}
                </Text>
            </Center>
            {children}
        </Center>
    );
};

export default Poster;