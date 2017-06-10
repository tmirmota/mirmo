import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Components
import Nav from './components/Nav'
import Projects from './components/Projects'
import Chips from './components/Chips'

// Data
import projects from './data/projects'

export default class App extends Component {
  componentWillMount() {
    const arrTechnologies = _.map(projects, 'technologies')
    const allTechnologies = [].concat.apply([], arrTechnologies)
    const uniqTechnologies = _.uniq(allTechnologies)
    const technologies = _.sortBy(uniqTechnologies)

    this.setState({ technologies })
  }
  render() {
    const { technologies } = this.state
    return (
      <MuiThemeProvider>
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
              <Chips technologies={technologies} />
              <Projects projects={projects} />
            </div>
          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}
