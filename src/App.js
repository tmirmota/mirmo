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
  state = {
    filter: {
      status: false,
      title: 'Show Filters',
    },
  }
  componentWillMount() {
    const arrTechnologies = _.map(projects, 'technologies')
    const allTechnologies = [].concat.apply([], arrTechnologies)
    const uniqTechnologies = _.uniq(allTechnologies)
    const technologies = _.sortBy(uniqTechnologies)

    this.setState({ activeTech: technologies, allTech: technologies })
  }

  handleRequestDelete = tech => {
    const { activeTech } = this.state
    const index = activeTech.indexOf(tech)
    const removeTech = update(activeTech, { $splice: [[index, 1]] })

    this.setState({ activeTech: removeTech })
  }

  handleCheck = tech => {
    const { activeTech } = this.state
    const index = activeTech.indexOf(tech)
    const isPresent = index > -1
    if (isPresent) {
      const removeTech = update(activeTech, { $splice: [[index, 1]] })
      this.setState({ activeTech: removeTech })
    } else {
      const addTech = _.concat(activeTech, tech)
      this.setState({ activeTech: addTech })
    }
    // this.state({ activeTech: updatedTech })
  }

  toggleFilter = () => {
    const { filter } = this.state
    const isFilterActive = filter.status
    if (isFilterActive) {
      this.setState({ filter: { status: false, title: 'Show Filters' } })
    } else {
      this.setState({ filter: { status: true, title: 'Hide Filters' } })
    }
  }

  render() {
    const { activeTech, allTech, filter } = this.state
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
                  activeTech={activeTech}
                  handleRequestDelete={this.handleRequestDelete}
                />
                <button onClick={this.toggleFilter}>{filter.title}</button>
                {filter.status &&
                  <Checkboxes
                    activeTech={activeTech}
                    allTech={allTech}
                    handleCheck={this.handleCheck}
                  />}

                <Projects projects={projects} activeTech={activeTech} />
              </div>
            </div>
          </section>

        </div>
      </MuiThemeProvider>
    )
  }
}
