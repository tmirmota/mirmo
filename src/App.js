import React, { Component } from 'react'
import update from 'immutability-helper'
import logo from './picatic-logo.svg'
import picaticLogo from './picatic-p.svg'
import _ from 'lodash'
import './App.css'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import InputColors from './components/InputColors'

export default class App extends Component {
  state = {
    headerColors: {
      color1: '#7F00FF',
      color2: '#E100FF',
      swatch1: false,
      swatch2: false
    }
  }

  componentWillMount() {
    this.setState({ windowWidth: window.innerWidth })
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
          swatch2: { $set: false }
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
          swatch2: { $set: true }
        })
        this.setState({ headerColors: openSwatch })
      }
    }
  }

  handleColorChange1 = ({ hex }) => {
    const { headerColors } = this.state
    const updateColor = update(headerColors, {
      color1: { $set: hex },
      swatch1: { $set: false }
    })
    this.setState({ headerColors: updateColor })
  }

  handleColorChange2 = ({ hex }) => {
    const { headerColors } = this.state
    const updateColor = update(headerColors, {
      color2: { $set: hex },
      swatch2: { $set: false }
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

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  render() {
    const { headerColors, selectedTech, windowWidth } = this.state

    // Styling
    const styles = {
      header: {
        background: `linear-gradient(to bottom right, ${headerColors.color1}, ${headerColors.color2})`,
        minHeight: '100vh'
      }
    }

    const background = {
      background: `url(${picaticLogo}) center right no-repeat / cover`
    }

    const phone = windowWidth < 480

    const company = (
      <div>
        <a href="https://www.picatic.com/" target="_blank">
          <img src={logo} className="rc-logo" />
        </a>
        <br />
        <Typography type="subheading" className="rc-title">
          API Growth Developer
        </Typography>
        <Typography type="caption">Jul '17 - Present</Typography>
      </div>
    )

    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <div className="row">
            {!phone && (
              <div className="col lc" style={background}>
                <div className="lc-jumbotron">
                  <div className="lc-title">thomas mirmo</div>
                </div>
              </div>
            )}

            <div className="col rc">
              {phone && <div className="lc-title">thomas mirmo</div>}
              <div>
                <a href="https://www.picatic.com/" target="_blank">
                  <img src={logo} className="rc-logo" />
                </a>
              </div>
              <div>
                <Typography type="subheading" className="rc-title">
                  API Growth Developer
                </Typography>
              </div>
              <div>
                <Typography type="caption">Jul '17 - Present</Typography>
              </div>
              <div className="rc-footer">
                <IconButton href="https://github.com/tmirmota" target="_blank">
                  <i className="fa fa-github" />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/thomasmirmotahari"
                  target="_blank"
                >
                  <i className="fa fa-linkedin" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
