import { useState, useEffect, useRef } from 'react';
import { Center, Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../data/fonts';
import { levaStore } from 'leva';
import { useThree } from '@react-three/fiber';

const Poster = ({ title = '', subtitle = '', description = '', presets = {}, children }) => {
    const collapsed = true;
    const fontKeys = Object.keys(fontPaths);
    const [currentFont, setCurrentFont] = useState(presets.font || fontKeys[0]);
    const prevPresetFont = useRef(presets.font);
    const { gl } = useThree();

    const { backgroundColor } = useControls('Background', {
        backgroundColor: presets.backgroundColor || '#dfe2df',
    }, { collapsed: true });

    const controls = useControls('Text', {
        Basic: folder({
            textColor: { value: presets.textColor || '#000000' },
            textAlpha: { value: presets.textAlpha || 1, min: 0, max: 1, step: 0.01 },
            font: {
                value: currentFont,
                options: fontKeys,
                onChange: (value) => setCurrentFont(value),
            },
        }, { collapsed }),
        Title: folder({
            titleText: { value: title },
            titleSize: { value: presets.titleSize || 0.2, min: 0.1, max: 1, step: 0.01 },
            titleSpacing: { value: presets.titleSpacing || 0.5, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),
        Subtitle: folder({
            subtitleText: { value: subtitle },
            subtitleSize: { value: presets.subtitleSize || 0.1, min: 0.05, max: 0.5, step: 0.01 },
            subtitleSpacing: { value: presets.subtitleSpacing || 0, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),
        Description: folder({
            descriptionText: { value: description },
            descriptionSize: { value: presets.descriptionSize || 0.06, min: 0.02, max: 0.5, step: 0.01 },
            descriptionSpacing: { value: presets.descriptionSpacing || 0, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),
    }, { collapsed });

    // Sync Leva when props or presets change
    useEffect(() => {
        levaStore.set({
            'Background.backgroundColor': presets.backgroundColor || '#dfe2df',

            'Text.Basic.textColor': presets.textColor || '#000000',
            'Text.Basic.textAlpha': presets.textAlpha,

            'Text.Title.titleText': title,
            'Text.Title.titleSize': presets.titleSize || 0.2,
            'Text.Title.titleSpacing': presets.titleSpacing || 0.5,

            'Text.Subtitle.subtitleText': subtitle,
            'Text.Subtitle.subtitleSize': presets.subtitleSize || 0.1,
            'Text.Subtitle.subtitleSpacing': presets.subtitleSpacing || 0,

            'Text.Description.descriptionText': description,
            'Text.Description.descriptionSize': presets.descriptionSize || 0.06,
            'Text.Description.descriptionSpacing': presets.descriptionSpacing || 0,
        });
    }, [title, subtitle, description, presets]);


    useEffect(() => {
        gl.setClearColor(backgroundColor);
    }, [backgroundColor]);

    // Sync font from presets
    useEffect(() => {
        if (presets.font && presets.font !== prevPresetFont.current) {
            setCurrentFont(presets.font);
            levaStore.set({ 'Text.Basic.font': presets.font });
            prevPresetFont.current = presets.font;
        }
    }, [presets.font]);

    // Cycle font with Space key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                const nextIndex = (fontKeys.indexOf(currentFont) + 1) % fontKeys.length;
                const newFont = fontKeys[nextIndex];
                setCurrentFont(newFont);
                levaStore.set({ 'Text.Basic.font': newFont });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentFont, fontKeys]);

    // Shared Text Props
    const sharedTextProps = {
        'material-transparent': true,
        'material-opacity': controls.textAlpha,
        color: controls.textColor,
        font: fontPaths[currentFont],
        maxWidth: 2,
    };

    return (
        <Center position={[0, 0.2, 0.1]}>
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

            <Center position={[0, -1.4, 0]} left>
                <Text
                    position={[0, 0, 0]}
                    fontSize={controls.subtitleSize}
                    anchorX="left"
                    anchorY="middle"
                    letterSpacing={controls.subtitleSpacing}
                    {...sharedTextProps}
                >
                    {controls.subtitleText}
                </Text>
                <Text
                    position={[0, -0.1, 0]}
                    fontSize={controls.descriptionSize}
                    textAlign="left"
                    anchorX="left"
                    anchorY="top"
                    letterSpacing={controls.descriptionSpacing}
                    {...sharedTextProps}
                >
                    {controls.descriptionText}
                </Text>
            </Center>

            {typeof children === 'function' ? children({ presets }) : children}
        </Center>
    );
};

export default Poster;
