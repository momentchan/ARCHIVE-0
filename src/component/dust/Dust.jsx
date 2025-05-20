import React from 'react';
import { CustomShaderMaterial } from '../../r3f-gist/shader/CustomShaderMaterial';
import fragmentShader from './fragment.glsl';
import { useControls } from 'leva';
import * as THREE from 'three';

const Dust = () => {
    const controls = useControls('Dust Effect', {
        stripeBase: {
            value: 0.1,
            min: 0,
            max: 1,
            step: 0.01,
        },
        bigWaveRange: {
            value: 0.25,
            min: 0,
            max: 1,
            step: 0.01,
        },
        bigWaveFrequency: {
            value: 2.5,
            min: 1,
            max: 5,
            step: 0.1,
        },
        stripeRange: {
            value: 0.15,
            min: 0,
            max: 1,
            step: 0.01,
        },
        globalNoiseScale: {
            value: 1.0,
            min: 0,
            max: 2,
            step: 0.01,
        },
        globalNoiseFreq: {
            value: 1.0,
            min: 0,
            max: 10,
            step: 0.1,
        },
        edgeSmoothness: {
            value: 0.01,
            min: 0,
            max: 1,
            step: 0.01,
        },
        noiseThresholdRange: {
            value: 0.2,
            min: 0,
            max: 1,
            step: 0.01,
        },
        color: {
            value: '#ffffff',
        },
    });

    const color = {
        r: parseInt(controls.color.slice(1, 3), 16) / 255,
        g: parseInt(controls.color.slice(3, 5), 16) / 255,
        b: parseInt(controls.color.slice(5, 7), 16) / 255,
    };

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <CustomShaderMaterial
                fragmentShader={fragmentShader}
                uniforms={{
                    uStripeBase: controls.stripeBase,
                    uBigWaveRange: controls.bigWaveRange,
                    uBigWaveFreq: controls.bigWaveFrequency,
                    uStripeRange: controls.stripeRange,
                    uGlobalNoiseScale: controls.globalNoiseScale,
                    uGlobalNoiseFreq: controls.globalNoiseFreq,
                    uEdgeSmoothness: controls.edgeSmoothness,
                    uNoiseThresholdRange: controls.noiseThresholdRange,
                    uColor: new THREE.Color(controls.color),
                }}
                transparent={true}
            />
        </mesh>
    );
};

export default Dust;