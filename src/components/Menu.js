/**
 * @flow
 * Responsibility: Display the menu
 */
import type { ContextRouter } from 'react-router-dom'

import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap/lib'
import { Link, withRouter } from 'react-router-dom'

type MenuLinkProps = { to: string, text: string } & ContextRouter
const MenuLink = withRouter((props: MenuLinkProps) => {
  const { to, text, history } = props
  const handleClick = () => history.push(to)
  return <NavItem href="#" onClick={handleClick}>{text}</NavItem>
})

export const Menu = () => {
  return (
    <Navbar inverse={true} collapseOnSelect={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Logo</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <MenuLink to="/" text="Home" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
