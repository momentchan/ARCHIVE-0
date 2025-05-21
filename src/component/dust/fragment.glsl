#include "../../r3f-gist/shader/cginc/noise/gradientNoise.glsl"
#include "../../r3f-gist/shader/cginc/noise/random.glsl"
#include "../../r3f-gist/shader/cginc/utility.glsl"

precision mediump float;

varying vec2 vUv;
uniform float uTime;
uniform float uStripeBase;
uniform vec2 uStripeStrength;
uniform vec2 uStripeFreq;
uniform float uBigWaveFreq;
uniform float uBigWaveStrength;
uniform float uBigWavePower;
uniform float uGlobalNoiseStrength;
uniform float uGlobalNoiseFreq;
uniform vec2 uEdgeSmoothness;
uniform float uNoiseThresholdRange;
uniform float uGrainFreq;
uniform vec3 uColor;
uniform float uGrainBlur;

float calculateEdgeMask(vec2 uv, vec2 smoothness, float baseValue) {
    float verticalEdge = remap(
        smoothstep(0.0, smoothness.x, 1.0 - uv.y), 
        vec2(0.0, 1.0), 
        vec2(baseValue, 1.0)
    );
    float fadeOut = smoothstep(0.0, smoothness.y, uv.y);
    return verticalEdge * fadeOut;
}

float calculateWavePattern(vec2 uv, float frequency, float amplitude) {
    return pow(gradientNoise(vec2(0.5, uv.y), frequency), uBigWavePower) * amplitude;
}

float calculateGrainNoise(vec2 uv) {
    float baseNoise = random(floor(uv * uGrainFreq));
    float noiseThreshold = smoothstep(uNoiseThresholdRange, 0.0, uv.y);
    return mix(0.0, baseNoise, noiseThreshold);
}

float calculateStripe(vec2 uv, float frequency, float offset, float amplitude) {
    return (gradientNoise(uv, frequency) - offset) * amplitude;
}

float calculateGlobalNoise(vec2 uv, float frequency, float amplitude) {
    return (gradientNoise(uv, frequency) - 0.5) * amplitude;
}

float calculateRandomNoise(vec2 uv, float scale) {
    return remap(random(floor(uv * scale)), vec2(0.0, 1.0), vec2(0.0, 0.05));
}

float calculateBlurredGrain(vec2 uv) {
    float grain = 0.0;
    float blurSize = uGrainBlur;
    
    // 3x3 blur kernel
    for(float x = -1.0; x <= 1.0; x++) {
        for(float y = -1.0; y <= 1.0; y++) {
            vec2 offset = vec2(x, y) * blurSize;
            grain += calculateGrainNoise(uv + offset);
        }
    }
    return grain / 9.0;
}

void main() {
    // Edge mask
    float edgeMask = calculateEdgeMask(vUv, uEdgeSmoothness, uStripeBase);
    
    // Pattern layers
    float wave = calculateWavePattern(vUv, uBigWaveFreq, uBigWaveStrength);
    float hStripe = calculateStripe(vec2(0.5, vUv.y), uStripeFreq.x, 0.2, uStripeStrength.x);
    float vStripe = calculateStripe(vec2(vUv.x, 0.5), uStripeFreq.y, 0.5, uStripeStrength.y) * calculateGlobalNoise(vUv, uGlobalNoiseFreq, uGlobalNoiseStrength);
    float noise = calculateRandomNoise(vUv, 800.0);
    
    // Combine base pattern
    float basePattern = uStripeBase + (wave * hStripe + noise + vStripe);
    basePattern *= edgeMask;
    
    // Add grain and finalize
    float grain = calculateBlurredGrain(vUv);
    float finalPattern = clamp(basePattern + grain, 0.0, 1.0);
    
    // Output
    vec3 finalColor = uColor * (1.0 - finalPattern);
    float alpha = (1.0 - finalPattern) * smoothstep(0.0, uEdgeSmoothness.y, vUv.y);
    gl_FragColor = vec4(finalColor, alpha);
}