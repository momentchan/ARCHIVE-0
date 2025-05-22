import { CameraControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import Utilities from "../r3f-gist/utility/Utilities";
import { CustomShaderMaterial } from "../r3f-gist/shader/CustomShaderMaterial";
import fragmentShader from "../shader/test/fragment.glsl";
import { useControls } from 'leva'
import { EffectComposer } from "@react-three/postprocessing";
import SampleEffect from "../r3f-gist/effect/SampleEffect";
import Dust from "../component/dust/Dust";
import Poster from "../component/Poster";
import CustomOverlay from "../component/overlay/CustomOverlay";
import { posterData } from "../data/posterData";

export default function App() {
    const { backgroundColor } = useControls('Background', {
        backgroundColor: '#dfe2df'
    });

    const currentPoster = posterData[1]; // Select the first poster data

    return <>
        <Canvas
            shadows
            orthographic
            camera={{
                zoom: 200,
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
                // truck={0}
                />

            <Poster
                position={[0, 0.5, 0]}
                title={currentPoster.title}
                description={currentPoster.description}
            >
                <Dust />
            </Poster>

            {/* <EffectComposer>
                <CustomOverlay/>
            </EffectComposer> */}

            <Utilities />
        </Canvas>
    </>
}