/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	screens: {
  		sm: '640px',
  		md: '768px',
		mdx: '980px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1400px',
  		'3xl': '1536px',
  		'4xl': '1800px'
  	},
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1.5rem',
  			sm: '1.5rem',
  			lg: '1.5rem',
  			xl: '1.5rem',
  			'2xl': '1.5rem'
  		},
  		maxWidth: '1536px',
  		screens: {
  			'3xl': '1536px',
  			'4xl': '1800px'
  		}
  	},
  	extend: {
  		dropShadow: {
  			primary: '0px 0px 3px rgba(0,0,0,0.6)',
  			input: '0px 0px 1.5px rgba(var(--input-hover))',
  			persp: '0px 2px 5px hsl(var(--primary))'
  		},
  		colors: {
  			yellow: {
  				primary: 'hsl(var(--yellow))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  				blue: 'hsl(var(--primary-blue))',
  				red: 'hsl(var(--primary-red))',
  				yellow: 'hsl(var(--primary-yellow))',
  				green: 'hsl(var(--primary-green))',
  				purple: 'hsl(var(--primary-purple))'
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			DEFAULT: 'var(--radius)',
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-justify': {
          'text-align': 'justify',
        },
      });
    },
      require("tailwindcss-animate")
],
}