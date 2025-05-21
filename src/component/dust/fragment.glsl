#include "../../r3f-gist/shader/cginc/noise/gradientNoise.glsl"
#include "../../r3f-gist/shader/cginc/noise/random.glsl"
#include "../../r3f-gist/shader/cginc/utility.glsl"

precision mediump float;

varying vec2 vUv;
uniform float uTime;
uniform float uStripeBase;
uniform vec2 uStripeRange;
uniform vec2 uStripeFreq;
uniform float uBigWaveFreq;
uniform float uBigWaveRange;
uniform float uGlobalNoiseScale;
uniform float uGlobalNoiseFreq;
uniform vec2 uEdgeSmoothness;
uniform float uNoiseThresholdRange;
uniform vec3 uColor;

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
    return gradientNoise(vec2(0.5, uv.y),  frequency) * amplitude;
}

float calculateNoisePattern(vec2 uv) {
    float baseNoise = random(floor(uv * 500.));
    float noiseThreshold = smoothstep(uNoiseThresholdRange, 0.0, uv.y);
    return mix(0.0, baseNoise, noiseThreshold);
}

float calculateHorizontalStripe(vec2 uv, float frequency, float amplitude) {
    return gradientNoise(vec2(0.5, uv.y), frequency) * amplitude;
}

float calculateVerticalStripe(vec2 uv, float frequency, float amplitude, float globalNoiseFreq, float globalNoiseScale) {
    float stripe = gradientNoise(vec2(uv.x, 0.5), frequency) * amplitude;
    stripe = pow(stripe, 2.0);
    float globalNoise = gradientNoise(uv, globalNoiseFreq) * globalNoiseScale;
    return stripe * globalNoise;
}

float calculateRandomNoise(vec2 uv, float scale) {
    return remap(random(floor(uv * scale)), vec2(0.0, 1.0), vec2(0.0, 0.05));
}

void main() {
    // Edge mask
    float edgeMask = calculateEdgeMask(vUv, uEdgeSmoothness, uStripeBase);
    
    // Pattern layers
    float wave = calculateWavePattern(vUv, uBigWaveFreq, uBigWaveRange);
    float hStripe = calculateHorizontalStripe(vUv, uStripeFreq.x, uStripeRange.x);
    float vStripe = calculateVerticalStripe(vUv, uStripeFreq.y, uStripeRange.y, uGlobalNoiseFreq, uGlobalNoiseScale);
    float noise = calculateRandomNoise(vUv, 800.0);
    
    // Combine base pattern
    float basePattern = uStripeBase + (wave * hStripe + noise + vStripe);
    basePattern *= edgeMask;
    
    // Add grain and finalize
    float grain = calculateNoisePattern(vUv);
    float finalPattern = clamp(basePattern + grain, 0.0, 1.0);
    
    // Output
    vec3 finalColor = uColor * (1.0 - finalPattern);
    float alpha = (1.0 - finalPattern) * smoothstep(0.0, uEdgeSmoothness.y, vUv.y);
    gl_FragColor = vec4(finalColor, alpha);
}