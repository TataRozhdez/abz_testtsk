import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logoImg from '../resources/img/logo.svg'

export const MyNavbar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Navbar bg='light' fixed='top' expand='lg'>
      <Navbar.Brand onClick={scrollToTop} className='cursor-pointer'>
        <img src={logoImg} alt='Logo' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link href='#about'>About me</Nav.Link>
          <Nav.Link href='#relations'>Relationships</Nav.Link>
          <Nav.Link href='#!'>Requirements</Nav.Link>
          <Nav.Link href='#users'>Users</Nav.Link>
          <Nav.Link href='#register'>Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
