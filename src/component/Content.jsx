import React from 'react';
import { Text } from '@react-three/drei';

const Content = ({
    text = '',
    position = [0, 0, 0],
    fontSize = 0.2,
    color = '#ffffff',
    opacity = 1,
    letterSpacing = 0.5,
    font,
    anchorX = 'center',
    anchorY = 'middle'
}) => {
    return (
        <Text
            position={position}
            fontSize={fontSize}
            color={color}
            material-transparent={true}
            material-opacity={opacity}
            letterSpacing={letterSpacing}
            font={font}
            anchorX={anchorX}
            anchorY={anchorY}
        >
            {text}
        </Text>
    );
};

export default Content;
