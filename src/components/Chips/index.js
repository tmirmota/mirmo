import React, { Component } from 'react'

// Material UI
import Chip from 'material-ui/Chip'

export default class Chips extends Component {
  deleteTech() {
    console.log('tech deleted')
  }
  render() {
    const { technologies, handleRequestDelete } = this.props
    return (
      <div>
        {technologies.map(tech => (
          <Chip key={tech} onRequestDelete={() => handleRequestDelete(tech)}>
            {tech}
          </Chip>
        ))}
      </div>
    )
  }
}
