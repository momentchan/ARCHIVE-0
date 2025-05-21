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

function TorusMesh() {
    const materialRef = useRef()

    const { alpha } = useControls('Torus Material', {
        alpha: {
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.01
        }
    })

    return (
        <mesh>
            <torusGeometry />
            <CustomShaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                uniforms={{
                    uAlpha: alpha,
                }}
                transparent={true}
                side={2} // Add this to make sure both sides are visible
            />
        </mesh>
    )
}

export default function App() {
    const { backgroundColor } = useControls('Background', {
        backgroundColor: '#dfe2df'
    })

    return <>
        <Canvas
            shadows
            orthographic
            camera={{
                zoom: 300,
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
                title="Hello World">
                <Dust />
            </Poster>

            {/* <TorusMesh /> */}
            <Utilities />
        </Canvas>
    </>
}