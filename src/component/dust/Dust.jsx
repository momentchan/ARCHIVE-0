import React, { useEffect } from 'react';
import { CustomShaderMaterial } from '../../r3f-gist/shader/CustomShaderMaterial';
import fragmentShader from './fragment.glsl';
import { folder, levaStore, useControls } from 'leva';
import * as THREE from 'three';

const Dust = ({ presets }) => {

    useEffect(() => {
        levaStore.set({
            'Dust Effect.base.color': presets.dustColor,
            'Dust Effect.noise.grainFreqUpper': presets.grainFreqUpper || 500,
            'Dust Effect.noise.grainFreqLower': presets.grainFreqLower || 300
        });
    }, [presets]);


    const controls = useControls('Dust Effect', {
        base: folder({
            stripeBase: { value: 0.05, min: 0, max: 1, step: 0.01 },
            color: { value: '#000000' },
            speed: { value: .2, min: 0, max: 1, step: 0.01 },
        }),

        waves: folder({
            waveStrength: { value: 0.7, min: 0, max: 1, step: 0.01 },
            waveFrequency: { value: 4, min: 1, max: 10, step: 0.1 },
            wavePower: { value: 2.0, min: 1, max: 5, step: 0.1 },
            stripeStrengthH: { value: 0.5, min: 0, max: 1, step: 0.01 },
            stripeStrengthV: { value: 0.27, min: 0, max: 1, step: 0.01 },
            stripeFreqH: { value: 300, min: 1, max: 400, step: 1 },
            stripeFreqV: { value: 400, min: 1, max: 400, step: 1 },
        }),
        noise: folder({
            fractalNoiseStrength: { value: 0.6, min: 0, max: 2, step: 0.01 },
            fractalNoiseFreq: { value: 1.2, min: 0, max: 10, step: 0.1 },
            noiseThresholdRange: { value: 0.35, min: 0, max: 1, step: 0.01 },
            grainFreqUpper: { value: 800, min: 100, max: 1000, step: 10 },
            grainFreqLower: { value: 500, min: 100, max: 1000, step: 10 },
            grainBlur: { value: 0.001, min: 0, max: 0.01, step: 0.001 },
        }),
        edge: folder({
            edgeSmoothnessTop: { value: 0.01, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessBottom: { value: 0.25, min: 0, max: 1, step: 0.01 },
        }),
    });

    const uniforms = {
        uStripeBase: controls.stripeBase,
        uWaveStrength: controls.waveStrength,
        uWaveFreq: controls.waveFrequency,
        uWavePower: controls.wavePower,
        uStripeStrength: new THREE.Vector2(controls.stripeStrengthH, controls.stripeStrengthV),
        uStripeFreq: new THREE.Vector2(controls.stripeFreqH, controls.stripeFreqV),
        uFractalNoiseStrength: controls.fractalNoiseStrength,
        uFractalNoiseFreq: controls.fractalNoiseFreq,
        uEdgeSmoothness: new THREE.Vector2(controls.edgeSmoothnessTop, controls.edgeSmoothnessBottom),
        uNoiseThresholdRange: controls.noiseThresholdRange,
        uColor: new THREE.Color(controls.color),
        uVerticalStripRange: controls.verticalStripRange,
        uGrainFreq: new THREE.Vector2(controls.grainFreqUpper, controls.grainFreqLower),
        uGrainBlur: controls.grainBlur,
        uSpeed: controls.speed,
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