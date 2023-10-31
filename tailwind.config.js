/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-blue': '#001F3E',
                'controller-dark-gray': '#232323',
            },
            keyframes: {
                slideRight: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '50%': { transform: 'translateX(0%)', opacity: '1' },
                },
            },
            animation: {
                slideRight: 'slideRight .6s ease-in-out',
            },
        },
        screens: {
            // Small tablet
            st: '600px',
            // Ipad
            md: '768px',
            // Laptop
            lg: '1024px',
            // Larger
            extra: '1400px',
            xl: '1920px',
        },
    },
    plugins: [],
};
