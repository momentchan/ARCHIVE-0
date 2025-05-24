import React, { useEffect } from 'react';
import { CustomShaderMaterial } from '../../r3f-gist/shader/CustomShaderMaterial';
import fragmentShader from './fragment.glsl';
import { folder, levaStore, useControls } from 'leva';
import * as THREE from 'three';

const Dust = ({ presets }) => {
    const collapsed = true;

    // Extracted function to set Leva store values
    const setLevaStore = (presets) => {
        const levaValues = {
            'Effect.Basic.color': presets.dustColor || '#000000',
            'Effect.Basic.speed': presets.speed || 0.2,
            'Effect.Basic.base': presets.base || 0.05,
            'Effect.Stripe.waveStrength': presets.waveStrength || 0.7,
            'Effect.Stripe.waveFrequency': presets.waveFrequency || 4,
            'Effect.Stripe.wavePower': presets.wavePower || 2.0,
            'Effect.Stripe.hStripeStrength': presets.hStripeStrength || 0.5,
            'Effect.Stripe.vStripeStrength': presets.vStripeStrength || 0.27,
            'Effect.Stripe.hStripeFreq': presets.hStripeFreq || 300,
            'Effect.Stripe.vStripeFreq': presets.vStripeFreq || 400,
            'Effect.Fractal.fractalNoiseStrength': presets.fractalNoiseStrength || 0.6,
            'Effect.Fractal.fractalNoiseFreq': presets.fractalNoiseFreq || 1.2,
            'Effect.Fractal.separation': presets.separation || 0.35,
            'Effect.Grain.grainFreqUpper': presets.grainFreqUpper || 800,
            'Effect.Grain.grainFreqLower': presets.grainFreqLower || 500,
            'Effect.Grain.grainBlur': presets.grainBlur || 0.001,
            'Effect.Edge.edgeSmoothnessTop': presets.edgeSmoothnessTop || 0.01,
            'Effect.Edge.edgeSmoothnessBottom': presets.edgeSmoothnessBottom || 0.25,
        };
        levaStore.set(levaValues);
    };

    useEffect(() => {
        setLevaStore(presets);
    }, [presets]);

    const controls = useControls('Effect', {
        Basic: folder({
            color: { value: presets.dustColor || '#000000' },
            base: { value: presets.base || 0.05, min: 0, max: 1, step: 0.01 },
            speed: { value: presets.speed || 0.2, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),

        Stripe: folder({
            hStripeStrength: { value: presets.hStripeStrength || 0.5, min: 0, max: 1, step: 0.01 },
            vStripeStrength: { value: presets.vStripeStrength || 0.27, min: 0, max: 1, step: 0.01 },
            hStripeFreq: { value: presets.hStripeFreq || 300, min: 1, max: 400, step: 1 },
            vStripeFreq: { value: presets.vStripeFreq || 400, min: 1, max: 400, step: 1 },
            waveStrength: { value: presets.waveStrength || 0.7, min: 0, max: 1, step: 0.01 },
            waveFrequency: { value: presets.waveFrequency || 4, min: 1, max: 10, step: 0.1 },
            wavePower: { value: presets.wavePower || 2.0, min: 1, max: 5, step: 0.1 },
        }, { collapsed }),

        Fractal: folder({
            fractalNoiseStrength: { value: presets.fractalNoiseStrength || 0.6, min: 0, max: 2, step: 0.01 },
            fractalNoiseFreq: { value: presets.fractalNoiseFreq || 1.2, min: 0, max: 10, step: 0.1 },
        }, { collapsed }),

        Edge: folder({
            separation: { value: presets.separation || 0.35, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessTop: { value: presets.edgeSmoothnessTop || 0.01, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessBottom: { value: presets.edgeSmoothnessBottom || 0.25, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),

        Grain: folder({
            grainFreqUpper: { value: presets.grainFreqUpper || 800, min: 100, max: 1000, step: 10 },
            grainFreqLower: { value: presets.grainFreqLower || 500, min: 100, max: 1000, step: 10 },
            grainBlur: { value: presets.grainBlur || 0.001, min: 0, max: 0.01, step: 0.001 },
        }, { collapsed }),
    }, { collapsed });

    const uniforms = {
        uBase: controls.base,
        uStripeStrength: new THREE.Vector2(controls.hStripeStrength, controls.vStripeStrength),
        uStripeFreq: new THREE.Vector2(controls.hStripeFreq, controls.vStripeFreq),
        uWaveStrength: controls.waveStrength,
        uWaveFreq: controls.waveFrequency,
        uWavePower: controls.wavePower,
        uFractalNoiseStrength: controls.fractalNoiseStrength,
        uFractalNoiseFreq: controls.fractalNoiseFreq,
        uEdgeSmoothness: new THREE.Vector2(controls.edgeSmoothnessTop, controls.edgeSmoothnessBottom),
        uSeparation: controls.separation,
        uColor: new THREE.Color(controls.color),
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