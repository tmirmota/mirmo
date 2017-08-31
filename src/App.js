import React, { Component } from 'react'
import update from 'immutability-helper'
import logo from './picatic-logo.svg'
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

  render() {
    const {
      activeTech,
      allTech,
      filterStatus,
      headerColors,
      selectedTech
    } = this.state

    // Styling
    const styles = {
      header: {
        background: `linear-gradient(to bottom right, ${headerColors.color1}, ${headerColors.color2})`,
        minHeight: '100vh'
      }
    }

    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col lc">
              <div className="lc-jumbotron">
                <div className="lc-title">thomas mirmo</div>
              </div>
              {/* <div className="lc-colors">
                <InputColors
                colors={headerColors}
                handleChange1={this.handleColorChange1}
                handleChange2={this.handleColorChange2}
                handleSelect={this.handleColorSelect}
              />
              </div> */}
            </div>

            <div className="col text-center">
              <img src={logo} className="rc-logo" />
              <br />
              <Typography type="subheading" className="rc-title">
                API Growth Developer
              </Typography>
              <Typography type="caption">Jul '17 - Present</Typography>
              <div className="rc-icon">
                <IconButton>
                  <i
                    className="fa fa-github"
                    href="https://github.com/tmirmota"
                    target="_blank"
                  />
                </IconButton>
                <IconButton>
                  <i
                    className="fa fa-linkedin"
                    href="https://www.linkedin.com/in/thomasmirmotahari"
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
