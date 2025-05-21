import React from 'react';
import { Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../config/fonts';

const Poster = ({ title = '', description = '', children }) => {
    const controls = useControls('Poster Text', {
        title: folder({
            titleText: { value: title },
            titleFont: {
                value: 'NotoSansJP-Regular',
                options: Object.keys(fontPaths)
            },
            titleColor: { value: '#ffffff' },
            titleAlpha: { value: 0.5, min: 0, max: 1, step: 0.01 },
            titleSize: { value: 0.2, min: 0.1, max: 1, step: 0.01 },
        }),
        description: folder({
            descriptionText: { value: description },
            descriptionFont: {
                value: 'NotoSansJP-Regular',
                options: Object.keys(fontPaths)
            },
            descriptionColor: { value: '#ffffff' },
            descriptionAlpha: { value: 1, min: 0, max: 1, step: 0.01 },
            descriptionSize: { value: 0.1, min: 0.05, max: 0.5, step: 0.01 },
        }),
    });

    return (
        <group>
            {controls.titleText && (
                <Text
                    position={[0, 0, 0.1]}
                    fontSize={controls.titleSize}
                    anchorX="center"
                    anchorY="middle"
                    material-transparent={true}
                    material-opacity={controls.titleAlpha}
                    color={controls.titleColor}
                    font={fontPaths[controls.titleFont]}
                >
                    {controls.titleText}
                </Text>
            )}
            {controls.descriptionText && (
                <Text
                    position={[0, 0, 0.1]}
                    fontSize={controls.descriptionSize}
                    anchorX="center"
                    anchorY="middle"
                    material-transparent={true}
                    material-opacity={controls.descriptionAlpha}
                    color={controls.descriptionColor}
                    font={fontPaths[controls.descriptionFont]}
                >
                    {controls.descriptionText}
                </Text>
            )}
            {children}
        </group>
    );
};

export default Poster;