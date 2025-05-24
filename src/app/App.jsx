import { CameraControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Leva } from 'leva';
import Poster from "../component/Poster";
import Dust from "../component/dust/Dust";
import { posterData } from "../data/posterData";
import { customTheme } from "../r3f-gist/theme/levaTheme";

export default function App() {
    const [posterIndex, setPosterIndex] = useState(0);

    // Handle key press to cycle posters
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'KeyP') {
                setPosterIndex((prevIndex) => (prevIndex + 1) % posterData.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const currentPoster = posterData[posterIndex];

    return (
        <>
            <Leva
                flat
                theme={customTheme}
                titleBar={{ title: 'Setting', filter: false }}
            />

            <Canvas
                shadows
                orthographic
                camera={{
                    zoom: 150,
                    position: [0, 0, 1],
                    near: 0.1,
                }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <CameraControls
                    makeDefault
                    azimuthRotateSpeed={0}
                    polarRotateSpeed={0}
                    truckSpeed={0}
                />

                <Poster
                    title={currentPoster.title}
                    subtitle={currentPoster.subtitle}
                    description={currentPoster.description}
                    presets={currentPoster.presets}
                >
                    {({ presets }) => <Dust presets={presets} />}
                </Poster>
            </Canvas>
        </>
    );
}