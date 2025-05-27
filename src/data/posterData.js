const basePresets = {
    backgroundColor: "#dfe2df",

    // Text
    titleFont: "Inter-Regular",
    subtitleFont: "Inter-Regular",
    descriptionFont: "Inter-Regular",
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
        title: "NULL",
        subtitle: "SYSTEM INITIATION • JANUARY 1, 1970",
        description: `⟶ signal: none  
⟶ system: stable  
⟶ void: verified`,
        presets: {
            ...basePresets,
            font: "Inter-Regular",
            titleFont: "Inter-Regular",
            subtitleFont: "Inter-Regular",
            descriptionFont: "Inter-Regular",
            dustColor: "#000000",
            waveSpeed: 0.3,
            titleColor: "#2F2F2F",
            subtitleColor: "#3C3C3C",
            descriptionColor: "#3A3A3A",
            descriptionSize: 0.08,
            waveStrength: 1,
            fractalNoiseStrength: 1,
        }
    },
    {
        title: "TRACE",
        subtitle: "REBUILD SEQUENCE • MAY 6, 2164",
        description: `Recovered fragments: /log/trace_2164.bin  
Reconstruction diverges from checksum.  
⚠ Checksum mismatch.
↳ trace_id: 0xB94FA2`,
        presets: {
            ...basePresets,
            titleFont: "Montserrat-Regular",
            subtitleFont: "Montserrat-Regular",
            descriptionFont: "Inter-Regular",
            dustColor: "#FFFF00",
            backgroundColor: "#aec4a3",
            stripeStrength: { x: 0.1, y: 0.1 },
            grainFreqUpper: 10,
            grainFreqLower: 40,
            grainBlur: 0.0,
            reseedChaos: 1,
            titleColor: "#1A1A1A",
            subtitleColor: "#222222",
            descriptionColor: "#2A2A2A",
            subtitleSize: 0.1,
            descriptionSize: 0.065,
            descriptionSpacing: 0.06,
        }
    },
    {
        title: "RESIDUE",
        subtitle: "AUDIO FRAGMENT • NOVEMBER 3, 1973",
        description: `Audio pattern reconstructed.    
Sector: 04-C   
pts=1973.11.03-0341Z   
Format: .dat / .json / unknown  
↳ recovery complete ✖ signal corrupted`,
        presets: {
            ...basePresets,
            titleFont: "EBGaramond-Regular",
            subtitleFont: "EBGaramond-Regular",
            descriptionFont: "NotoSerifGeorgian-Regular",
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
            titleColor: "#333333",
            titleSize: 0.22,
            titleSpacing: 0.28,
            subtitleColor: "#323232",
            descriptionColor: "#444444",
            descriptionSize: 0.07,
        }
    },
    {
        title: "JAM",
        subtitle: "SIGX COLLISION • CODE: R-2099 ▓ • JULY 19, 2099",
        description: `When current stalls, ▒▒▒ fractures.  
The machine stutt▓ers—and forɢets to lie.  
Distortɨon becomes the clearest signal.
`,
        presets: {
            ...basePresets,
            titleFont: "FiraCode-Regular",
            subtitleFont: "FiraCode-Regular",
            descriptionFont: "FiraCode-Regular",
            dustColor: "#ff5858",
            backgroundColor: "#000000",
            stripeStrength: { x: 0.5, y: 1.8 },
            stripeFreq: { x: 400, y: -10 },
            stripeSpeed: { x: 0, y: 0.5 },
            waveStrength: 1,
            waveFrequency: 10,
            wavePower: 2.3,
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
            titleColor: "#F0F0F0",
            titleSize: 0.25,
            subtitleColor: "#F0F0F0",
            descriptionColor: "#DDDDDD",
            subtitleSize: 0.068,
            descriptionSize: 0.065,
            titleSpacing: 1.5,
        }
    },
    {
        title: "FALL",
        subtitle: "SYSLOG ENTRY • ID#3A74D2 • MARCH 14, 1987",
        description: `Drift anomaly threshold exceeded.  
Data decay: critical.  
Signal weight detected in absence.`,
        presets: {
            ...basePresets,
            titleFont: "GFSDidot-Regular",
            subtitleFont: "GFSDidot-Regular",
            descriptionFont: "GFSDidot-Regular",
            dustColor: "#ffffff",
            backgroundColor: "#282828",
            titleSpacing: 1.3,
            stripeStrength: { x: 0.27, y: 0.3 },
            stripeFreq: { x: 5, y: 300 },
            stripeSpeed: { x: -0.5, y: 0 },
            fractalNoiseStrength: 1.5,
            fractalNoiseFreq: 3.7,
            waveSpeed: 0.47,
            separation: 0.53,
            grainFreqUpper: 350,
            fractalSpeed: 0.47,
            titleColor: "#E0E0E0",
            subtitleColor: "#E6E6E6",
            descriptionColor: "#CCCCCC",
            subtitleSize: 0.082,
            descriptionSize: 0.075,
        }
    },
];
