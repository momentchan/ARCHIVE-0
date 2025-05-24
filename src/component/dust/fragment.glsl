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
uniform float uWaveFreq;
uniform float uWaveStrength;
uniform float uWavePower;
uniform vec2 uEdgeSmoothness;
uniform float uSeparation; 
uniform vec2 uGrainFreq;
uniform vec3 uColor;
uniform float uGrainBlur;
uniform float uSpeed;
uniform float uFractalNoiseStrength;
uniform float uFractalNoiseFreq;

float calculateEdgeMask(vec2 uv, vec2 smoothness, float baseValue) {
    float verticalEdge = remap(smoothstep(0.0, smoothness.x, 1.0 - uv.y), vec2(0.0, 1.0), vec2(baseValue, 1.0));
    float fadeOut = smoothstep(0.0, smoothness.y, uv.y);
    return verticalEdge * fadeOut;
}

float calculateGradNoise(vec2 uv, float frequency, float speed, float power, float offset, float amplitude) {
    return (pow(gradientNoise01(uv * frequency + uTime * speed), power) + offset) * amplitude;
}

float calculateBlurredGrain(vec2 uv) {
    float grain = 0.0;
    float blurSize = uGrainBlur;

    // 3x3 blur kernel
    for(float x = -1.0; x <= 1.0; x++) {
        for(float y = -1.0; y <= 1.0; y++) {
            vec2 offset = vec2(x, y) * blurSize;
            grain += mix(0.0, grainNoise(uv + offset, uGrainFreq.y, vec2(.0, 1.)), smoothstep(uSeparation, 0.0, uv.y)); // Updated to use uSeparation
        }
    }
    return grain / 9.0;
}

void main() {
    // Edge mask
    float edgeMask = calculateEdgeMask(vUv, uEdgeSmoothness, uBase); 

    // Pattern layers
    float wave = calculateGradNoise(vec2(0.5, vUv.y), uWaveFreq, uSpeed, uWavePower, .0, uWaveStrength);
    float hStripe = calculateGradNoise(vec2(0.5, vUv.y), uStripeFreq.x, .0, 1., -.2, uStripeStrength.x);
    float vStripe = calculateGradNoise(vec2(vUv.x, 0.5), uStripeFreq.y, .0, 1., - 0.5, uStripeStrength.y);
    float noise = grainNoise(vUv, uGrainFreq.x, vec2(0.0, 0.05));
    float fNoise = (fbm2(vUv * uFractalNoiseFreq, uTime * uSpeed) - 0.0) * uFractalNoiseStrength;

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