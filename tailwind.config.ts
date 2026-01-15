/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},

				secondarysoft: {
					DEFAULT: "hsl(var(--secondary-soft))",
					foreground: "hsl(var(--secondary-foreground-soft))",
				},

				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				positive: {
					DEFAULT: "hsl(var(--positive))",
					foreground: "hsl(var(--positive-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					10: "hsl(var(--success-10))",
					20: "hsl(var(--success-20))",
					30: "hsl(var(--success-30))",
					foreground: "hsl(var(--success-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					10: "hsl(var(--warning-10))",
					20: "hsl(var(--warning-20))",
					30: "hsl(var(--warning-30))",
					foreground: "hsl(var(--warning-foreground))",
				},
				error: {
					DEFAULT: "hsl(var(--error))",
					10: "hsl(var(--error-10))",
					20: "hsl(var(--error-20))",
					30: "hsl(var(--error-30))",
					foreground: "hsl(var(--error-foreground))",
				},
				info: {
					DEFAULT: "hsl(var(--info))",
					10: "hsl(var(--info-10))",
					20: "hsl(var(--info-20))",
					30: "hsl(var(--info-30))",
					foreground: "hsl(var(--info-foreground))",
				},
				neutral: {
					DEFAULT: "hsl(var(--neutral))",
					10: "hsl(var(--neutral-10))",
					20: "hsl(var(--neutral-20))",
					30: "hsl(var(--neutral-30))",
					foreground: "hsl(var(--neutral-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			backgroundImage: {
				"gradient-success": "linear-gradient(to right, hsl(var(--success)), hsl(var(--success)) 50%, hsl(var(--success)))",
				"gradient-warning": "linear-gradient(to right, hsl(var(--warning)), hsl(var(--warning)) 50%, hsl(var(--warning)))",
				"gradient-error": "linear-gradient(to right, hsl(var(--error)), hsl(var(--error)) 50%, hsl(var(--error)))",
				"gradient-info": "linear-gradient(to right, hsl(var(--info)), hsl(var(--info)) 50%, hsl(var(--info)))",
				"gradient-neutral": "linear-gradient(to right, hsl(var(--neutral)), hsl(var(--neutral)) 50%, hsl(var(--neutral)))",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"gentle-hum-hover":
					"animate-pulse duration-1000 delay-75 transition-opacity[opacity:100]",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), animate],
};
