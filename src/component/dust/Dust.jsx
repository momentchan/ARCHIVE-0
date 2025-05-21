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
            bigWaveRange: { value: 0.25, min: 0, max: 1, step: 0.01 },
            bigWaveFrequency: { value: 2.5, min: 1, max: 10, step: 0.1 },
            stripeRangeH: { value: 0.15, min: 0, max: 1, step: 0.01 },
            stripeRangeV: { value: 0.27, min: 0, max: 1, step: 0.01 },
            stripeFreqH: { value: 300, min: 1, max: 400, step: 1 },
            stripeFreqV: { value: 400, min: 1, max: 400, step: 1 },
        }),
        noise: folder({
            globalNoiseScale: { value: 0.6, min: 0, max: 2, step: 0.01 },
            globalNoiseFreq: { value: 3.6, min: 0, max: 10, step: 0.1 },
            noiseThresholdRange: { value: 0.35, min: 0, max: 1, step: 0.01 },
        }),
        edge: folder({
            edgeSmoothnessTop: { value: 0.01, min: 0, max: 1, step: 0.01 },
            edgeSmoothnessBottom: { value: 0.25, min: 0, max: 1, step: 0.01 },
        }),
    });

    const uniforms = {
        uStripeBase: controls.stripeBase,
        uBigWaveRange: controls.bigWaveRange,
        uBigWaveFreq: controls.bigWaveFrequency,
        uStripeRange: new THREE.Vector2(controls.stripeRangeH, controls.stripeRangeV),
        uStripeFreq: new THREE.Vector2(controls.stripeFreqH, controls.stripeFreqV),
        uGlobalNoiseScale: controls.globalNoiseScale,
        uGlobalNoiseFreq: controls.globalNoiseFreq,
        uEdgeSmoothness: new THREE.Vector2(controls.edgeSmoothnessTop, controls.edgeSmoothnessBottom),
        uNoiseThresholdRange: controls.noiseThresholdRange,
        uColor: new THREE.Color(controls.color),
        uVerticalStripRange: controls.verticalStripRange,
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