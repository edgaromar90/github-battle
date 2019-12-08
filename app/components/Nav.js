import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyleBlue = {
  color: 'rgba(59, 64, 113, 0.7)',
};

const activeStyleRed = {
  color: 'rgb(187, 46, 31)',
};

export default function Nav () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                to='/'
                exact
                activeStyle={theme === 'light' ? activeStyleBlue : activeStyleRed}
                className='nav-link'
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/battle'
                activeStyle={theme === 'light' ? activeStyleBlue : activeStyleRed}
                className='nav-link'
              >
                Battle
              </NavLink>
            </li>
          </ul>
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