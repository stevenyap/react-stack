/**
 * @flow
 * Responsibility: Display the menu
 */
import type { ContextRouter } from 'react-router-dom'

import React from 'react'
import { connect } from 'react-redux'
import { Nav, Navbar, NavItem } from 'react-bootstrap/lib'
import { Link, withRouter } from 'react-router-dom'

import { doLogout } from 'ducks/admin'

type MenuLinkProps = { to: string, text: string } & ContextRouter
const MenuLink = withRouter((props: MenuLinkProps) => {
  const { to, text, history } = props
  const handleClick = () => history.push(to)
  return <NavItem href="#" onClick={handleClick}>{text}</NavItem>
})

type ComponentState = { admin: Admin }
type Props = ComponentState & { ispatch: Dispatch }
export const Menu = (props: Props) => {
  const { admin, dispatch } = props
  const logout = () => dispatch(doLogout())

  return (
    <Navbar inverse={true} collapseOnSelect={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React Stack</Link>
        </Navbar.Brand>
        {admin && <Navbar.Toggle />}
      </Navbar.Header>
      {admin &&
        <Navbar.Collapse>
          <Nav pullRight>
            <MenuLink to="/" text="Home" />
            <NavItem href="#" onClick={logout}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>}
    </Navbar>
  )
}

const mapStateToProps = (state: State): ComponentState => ({
  admin: state.admin.data
})
export default connect(mapStateToProps)(Menu)
