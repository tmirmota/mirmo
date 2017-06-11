import React, { Component } from 'react'

// Material UI
import Chip from 'material-ui/Chip'

// Styling
const styles = {
  chip: {
    margin: 6,
    padding: 5,
    borderRadius: '25px',
  },
  label: {
    color: '#FFFFFF',
    fontSize: '1.2rem',
    fontWeight: 100,
  },
  backgroundColor: '#03A9F4',
}

export default class Chips extends Component {
  deleteTech() {
    console.log('tech deleted')
  }
  render() {
    const { activeTech, handleRequestDelete } = this.props
    return (
      <div className="d-flex justify-content-center mb-4">

        {activeTech.map(tech => (
          <Chip
            key={tech}
            onRequestDelete={() => handleRequestDelete(tech)}
            style={styles.chip}
            labelStyle={styles.label}
            backgroundColor={styles.backgroundColor}
          >
            {tech}
          </Chip>
        ))}

      </div>
    )
  }
}
