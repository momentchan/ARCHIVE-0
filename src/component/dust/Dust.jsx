import React from 'react';
import { CustomShaderMaterial } from '../../r3f-gist/shader/CustomShaderMaterial';
import fragmentShader from './fragment.glsl';
import { folder, useControls } from 'leva';
import * as THREE from 'three';

const Dust = () => {
    const controls = useControls('Dust Effect', {
        base: folder({
            stripeBase: { value: 0.05, min: 0, max: 1, step: 0.01 },
            color: { value: '#000000' },
        }),
        waves: folder({
            bigWaveStrength: { value: 0.45, min: 0, max: 1, step: 0.01 },
            bigWaveFrequency: { value: 6, min: 1, max: 10, step: 0.1 },
            bigWavePower: { value: 2.0, min: 1, max: 5, step: 0.1 },
            stripeStrengthH: { value: 0.15, min: 0, max: 1, step: 0.01 },
            stripeStrengthV: { value: 0.27, min: 0, max: 1, step: 0.01 },
            stripeFreqH: { value: 300, min: 1, max: 400, step: 1 },
            stripeFreqV: { value: 400, min: 1, max: 400, step: 1 },
        }),
        noise: folder({
            globalNoiseStrength: { value: 0.6, min: 0, max: 2, step: 0.01 },
            globalNoiseFreq: { value: 3.6, min: 0, max: 10, step: 0.1 },
            noiseThresholdRange: { value: 0.35, min: 0, max: 1, step: 0.01 },
            grainFreq: { value: 500, min: 100, max: 1000, step: 10 },
            grainBlur: { value: 0.001, min: 0, max: 0.01, step: 0.001 },
        }),
        edge: folder({
            edgeSmoothnessTop: { value: 0.01, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessBottom: { value: 0.25, min: 0, max: 1, step: 0.01 },
        }),
    });

    const uniforms = {
        uStripeBase: controls.stripeBase,
        uBigWaveStrength: controls.bigWaveStrength,
        uBigWaveFreq: controls.bigWaveFrequency,
        uBigWavePower: controls.bigWavePower,
        uStripeStrength: new THREE.Vector2(controls.stripeStrengthH, controls.stripeStrengthV),
        uStripeFreq: new THREE.Vector2(controls.stripeFreqH, controls.stripeFreqV),
        uGlobalNoiseStrength: controls.globalNoiseStrength,
        uGlobalNoiseFreq: controls.globalNoiseFreq,
        uEdgeSmoothness: new THREE.Vector2(controls.edgeSmoothnessTop, controls.edgeSmoothnessBottom),
        uNoiseThresholdRange: controls.noiseThresholdRange,
        uColor: new THREE.Color(controls.color),
        uVerticalStripRange: controls.verticalStripRange,
        uGrainFreq: controls.grainFreq,
        uGrainBlur: controls.grainBlur,
    };

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <CustomShaderMaterial
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

export default Dust;