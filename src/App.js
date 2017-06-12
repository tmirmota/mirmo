import React, { Component } from 'react'
import update from 'immutability-helper'
import _ from 'lodash'
import './App.css'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import Divider from 'material-ui/Divider'

// Components
import Nav from './components/Nav'
import Chips from './components/Chips'
import Projects from './components/Projects'
import Checkboxes from './components/Checkboxes'
import InputColors from './components/InputColors'

// Data
import projects from './data/projects'

export default class App extends Component {
  state = {
    filterStatus: false,
    headerColors: {
      color1: '#af74b5',
      color2: '#6dfee9',
      swatch1: false,
      swatch2: false,
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
    const updatedTech = update(activeTech, { $splice: [[index, 1]] })

    let allTechnologies = []

    projects.map(project => {
      const validTech = _.difference(project.technologies, updatedTech)
      if (validTech.length === 0) {
        allTechnologies = allTechnologies.concat(project.technologies)
      }
    })

    const uniqTechnologies = _.uniq(allTechnologies)
    const technologies = _.sortBy(uniqTechnologies)

    this.setState({ activeTech: technologies })
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

  handleColorSelect = color => {
    const { headerColors } = this.state
    const isColor1 = color === 'color1'

    if (isColor1) {
      const isAlreadyOpen = headerColors.swatch1
      if (isAlreadyOpen) {
        const closeSwatch = update(headerColors, { swatch1: { $set: false } })
        this.setState({ headerColors: closeSwatch })
      } else {
        const openSwatch = update(headerColors, {
          swatch1: { $set: true },
          swatch2: { $set: false },
        })
        this.setState({ headerColors: openSwatch })
      }
    } else {
      const isAlreadyOpen = headerColors.swatch2
      if (isAlreadyOpen) {
        const closeSwatch = update(headerColors, { swatch2: { $set: false } })
        this.setState({ headerColors: closeSwatch })
      } else {
        const openSwatch = update(headerColors, {
          swatch1: { $set: false },
          swatch2: { $set: true },
        })
        this.setState({ headerColors: openSwatch })
      }
    }
  }

  handleColorChange1 = ({ hex }) => {
    const { headerColors } = this.state
    const updateColor = update(headerColors, {
      color1: { $set: hex },
      swatch1: { $set: false },
    })
    this.setState({ headerColors: updateColor })
  }

  handleColorChange2 = ({ hex }) => {
    const { headerColors } = this.state
    const updateColor = update(headerColors, {
      color2: { $set: hex },
      swatch2: { $set: false },
    })
    this.setState({ headerColors: updateColor })
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
    const { activeTech, allTech, filterStatus, headerColors } = this.state

    // Styling
    const styles = {
      header: {
        background: `linear-gradient(to bottom right, ${headerColors.color1}, ${headerColors.color2})`,
        minHeight: '100vh',
      },
    }

    return (
      <MuiThemeProvider>
        <div>

          {/* HEADER SECTION */}
          <header style={styles.header}>
            <div className="container">
              <div className="row header_content">
                <div className="col align-self-center">
                  Thomas Mirmo
                </div>
                <div className="col align-self-center">
                  Image
                </div>
                <InputColors
                  colors={headerColors}
                  handleChange1={this.handleColorChange1}
                  handleChange2={this.handleColorChange2}
                  handleSelect={this.handleColorSelect}
                />
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
                  className="projects_floating_button"
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

                <Divider />

              </div>
            </div>
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
