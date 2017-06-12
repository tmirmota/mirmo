import React, { Component } from 'react'
import update from 'immutability-helper'
import _ from 'lodash'
import './App.css'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import RestoreIcon from 'material-ui/svg-icons/action/restore'

// Components
import Nav from './components/Nav'
import Chips from './components/Chips'
import Projects from './components/Projects'
import Checkboxes from './components/Checkboxes'
import InputColors from './components/InputColors'

// Data
import projects from './data/projects'

// Images
import profilePicture from './images/thomas_mirmo.jpg'
import foodeeLogo from './images/foodee_logo.png'
import wrLogo from './images/WR_Logo_Black.png'
import iveyLogo from './images/Ivey-Main-Logo.jpg'
import bcitLogo from './images/BCIT.jpg'

export default class App extends Component {
  state = {
    filterStatus: false,
    headerColors: {
      color1: '#03A9F4',
      color2: '#C5CAE9',
      swatch1: false,
      swatch2: false,
    },
    activeTech: [],
    allTech: [],
    selectedTech: null,
  }
  componentWillMount() {
    const arrTechnologies = _.map(projects, 'technologies')
    const allTechnologies = [].concat.apply([], arrTechnologies)
    const uniqTechnologies = _.uniq(allTechnologies)
    const technologies = _.sortBy(uniqTechnologies)

    this.setState({ activeTech: technologies, allTech: technologies })
  }

  handleChipRequestDelete = tech => {
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

    this.setState({ activeTech: technologies, selectedTech: null })
  }

  handleChipSelect = tech => {
    const { selectedTech } = this.state
    const isNew = tech !== selectedTech
    if (isNew) {
      this.setState({ selectedTech: tech })
    } else {
      this.setState({ selectedTech: null })
    }
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
    const { allTech, filterStatus } = this.state

    this.setState({ activeTech: allTech })

    // Shows Checkboxes
    // const isFilterActive = filterStatus
    // if (isFilterActive) {
    //   this.setState({ filterStatus: false })
    // } else {
    //   this.setState({ filterStatus: true })
    // }
  }

  render() {
    const {
      activeTech,
      allTech,
      filterStatus,
      headerColors,
      selectedTech,
    } = this.state

    // Styling
    const styles = {
      header: {
        background: `linear-gradient(to bottom right, ${headerColors.color1}, ${headerColors.color2})`,
        minHeight: '100vh',
      },
    }

    const noActiveTech = activeTech.length === 0

    const allProjectsActive = _.difference(allTech, activeTech).length === 0
    const restoreStatus = allProjectsActive ? true : false

    return (
      <MuiThemeProvider>
        <div>

          {/* HEADER SECTION */}
          <header style={styles.header}>
            <div className="container">
              <div className="row header_content">
                <div className="col col-md-6 align-self-center text-left">
                  <h1 className="header_heading text-white">Thomas Mirmo</h1>
                  <p className="lead text-white">
                    Aspiring Frontend Developer
                  </p>
                  <RaisedButton
                    href="https://www.linkedin.com/in/thomasmirmotahari/"
                    target="_blank"
                    label="Let's Connect"
                    labelColor="#FFFFFF"
                    backgroundColor="#0077B5"
                    icon={
                      <i className="fa fa-linkedin text-white heading_cta_icon" />
                    }
                  />
                </div>
                <div className="col col-md-5 align-self-center">
                  <Paper circle={true}>
                    <img src={profilePicture} className="heading_image" />
                  </Paper>
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
                <h1 className="section_heading">Projects</h1>

                {noActiveTech &&
                  'Press the button below to bring back the projects.'}

                <Chips
                  activeTech={activeTech}
                  selected={selectedTech}
                  handleSelect={this.handleChipSelect}
                  handleRequestDelete={this.handleChipRequestDelete}
                />

                <Projects
                  projects={projects}
                  activeTech={activeTech}
                  selected={selectedTech}
                />

                <FloatingActionButton
                  className="projects_floating_button"
                  backgroundColor="#03A9F4"
                  secondary={filterStatus}
                  onTouchTap={this.toggleFilter}
                  mini={true}
                  disabled={restoreStatus}
                >
                  <RestoreIcon />
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

          {/* Experience Section */}
          <section className="container">
            <h1 className="section_heading text-center">Experience</h1>
            <div className="row justify-content-center text-center mb-5">
              <div className="col-5">
                <img src={foodeeLogo} className="experience_logo" />
                <h3>Digital Marketing Coordinator</h3>
                <p className="text-muted">Aug 2016 - Present</p>
              </div>
              <div className="col-5">
                <img src={wrLogo} className="experience_logo" />
                <h3>Co-Founder</h3>
                <p className="text-muted">Jan 2015 - Sep 2016</p>
              </div>
            </div>
            <Divider />
          </section>

          {/* Education */}
          <section className="container">
            <h1 className="section_heading text-center">Education</h1>
            <div className="row justify-content-center text-center mb-5">
              <div className="col-5">
                <img src={iveyLogo} className="experience_logo" />
                <h3>Ivey Business School</h3>
                <p className="text-muted">Class of 2016</p>
              </div>
              <div className="col-5">
                <img src={bcitLogo} className="experience_logo" />
                <h3>Computer Science</h3>
                <p className="text-muted">
                  JavaScript jQuery and Angular courses
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="footer_content">
            <div className="text-center p-4">
              <IconButton iconClassName="fa fa-linkedin text-white" />
              <IconButton iconClassName="fa fa-angellist text-white" />
              <IconButton iconClassName="fa fa-github text-white" />
            </div>
          </section>

        </div>
      </MuiThemeProvider>
    )
  }
}
