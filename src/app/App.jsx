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
    const currentPoster = posterData[posterIndex];


    //🔹 Swipe handling
    useEffect(() => {
        let touchStartX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX < 0) {
                    // Swipe left → next
                    setPosterIndex((i) => (i + 1) % posterData.length);
                } else {
                    // Swipe right → previous
                    setPosterIndex((i) =>
                        (i - 1 + posterData.length) % posterData.length
                    );
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const handlePosterSelect = (id) => {
        const index = posterData.findIndex(p => p.title.toLowerCase() === id);
        if (index !== -1) setPosterIndex(index);
    };

    return (
        <>
            <>
                <GlobalStates />

                {isMobile ? (
                    <div className="swipe-hint glitch">← SWIPE →</div>
                ) : (
                    <PosterSelector
                        current={currentPoster.title.toLowerCase()}
                        onSelect={handlePosterSelect}
                    />
                )}

                <Leva
                    hidden={isMobile}
                    flat
                    theme={customTheme}
                    titleBar={{ filter: false, title: 'Setting' }}
                    collapsed={true}
                />
                <Canvas
                    orthographic
                    camera={{
                        zoom: isMobile ? 120 : 150,
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
                        {({ presets, animAlpha }) => <Dust presets={presets} animAlpha={animAlpha} />}
                    </Poster>
                    {/* <Utilities /> */}
                </Canvas>
            </>
        </>
    );
}