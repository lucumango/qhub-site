import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// QuantumHub brand colors
				quantum: {
					black: 'hsl(var(--quantum-black))',
					'dark-blue': 'hsl(var(--quantum-dark-blue))',
					purple: 'hsl(var(--quantum-purple))',
					lilac: 'hsl(var(--quantum-lilac))',
					orange: 'hsl(var(--quantum-orange))',
					cta: 'hsl(var(--quantum-cta))',
					'cta-foreground': 'hsl(var(--quantum-cta-foreground))'
				}
			},
			fontFamily: {
				'staatliches': ['Staatliches', 'serif'],
				'arimo': ['Arimo', 'Arial', 'sans-serif'],
				'flatory': ['Playfair Display', 'serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},

				floatSlow: {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-12px)' },
					'100%': { transform: 'translateY(0px)' },
					},
					
				// Quantum animations
				quantumFloat: {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-10px) rotate(1deg)' },
					'50%': { transform: 'translateY(0px) rotate(0deg)' },
					'75%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				quantumPulse: {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.7', transform: 'scale(1.05)' }
				},
				quantumSuperposition: {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1) rotate(0deg)' },
					'25%': { opacity: '0.8', transform: 'scale(1.1) rotate(90deg)' },
					'50%': { opacity: '0.2', transform: 'scale(0.9) rotate(180deg)' },
					'75%': { opacity: '0.9', transform: 'scale(1.05) rotate(270deg)' }
				},
				quantumEntanglement: {
					'0%': { transform: 'translateX(0) rotate(0deg)', opacity: '0.5' },
					'25%': { transform: 'translateX(20px) rotate(90deg)', opacity: '0.8' },
					'50%': { transform: 'translateX(0) rotate(180deg)', opacity: '0.3' },
					'75%': { transform: 'translateX(-20px) rotate(270deg)', opacity: '0.9' },
					'100%': { transform: 'translateX(0) rotate(360deg)', opacity: '0.5' }
				},
				fadeInUp: {
					from: {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Quantum animations
				'quantum-float': 'quantumFloat 6s ease-in-out infinite',
				'quantum-pulse': 'quantumPulse 2s ease-in-out infinite',
				'quantum-superposition': 'quantumSuperposition 4s ease-in-out infinite',
				'quantum-entanglement': 'quantumEntanglement 5s linear infinite',
				'fade-in-up': 'fadeInUp 0.6s ease-out forwards'
				
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
