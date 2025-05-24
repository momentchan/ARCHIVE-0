#include "../../r3f-gist/shader/cginc/noise/gradientNoise.glsl"
#include "../../r3f-gist/shader/cginc/noise/fractal.glsl"
#include "../../r3f-gist/shader/cginc/noise/random.glsl"
#include "../../r3f-gist/shader/cginc/utility.glsl"

precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform float uBase;
uniform vec2 uStripeStrength;
uniform vec2 uStripeFreq;
uniform vec2 uStripeSpeed;
uniform float uWaveFreq;
uniform float uWaveStrength;
uniform float uWavePower;
uniform vec2 uEdgeSmoothness;
uniform float uSeparation;
uniform vec2 uGrainFreq;
uniform vec3 uColor;
uniform float uGrainBlur;
uniform float uWaveSpeed;
uniform float uFractalNoiseStrength;
uniform float uFractalNoiseFreq;
uniform float uFractalSpeed;
uniform float uReseedChaos;

float calculateEdgeMask(vec2 uv, vec2 smoothness, float baseValue) {
    float verticalEdge = remap(smoothstep(0.0, smoothness.x, 1.0 - uv.y), vec2(0.0, 1.0), vec2(baseValue, 1.0));
    float fadeOut = smoothstep(0.0, smoothness.y, uv.y);
    return verticalEdge * fadeOut;
}

float calculateGradNoise(vec2 uv, float frequency, float speed, float power, float offset, float amplitude) {
    return (pow(gradientNoise01(uv * frequency + uTime * speed), power) + offset) * amplitude;
}

vec2 getGrainSeedOffset(float time, float chaos) {
    float t = floor(time);
    float r = fract(sin(t * 91.7) * 43758.5453);
    float shouldReseed = step(1.0 - chaos, r);
    float reseedIndex = floor(t * shouldReseed);
    float grainSeed = fract(sin(reseedIndex * 123.456) * 65432.1);
    return vec2(sin(grainSeed * 231.42), cos(grainSeed * 851.73)) * 10.0;
}

float calculateBlurredGrain(vec2 uv) {
    float grain = 0.0;
    float blurSize = uGrainBlur;

    vec2 seedOffset = getGrainSeedOffset(uTime, uReseedChaos);

    for(float x = -1.0; x <= 1.0; x++) {
        for(float y = -1.0; y <= 1.0; y++) {
            vec2 offset = vec2(x, y) * blurSize;
            vec2 grainUv = uv + offset + seedOffset;

            grain += mix(0.0, grainNoise(grainUv, uGrainFreq.y, vec2(0.0, 1.0)), smoothstep(uSeparation, 0.0, uv.y));
        }
    }

    return grain / 9.0;
}

void main() {
    // Edge mask
    float edgeMask = calculateEdgeMask(vUv, uEdgeSmoothness, uBase); 

    // Pattern layers
    float wave = calculateGradNoise(vec2(0.5, vUv.y), uWaveFreq, uWaveSpeed, uWavePower, .0, uWaveStrength);
    float vStripe = calculateGradNoise(vec2(vUv.x, 0.5), uStripeFreq.x, uStripeSpeed.x, 1., -0.5, uStripeStrength.x);
    float hStripe = calculateGradNoise(vec2(0.5, vUv.y), uStripeFreq.y, uStripeSpeed.y, 1., -.2, uStripeStrength.y);

    vec2 grainOffset = getGrainSeedOffset(uTime, uReseedChaos);
    float noise = grainNoise(vUv + grainOffset, uGrainFreq.x, vec2(0.0, 0.05));

    float fNoise = (fbm2(vUv * uFractalNoiseFreq, uTime * uFractalSpeed) - 0.0) * uFractalNoiseStrength; // Updated to use uFractalSpeed

    // Combine base pattern
    float basePattern = uBase + (hStripe + vStripe) * (wave + fNoise) + noise;
    basePattern *= edgeMask;

    // Add grain and finalize
    float grain = calculateBlurredGrain(vUv);
    float finalPattern = clamp(basePattern + grain, 0.0, 1.0);

    // Output
    vec3 finalColor = uColor * (1.0 - finalPattern);

    float alpha = (1.0 - finalPattern) * smoothstep(0.0, uEdgeSmoothness.y, vUv.y);
    gl_FragColor = vec4(finalColor, alpha);
}