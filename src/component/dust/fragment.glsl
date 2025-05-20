#include "../../r3f-gist/shader/cginc/noise/gradientNoise.glsl"
#include "../../r3f-gist/shader/cginc/utility.glsl"

precision mediump float;

varying vec2 vUv;
uniform float uTime;
uniform float uStripeBase;
uniform float uBigWaveFreq;
uniform float uBigWaveRange;
uniform float uStripeRange;
uniform float uGlobalNoiseScale;
uniform float uGlobalNoiseFreq;
uniform float uEdgeSmoothness;
uniform float uNoiseThresholdRange;
uniform vec3 uColor;

float random(vec2 st) {
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    float edge = smoothstep(0.0, uEdgeSmoothness, vUv.y) 
                 * smoothstep(0.0, uEdgeSmoothness, 1.0 - vUv.y)
                 * smoothstep(0.0, uEdgeSmoothness, vUv.x) 
                 * smoothstep(0.0, uEdgeSmoothness, 1.0 - vUv.x);

    float bigWave = sin(vUv.y * 3.1415 * uBigWaveFreq) * uBigWaveRange;

    float wn = remap(noise(vUv), vec2(.0,1.), vec2(0.0, .05));
    float gn = gradientNoise(vUv, uGlobalNoiseFreq) * uGlobalNoiseScale;

    float stripe =  gradientNoise(vec2(0.5, vUv.y), 200.) * uStripeRange;
    float base = uStripeBase + (bigWave * stripe + wn);// * gn;

    base *= edge;

    // 噪聲顆粒 fade 區段
    float noiseThreshold = smoothstep(uNoiseThresholdRange, 0.0, vUv.y); // 下方 20% 是 noise 區域
    float noise = random(vUv);
    float grain = mix(0.0, noise, noiseThreshold);

    // 合成背景 + 噪聲（上方乾淨、下方顆粒）
    float final = base + grain;
    final = clamp(final, 0.0, 1.0);

    float global_edge = smoothstep(0., 0.1, vUv.y) ;
    // final = base;

    vec3 color = uColor;
    // color *= (1.-final);
    color = vec3(final);

    gl_FragColor = vec4(color, global_edge);
}