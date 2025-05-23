import { CameraControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import Utilities from "../r3f-gist/utility/Utilities";
import { CustomShaderMaterial } from "../r3f-gist/shader/CustomShaderMaterial";
import fragmentShader from "../shader/test/fragment.glsl";
import { Leva, useControls } from 'leva'
import { EffectComposer } from "@react-three/postprocessing";
import SampleEffect from "../r3f-gist/effect/SampleEffect";
import Dust from "../component/dust/Dust";
import Poster from "../component/Poster";
import CustomOverlay from "../component/overlay/CustomOverlay";
import { posterData } from "../data/posterData";
import { customTheme, defaultTheme } from "../r3f-gist/theme/levaTheme";

export default function App() {
    const { backgroundColor } = useControls('Background', {
        backgroundColor: '#dfe2df'
    });

    const [posterIndex, setPosterIndex] = useState(0); // Track the current poster index

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

    return <>
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
            <color attach="background" args={[backgroundColor]} />

            <CameraControls
                makeDefault
                azimuthRotateSpeed={0}
                polarRotateSpeed={0}
                truckSpeed={0}
            />
            <Poster
                title={posterData[posterIndex].title}
                subtitle={posterData[posterIndex].subtitle}
                description={posterData[posterIndex].description}
                presets={posterData[posterIndex].presets}
            >
                {({ presets }) => <Dust presets={presets} />}
            </Poster>

            {/* <EffectComposer>
                <CustomOverlay/>
            </EffectComposer> */}

            <Utilities />
        </Canvas>
    </>
}