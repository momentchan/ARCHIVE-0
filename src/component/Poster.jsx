import React, { useState, useEffect, useRef } from 'react';
import { Center, Text } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { fontPaths } from '../data/fonts';
import { levaStore } from 'leva';

const Poster = ({ title = '', subtitle = '', description = '', presets = {}, children }) => {
  const fontKeys = Object.keys(fontPaths);
  const [currentFont, setCurrentFont] = useState(presets.font || fontKeys[0]);
  const prevPresetFont = useRef(presets.font);

  // 🔧 Leva controls
  const controls = useControls('Poster Text', {
    shared: folder({
      textColor: { value: presets.color || '#000000' },
      textAlpha: { value: 1, min: 0, max: 1, step: 0.01 },
      font: {
        value: currentFont,
        options: fontKeys,
        onChange: (value) => setCurrentFont(value), // 🔁 sync font on Leva change
      }
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

  // ✅ Sync Leva when props (title/subtitle) change
  useEffect(() => {
    levaStore.set({
      'Poster Text.title.titleText': title,
      'Poster Text.subtitle.subtitleText': subtitle,
      'Poster Text.description.descriptionText': description,
      'Poster Text.shared.textColor': presets.color,
    //   'Poster Text.title.titleSize': presets.titleSize,
    //   'Poster Text.subtitle.subtitleSize': presets.subtitleSize,
    //   'Poster Text.description.descriptionSize': presets.descriptionSize,
    });
  }, [title, subtitle, description, presets]);

  // ✅ Sync font from presets (only when it changes)
  useEffect(() => {
    if (presets.font && presets.font !== prevPresetFont.current) {
      setCurrentFont(presets.font);
      levaStore.set({ 'Poster Text.shared.font': presets.font });
      prevPresetFont.current = presets.font;
    }
  }, [presets.font]);

  // ✅ Cycle font with Space key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        const nextIndex = (fontKeys.indexOf(currentFont) + 1) % fontKeys.length;
        const newFont = fontKeys[nextIndex];
        setCurrentFont(newFont);
        levaStore.set({ 'Poster Text.shared.font': newFont });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFont, fontKeys]);

  // 🧾 Shared Text Props
  const sharedTextProps = {
    materialTransparent: true,
    materialOpacity: controls.textAlpha,
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

     {typeof children === 'function' ? children({ presets }) : children}
    </Center>
  );
};

export default Poster;
