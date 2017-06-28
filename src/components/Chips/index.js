import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

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
}

export default class Chips extends Component {
  render() {
    const {
      activeTech,
      selected,
      handleSelect,
      handleRequestDelete,
    } = this.props
    return (
      <div className="d-flex justify-content-center mb-5">

        {activeTech.map(tech => {
          const isSelected = tech === selected
          const backgroundColor = isSelected ? '#FF4081' : '#03A9F4'
          return (
            <Motion defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
              {interpolatingStyle => (
                <Chip
                  key={tech}
                  style={styles.chip}
                  labelStyle={styles.label}
                  backgroundColor={backgroundColor}
                  onTouchTap={() => handleSelect(tech)}
                  onRequestDelete={() => handleRequestDelete(tech)}
                >
                  {tech}
                </Chip>
              )}
            </Motion>
          )
        })}

      </div>
    )
  }
}
