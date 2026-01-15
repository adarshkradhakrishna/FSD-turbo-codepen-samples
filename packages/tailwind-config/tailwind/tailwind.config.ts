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
        extend:{
            
        }
    },

}


export default config;