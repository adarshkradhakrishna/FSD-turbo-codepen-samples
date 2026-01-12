import { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const config:Config ={
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{ts,tsx}',
        './packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/lib/src/**/*.{ts,tsx}',
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: 'hsl(var(--primary))',
            secondary: 'hsl(var(--secondary))',
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },

}


export default config;