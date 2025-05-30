import React, { useEffect, useState } from 'react';
import { CustomShaderMaterial } from '../../r3f-gist/shader/CustomShaderMaterial';
import fragmentShader from './fragment.glsl';
import { folder, levaStore, useControls } from 'leva';
import * as THREE from 'three';

const Dust = ({ presets = {}, animAlpha }) => { // Ensure presets has a default value
    
    const collapsed = true;

    const controls = useControls('Effect', {
        Basic: folder({
            color: { value: presets.dustColor || '#000000' },
            base: { value: presets.base || 0.05, min: -1, max: 1, step: 0.01 },
        }, { collapsed }),

        Stripe: folder({
            stripeStrength: { value: presets.stripeStrength || { x: 0.27, y: 0.5 }, step: 0.01 },
            stripeFreq: { value: presets.stripeFreq || { x: 400, y: 300 }, step: 1 },
            stripeSpeed: { value: presets.stripeSpeed || { x: 0, y: 0 }, step: 0.01 },
        }, { collapsed }),

        Wave: folder({
            waveStrength: { value: presets.waveStrength || 0.7, min: 0, max: 5, step: 0.01 },
            waveFrequency: { value: presets.waveFrequency || 4, min: 1, max: 10, step: 0.1 },
            wavePower: { value: presets.wavePower || 2.0, min: 1, max: 10, step: 0.1 },
            waveSpeed: { value: presets.waveSpeed || 0.2, min: -1, max: 1, step: 0.01 },
        }, { collapsed }),

        Fractal: folder({
            fractalNoiseStrength: { value: presets.fractalNoiseStrength || 0.6, min: 0, max: 2, step: 0.01 },
            fractalNoiseFreq: { value: presets.fractalNoiseFreq || 1.2, min: 0, max: 10, step: 0.1 },
            fractalSpeed: { value: presets.fractalSpeed || 0.2, min: 0, max: 5, step: 0.01 }, // Added fractalSpeed control
        }, { collapsed }),

        Edge: folder({
            separation: { value: presets.separation || 0.35, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessTop: { value: presets.edgeSmoothnessTop || 0.01, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessBottom: { value: presets.edgeSmoothnessBottom || 0.25, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),

        Grain: folder({
            grainFreqUpper: { value: presets.grainFreqUpper || 800, min: 0, max: 1000, step: 10 },
            grainFreqLower: { value: presets.grainFreqLower || 500, min: 0, max: 1000, step: 10 },
            grainBlur: { value: presets.grainBlur || 0, min: 0, max: 0.01, step: 0.001 },
            reseedChaos: { value: presets.reseedChaos || 0.0, min: 0, max: 1, step: 0.01 },
        }, { collapsed }),

    }, { collapsed });

    useEffect(() => {
        levaStore.set({
            'Effect.Basic.color': presets.dustColor || '#000000',
            'Effect.Basic.base': presets.base || 0.05,
            'Effect.Wave.waveStrength': presets.waveStrength || 0.7,
            'Effect.Wave.waveFrequency': presets.waveFrequency || 4,
            'Effect.Wave.wavePower': presets.wavePower || 2.0,
            'Effect.Wave.waveSpeed': presets.waveSpeed || 0.2,
            'Effect.Stripe.stripeStrength': presets.stripeStrength || { x: 0.27, y: 0.5 },
            'Effect.Stripe.stripeFreq': presets.stripeFreq || { x: 400, y: 300 },
            'Effect.Stripe.stripeSpeed': presets.stripeSpeed || { x: 0, y: 0 },
            'Effect.Fractal.fractalNoiseStrength': presets.fractalNoiseStrength || 0.6,
            'Effect.Fractal.fractalNoiseFreq': presets.fractalNoiseFreq || 1.2,
            'Effect.Fractal.fractalSpeed': presets.fractalSpeed || 0.0, 
            'Effect.Grain.grainFreqUpper': presets.grainFreqUpper || 800,
            'Effect.Grain.grainFreqLower': presets.grainFreqLower || 500,
            'Effect.Grain.grainBlur': presets.grainBlur || 0.0,
            'Effect.Grain.reseedChaos': presets.reseedChaos || 0.0,
            'Effect.Edge.separation': presets.separation || 0.35,
            'Effect.Edge.edgeSmoothnessTop': presets.edgeSmoothnessTop || 0.0,
            'Effect.Edge.edgeSmoothnessBottom': presets.edgeSmoothnessBottom || 0.25,
        });
    }, [presets]);

    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load('/image.png', (loadedTexture) => {
            setTexture(loadedTexture);
        });
    }, []);

    const uniforms = {
        uBase: controls.base,
        uStripeStrength: new THREE.Vector2(controls.stripeStrength.x, controls.stripeStrength.y),
        uStripeFreq: new THREE.Vector2(controls.stripeFreq.x, controls.stripeFreq.y),
        uWaveStrength: controls.waveStrength,
        uWaveFreq: controls.waveFrequency,
        uWavePower: controls.wavePower,
        uFractalNoiseStrength: controls.fractalNoiseStrength,
        uFractalNoiseFreq: controls.fractalNoiseFreq,
        uFractalSpeed: controls.fractalSpeed,
        uEdgeSmoothness: new THREE.Vector2(controls.edgeSmoothnessTop, controls.edgeSmoothnessBottom),
        uSeparation: controls.separation,
        uColor: new THREE.Color(controls.color),
        uGrainFreq: new THREE.Vector2(controls.grainFreqUpper, controls.grainFreqLower),
        uGrainBlur: controls.grainBlur,
        uWaveSpeed: controls.waveSpeed,
        uStripeSpeed: new THREE.Vector2(controls.stripeSpeed.x, controls.stripeSpeed.y),
        uReseedChaos: controls.reseedChaos,
        uAlpha: animAlpha,
        uTexture: texture, // Add uTexture uniform
    };

    return (
        <mesh frustumCulled={false}>
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