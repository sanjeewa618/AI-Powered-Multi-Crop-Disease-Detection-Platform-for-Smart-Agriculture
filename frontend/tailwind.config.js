/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          nav: '#1B2028',
          sidebar: '#1E232E',
          main: '#F4F6F8',
          card: '#222834',
          cardInner: '#1C212A',
        },
        green: {
          brand: '#10B981', // main green color used
          badge: '#047857',
          upload: '#E8F5E9',
          uploadBorder: '#81C784',
        },
        text: {
          light: '#E2E8F0',
          muted: '#94A3B8',
          dark: '#1E293B',
          darkMuted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
