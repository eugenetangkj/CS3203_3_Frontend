import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "yap-brown": {
          100: "#E8CABA", 
          800: "#A47F6E",
          900: "#8D5F4A"
        },
        "yap-orange": {
          100: "#FFAF91",
          900: "#FF814A", 
        },
        "yap-yellow": {
          100: "#FEECC2", 
          900: "#FFAF91"
        },
        "yap-green": {
          100: "#CAD2B0", 
          900: "#92A062"
        },
        "yap-gray": {
          100: "#FAF4F4",
          200: "#E2E2E2",
          900: "84838A"
        },
        "yap-black": {
          800: "3D3A39"
        }
      },
      fontFamily: {
        kavoon: "var(--font-kavoon)",
        afacad: "var(--font-afacad)",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
