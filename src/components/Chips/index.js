import React, { Component } from 'react'

// Material UI
import Chip from 'material-ui/Chip'

// Styling
const styles = {
  chip: {
    margin: 4,
  },
}

export default class Chips extends Component {
  deleteTech() {
    console.log('tech deleted')
  }
  render() {
    const { activeTech, handleRequestDelete } = this.props
    return (
      <div className="d-flex justify-content-center">
        {activeTech.map(tech => (
          <Chip
            key={tech}
            onRequestDelete={() => handleRequestDelete(tech)}
            style={styles.chip}
            labelStyle={styles.label}
          >
            {tech}
          </Chip>
        ))}
      </div>
    )
  }
}
