/**
 * @flow
 * Responsibility: Display the menu
 */
import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
  )
}

export default Menu
