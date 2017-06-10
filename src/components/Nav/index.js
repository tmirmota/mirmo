import React, { Component } from 'react'
import './Nav.css'

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md absolute_top">
        <a href="#" className="navbar-brand">Thomas Mirmo</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link">Projects</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
