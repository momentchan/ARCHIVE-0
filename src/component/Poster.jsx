import { useState, useEffect, useRef } from 'react';
import { Center, Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../data/fonts';
import { levaStore } from 'leva';
import { useThree } from '@react-three/fiber';

const Poster = ({ title = '', subtitle = '', description = '', presets = {}, children }) => {
    const collapsed = false;
    const fontKeys = Object.keys(fontPaths);
    const [currentTitleFont, setCurrentTitleFont] = useState(presets.titleFont || fontKeys[0]); // Separate font for title
    const [currentSubtitleFont, setCurrentSubtitleFont] = useState(presets.subtitleFont || fontKeys[0]); // Separate font for subtitle
    const [currentDescriptionFont, setCurrentDescriptionFont] = useState(presets.descriptionFont || fontKeys[0]); // Separate font for description
    const prevPresetFont = useRef(presets.font);
    const { gl } = useThree();

    const { backgroundColor } = useControls('Background', {
        backgroundColor: presets.backgroundColor || '#dfe2df',
    }, { collapsed: true });

    const controls = useControls('Text', {
        Title: folder({
            titleText: { value: title },
            titleSize: { value: presets.titleSize || 0.2, min: 0.1, max: 1, step: 0.01 },
            titleSpacing: { value: presets.titleSpacing || 0.5, min: 0, max: 2, step: 0.01 },
            titleColor: { value: presets.titleColor || '#ffffff' },
            titleFont: {
                value: currentTitleFont,
                options: fontKeys,
                onChange: (value) => setCurrentTitleFont(value), // Separate font control for title
            },
        }, { collapsed }),
        Subtitle: folder({
            subtitleText: { value: subtitle },
            subtitleSize: { value: presets.subtitleSize || 0.1, min: 0.05, max: 0.5, step: 0.01 },
            subtitleSpacing: { value: presets.subtitleSpacing || 0, min: 0, max: 1, step: 0.01 },
            subtitleColor: { value: presets.subtitleColor || '#cccccc' },
            subtitleFont: {
                value: currentSubtitleFont,
                options: fontKeys,
                onChange: (value) => setCurrentSubtitleFont(value), // Separate font control for subtitle
            },
        }, { collapsed }),
        Description: folder({
            descriptionText: { value: description },
            descriptionSize: { value: presets.descriptionSize || 0.06, min: 0.02, max: 0.5, step: 0.01 },
            descriptionSpacing: { value: presets.descriptionSpacing || 0, min: 0, max: 1, step: 0.01 },
            descriptionColor: { value: presets.descriptionColor || '#aaaaaa' },
            descriptionFont: {
                value: currentDescriptionFont,
                options: fontKeys,
                onChange: (value) => setCurrentDescriptionFont(value), // Separate font control for description
            },
        }, { collapsed }),
    }, { collapsed });

    // Sync Leva when props or presets change
    useEffect(() => {
        levaStore.set({
            'Background.backgroundColor': presets.backgroundColor || '#dfe2df',

            'Text.Title.titleText': title,
            'Text.Title.titleSize': presets.titleSize || 0.2,
            'Text.Title.titleSpacing': presets.titleSpacing || 0.5,
            'Text.Title.titleColor': presets.titleColor || '#ffffff',
            'Text.Title.titleFont': presets.titleFont || fontKeys[0], // Added titleFont

            'Text.Subtitle.subtitleText': subtitle,
            'Text.Subtitle.subtitleSize': presets.subtitleSize || 0.1,
            'Text.Subtitle.subtitleSpacing': presets.subtitleSpacing || 0,
            'Text.Subtitle.subtitleColor': presets.subtitleColor || '#cccccc',
            'Text.Subtitle.subtitleFont': presets.subtitleFont || fontKeys[0], // Added subtitleFont

            'Text.Description.descriptionText': description,
            'Text.Description.descriptionSize': presets.descriptionSize || 0.06,
            'Text.Description.descriptionSpacing': presets.descriptionSpacing || 0,
            'Text.Description.descriptionColor': presets.descriptionColor || '#aaaaaa',
            'Text.Description.descriptionFont': presets.descriptionFont || fontKeys[0], // Added descriptionFont
        });
    }, [title, subtitle, description, presets]);


    useEffect(() => {
        gl.setClearColor(backgroundColor);
    }, [backgroundColor]);

    // Shared Text Props
    const sharedTextProps = {
        'material-transparent': true,
        'material-opacity': controls.textAlpha,
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
                color={controls.titleColor}
                font={fontPaths[currentTitleFont]} // Applied titleFont
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
                    color={controls.subtitleColor}
                    font={fontPaths[currentSubtitleFont]} // Applied subtitleFont
                    {...sharedTextProps}
                >
                    {controls.subtitleText}
                </Text>
                <Text
                    position={[0, -0.15, 0]}
                    fontSize={controls.descriptionSize}
                    textAlign="left"
                    anchorX="left"
                    anchorY="top"
                    letterSpacing={controls.descriptionSpacing}
                    lineHeight={2}
                    color={controls.descriptionColor}
                    font={fontPaths[currentDescriptionFont]} // Applied descriptionFont
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
