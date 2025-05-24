const basePresets = {
    backgroundColor: "#dfe2df",

    // Text
    font: "Inter-Regular",
    textColor: "#000000",
    textAlpha: 1,
    titleSize: 0.2,
    subtitleSize: 0.1,
    descriptionSize: 0.06,
    titleSpacing: 0.5,
    subtitleSpacing: 0,
    descriptionSpacing: 0,

    // Effect
    dustColor: "#000000",
    base: 0.05,
    stripeStrength: { x: 0.27, y: 0.5 },
    stripeFreq: { x: 400, y: 300 },
    stripeSpeed: { x: 0, y: 0 },

    waveStrength: 0.7,
    waveFrequency: 4,
    wavePower: 2.0,
    waveSpeed: 0.2,

    fractalNoiseStrength: 0.6,
    fractalNoiseFreq: 1.2,
    fractalSpeed: 0.2,

    separation: 0.35,
    edgeSmoothnessTop: 0.01,
    edgeSmoothnessBottom: 0.25,

    grainFreqUpper: 800,
    grainFreqLower: 500,
    grainBlur: 0.001,
    reseedChaos: 0,
};

export const posterData = [
    {
        title: "VOID",
        subtitle: "FRIDAY • MARCH 3 • 1972",
        description:
            `There is a silence at the edge of thought. 
It waits—not to be heard, but to be remembered. 
In the static, in the absence, something lingers.`,
        presets: {
            ...basePresets,
            font: "BodoniModa-Regular",
            textColor: "#000000",
            dustColor: "#000000",
            waveSpeed: 0.3,
        }
    },
    {
        title: "ASHES",
        subtitle: "WEDNESDAY • NOVEMBER 9 • 1983",
        description:
            `What burns does not vanish—it scatters, and in scattering, returns. 
Each flake a memory. 
Each ember a breath.`,
        presets: {
            ...basePresets,
            font: "EBGaramond-Regular",
            textColor: "#ffffff",
            dustColor: "#ffffff",
            backgroundColor: "#282828",
            stripeStrength: { x: 0.27, y: 0.3 },
            stripeFreq: { x: 5, y: 300 },
            stripeSpeed: { x: -0.5, y: 0 },
            fractalNoiseStrength: 1.5,
            fractalNoiseFreq: 3.7,
            waveSpeed: 0.47,
            separation: 0.53,
            grainFreqUpper: 350,
            fractalSpeed: 0.47,
        }
    },
    {
        title: "ECHO",
        subtitle: "SUNDAY • APRIL 21 • 1965",
        description:
            `It fades slower than sound and deeper than light. 
An echo is not what was said, but what we refused to forget.`,
        presets: {
            ...basePresets,
            font: "NotoSerifGeorgian-Regular",
            textColor: "#444444",
            dustColor: "#39908f",
            stripeStrength: { x: 2, y: -2 },
            stripeFreq: { x: 60, y: 60 },
            stripeSpeed: { x: -0.5, y: 0 },
            waveStrength: 0.3,
            fractalNoiseStrength: 0.4,
            fractalNoiseFreq: 2.1,
            fractalSpeed: 0.45,
            separation: 1,
            grainFreqUpper: 1000,
            grainFreqLower: 1000,
            grainBlur: 0.001,
            edgeSmoothnessTop: 0.08,
            edgeSmoothnessBottom: 0.4,
        }
    },
    {
        title: "NOISE",
        subtitle: "DATA FRAGMENT • 02.28.2081",
        description:
            `Between signal and silence lies the artifact. 
Not message, not meaning—just the digital dust of things once known.`,
        presets: {
            ...basePresets,
            font: "Inter-Regular",
            textColor: "#555555",
            dustColor: "#ff5858",
            backgroundColor: "#000000",
            stripeStrength: { x: 0.5, y: 1.8 },
            stripeFreq: { x: 400, y: -10 },
            stripeSpeed: { x: 0, y: 0.5 },
            waveStrength: 1,
            waveFrequency: 10,
            wavePower: 2.3 ,
            waveSpeed: -0.75,
            fractalNoiseStrength: 1.3,
            fractalNoiseFreq: 1.5,
            separation: 0.3,
            edgeSmoothnessBottom: 0.2,
            edgeSmoothnessTop: 0.0,
            grainFreqUpper: 360,
            grainFreqLower: 1000,
            grainBlur: 0.01,
            reseedChaos: 1,
        }
    },
    {
        title: "LIGHT",
        subtitle: "MONDAY • JANUARY 11 • 1965",
        description:
            `A single beam pierces the darkness. 
It reveals, it blinds, it transforms. 
In its presence, shadows find their purpose.`,
        presets: {
            ...basePresets,
            font: "Montserrat-Regular",
            textColor: "#666666",
            dustColor: "#FFFF00",
            backgroundColor: "#aec4a3",
            stripeStrength: { x: 0.1, y: 0.1 },
            grainFreqUpper: 10,
            grainFreqLower: 40,
            grainBlur: 0.0,
            reseedChaos: 1,
        }
    }
];
