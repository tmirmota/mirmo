import React, { Component } from 'react'
import update from 'immutability-helper'
import _ from 'lodash'
import './App.css'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Components
import Nav from './components/Nav'
import Chips from './components/Chips'
import Projects from './components/Projects'
import Checkboxes from './components/Checkboxes'

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

  handleRequestDelete = tech => {
    const { technologies } = this.state
    const index = technologies.indexOf(tech)
    const removeTech = update(technologies, { $splice: [[index, 1]] })

    this.setState({ technologies: removeTech })
  }

  handleCheck = tech => {
    const { technologies } = this.state
    const index = technologies.indexOf(tech)
    const isPresent = index > -1
    if (isPresent) {
      const removeTech = update(technologies, { $splice: [[index, 1]] })
      this.setState({ technologies: removeTech })
    } else {
      const addTech = _.concat(technologies, tech)
      this.setState({ technologies: addTech })
    }
    // this.state({ technologies: updatedTech })
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

          <section className="container">
            <div className="row text-center">
              <div className="col">
                <h3 className="display-1 my-4">Projects</h3>
                <Chips
                  technologies={technologies}
                  handleRequestDelete={this.handleRequestDelete}
                />
                <Checkboxes
                  technologies={technologies}
                  handleCheck={this.handleCheck}
                />
                <Projects projects={projects} technologies={technologies} />
              </div>
            </div>
          </section>

        </div>
      </MuiThemeProvider>
    )
  }
}
