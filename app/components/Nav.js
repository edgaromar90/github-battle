import React from 'react'
import { ThemeConsumer } from '../contexts/theme'

export default function Nav () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <button
            className='btn-clear btn-theme'
            style={{fontSize: 30, padding: 0}}
            onClick={toggleTheme}
          >
            {theme === 'light' ? <span className='toggle-theme-light'>🔦</span> : <span className='toggle-theme-dark'>💡</span>}
          </button>
        </nav>
        )}
    </ThemeConsumer>
  )
}