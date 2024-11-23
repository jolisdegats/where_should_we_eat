export const WHEEL_CONFIG = {
    size: 25,
    borderSize: 3,
    turns: 4,
    spinDuration: 3000,
    font: "Lato, Quicksand, sans-serif",
    baseColors: [
      "#7400B8",
      "#6930C3",
      "#5E60CE",
      "#5390D9",
      "#4EA8DE",
      "#48BFE3",
    ]
  } as const;
  
  // Color utility functions
  const hexToRgb = (hex: string): number[] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };
  
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b]
      .map(x => Math.round(x).toString(16).padStart(2, "0"))
      .join("");
  };
  
  export const generateColor = (index: number, total: number): string => {
    const position = total > 1 ? index / (total - 1) : 0;
    const segment = position * (WHEEL_CONFIG.baseColors.length - 1);
    const segmentIndex = Math.floor(segment);
    const progress = segment - segmentIndex;
  
    if (progress === 0 && segmentIndex < WHEEL_CONFIG.baseColors.length) {
      return WHEEL_CONFIG.baseColors[segmentIndex];
    }
  
    const color1 = hexToRgb(WHEEL_CONFIG.baseColors[segmentIndex]);
    const color2 = hexToRgb(WHEEL_CONFIG.baseColors[segmentIndex + 1]);
  
    const r = color1[0] + (color2[0] - color1[0]) * progress;
    const g = color1[1] + (color2[1] - color1[1]) * progress;
    const b = color1[2] + (color2[2] - color1[2]) * progress;
  
    return rgbToHex(r, g, b);
  };