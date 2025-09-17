/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b1020',
        panel: '#0f1730',
        panel2: '#0c142a',
        text: '#e6f0ff',
        muted: '#9fb2d8',
        brand: '#5aa8ff',
        brand2: '#3de0ff',
        ok: '#3ddc97',
        warn: '#ffb020',
        danger: '#ff5c7a',
        success: '#3ddc97',
        warning: '#ffb020',
        error: '#ff5c7a',
        info: '#5aa8ff',
      },
      boxShadow: {
        glass: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Microsoft YaHei', 'PingFang SC', 'sans-serif']
      }
    },
  },
  plugins: [],
}
