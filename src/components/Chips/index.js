import React, { Component } from 'react'

// Material UI
import Chip from 'material-ui/Chip'

export default class Chips extends Component {
  deleteTech() {
    console.log('tech deleted')
  }
  render() {
    const { technologies } = this.props
    return (
      <div>
        {technologies.map(tech => (
          <Chip key={tech} onRequestDelete={this.deleteTech}>{tech}</Chip>
        ))}
      </div>
    )
  }
}
