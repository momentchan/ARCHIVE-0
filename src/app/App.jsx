import { CameraControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Leva } from 'leva';
import Poster from "../component/Poster";
import Dust from "../component/dust/Dust";
import { posterData } from "../data/posterData";
import { customTheme } from "../r3f-gist/theme/levaTheme";
import Utilities from "../r3f-gist/utility/Utilities";
import GlobalStates from "../r3f-gist/utility/GlobalStates";
import useGlobalStore from "../r3f-gist/utility/useGlobalStore";
import PosterSelector from "../component/PosterSelector";

export default function App() {
    const [posterIndex, setPosterIndex] = useState(0);
    const { isMobile } = useGlobalStore();

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
            <GlobalStates />
            <PosterSelector
                current={currentPoster.title.toLowerCase()}  // 對應 POSTER 的 id（例如 'null'）
                onSelect={(id) => {
                    const index = posterData.findIndex(p => p.title.toLowerCase() === id);
                    if (index !== -1) {
                        setPosterIndex(index);
                    }
                }}
            />

            <Leva
                hidden
                flat
                theme={customTheme}
                titleBar={{ filter: false, title: 'Menu' }}
                collapsed={true} />

            <Canvas
                shadows
                orthographic
                camera={{
                    zoom: isMobile ? 100 : 150,
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
                <Utilities />
            </Canvas>
        </>
    );
}