import React, { Component } from 'react'
import update from 'immutability-helper'
import _ from 'lodash'
import './App.css'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'

// Components
import Nav from './components/Nav'
import Chips from './components/Chips'
import Projects from './components/Projects'
import Checkboxes from './components/Checkboxes'

// Data
import projects from './data/projects'

export default class App extends Component {
  state = {
    filterStatus: false,
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
    const { filterStatus } = this.state
    const isFilterActive = filterStatus
    if (isFilterActive) {
      this.setState({ filterStatus: false })
    } else {
      this.setState({ filterStatus: true })
    }
  }

  render() {
    const { activeTech, allTech, filterStatus } = this.state
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

          {/* PROJECTS SECTION */}
          <section className="container">
            <div className="row text-center">
              <div className="col">
                <h1 className="projects_heading">Projects</h1>

                <Chips
                  activeTech={activeTech}
                  handleRequestDelete={this.handleRequestDelete}
                />
                <Projects projects={projects} activeTech={activeTech} />

                <FloatingActionButton
                  className="my-4"
                  backgroundColor="#03A9F4"
                  secondary={filterStatus}
                  onTouchTap={this.toggleFilter}
                  mini={true}
                >
                  {filterStatus ? <ContentRemove /> : <ContentAdd />}
                </FloatingActionButton>

                {filterStatus &&
                  <Checkboxes
                    activeTech={activeTech}
                    allTech={allTech}
                    handleCheck={this.handleCheck}
                  />}

              </div>
            </div>
            <hr />
          </section>

          <section className="container">
            <div className="my-5">
              Other Section
            </div>
          </section>

        </div>
      </MuiThemeProvider>
    )
  }
}
