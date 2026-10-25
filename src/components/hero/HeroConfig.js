export const HERO_PHOTO = "/images/hero-portrait.jpg";

export const THEME = {
  bg: "var(--bg)",
  text: "var(--text)",
  highlight: "var(--highlight)",
  accent: "var(--highlight)",
  bronze: "var(--highlight)",
  canvas: "var(--bg)",
  surface: "color-mix(in srgb, var(--bg) 92%, var(--text))",
  mist: "color-mix(in srgb, var(--highlight) 35%, var(--bg))",
  ocean: "var(--highlight)",
  navy: "var(--text)",
  bodyText: "var(--text)",
  mutedText: "color-mix(in srgb, var(--text) 65%, transparent)",
};

export const PHOTO_FILTERS = [
  { id: "raw", label: "RAW", className: "contrast-[1.03] saturate-[0.96]" },
  {
    id: "ocean",
    label: "AEGEAN",
    className: "contrast-[1.08] brightness-[0.98] hue-rotate-[185deg] saturate-[0.92]",
  },
  {
    id: "mono",
    label: "MONO",
    className: "grayscale contrast-[1.18] brightness-[0.96]",
  },
];
