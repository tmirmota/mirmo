import React, { Component } from 'react'
import './App.css'

// Components
import Nav from './components/Nav'

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <div className="container">
            <div className="row header_content">
              <Nav />
              <div className="col align-self-center">
                Thomas Mirmo
              </div>
              <div className="col align-self-center">
                Image
              </div>
            </div>
          </div>
        </header>
        <div className="row text-center">
          <div className="col">
            <h3 className="display-1 my-4">Projects</h3>
          </div>
        </div>
      </div>
    )
  }
}
