import type { Config } from "tailwindcss";


const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
  	extend: {
  		colors: {
  			'yap-brown': {
  				'100': '#FDF2EC',
  				'200': '#E8CABA',
  				'800': '#A47F6E',
  				'900': '#8D5F4A'
  			},
  			'yap-orange': {
  				'100': '#FFAF91',
				'800': '#FFA077',
  				'900': '#FF814A'
  			},
  			'yap-yellow': {
  				'100': '#FEECC2',
				'800': '#FFD67C',
  				'900': '#FFC64A'
  			},
  			'yap-green': {
  				'100': '#CAD2B0',
				'800': '#ACBA7B',
  				'900': '#92A062'
  			},
  			'yap-gray': {
  				'100': '#FAF4F4',
  				'200': '#E2E2E2',
  				'800': '#AFAEB5',
  				'900': '#84838A'
  			},
  			'yap-black': {
  				'800': '#3D3A39'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			kavoon: 'var(--font-kavoon)',
  			afacad: 'var(--font-afacad)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    flowbite.plugin(),
      require("tailwindcss-animate")
],
  darkMode: ['class'],
} satisfies Config;
