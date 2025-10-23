// duskmoonUI Theme Plugin
import plugin from 'tailwindcss/plugin'
import { content } from './variables.js'

export default plugin(function ({ addComponents, theme }) {
  addComponents({
    '.btn': {
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      backgroundColor: theme('colors.blue.500'),
      color: 'white',
      '&:hover': {
        backgroundColor: theme('colors.blue.600')
      }
    }
  })
}, {
  theme: {
    extend: {}
  }
})