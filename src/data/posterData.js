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
    waveStrength: 0.7,
    waveFrequency: 4,
    wavePower: 2.0,
    waveSpeed: 0.2,
    stripeStrength: { x: 0.27, y: 0.5 },
    stripeFreq: { x: 400, y: 300 },
    stripeSpeed: { x: 0, y: 0 },

    fractalNoiseStrength: 0.6,
    fractalNoiseFreq: 1.2,
    fractalSpeed: 0.2, 

    separation: 0.35,
    grainFreqUpper: 800,
    grainFreqLower: 500,
    grainBlur: 0.001,
    edgeSmoothnessTop: 0.01,
    edgeSmoothnessBottom: 0.25,
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
            freactalNoiseStrength: 1.5,
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
            dustColor: "#3b7372",
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
            dustColor: "#943f3f",
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
        }
    }
];
