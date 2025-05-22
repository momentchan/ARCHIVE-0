#include './../../r3f-gist/shader/cginc/noise/gradientNoise.glsl'
#include './../../r3f-gist/shader/cginc/utility.glsl'

uniform float uFoldY;
uniform float uFoldStrength;
uniform float uFoldFrequency;
uniform float uShadowIntensity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float dy = uv.y - uFoldY;
    float fold = sin(dy * uFoldFrequency) * uFoldStrength * exp(-abs(dy * 20.0));

    vec2 distortedUV = uv + vec2(0.0, fold);
    vec4 texel = texture2D(inputBuffer, distortedUV);

    float shade = 1.0 - smoothstep(0.0, 0.01, abs(dy));
    vec3 color = texel.rgb * mix(1.0, 1.0 - uShadowIntensity, shade);

    outputColor = vec4(color, 1.0);
}
