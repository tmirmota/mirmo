import React, { Component } from 'react'

// Material UI
import TextField from 'material-ui/TextField'

// Styles
const styles = {
  section: {
    position: 'absolute',
    bottom: 5,
    left: '50%',
  },
  inputSection: {
    position: 'relative',
    left: '-50%',
  },
}

export default class InputColors extends Component {
  render() {
    const { colors } = this.props
    return (
      <div style={styles.section}>
        <div style={styles.inputSection}>
          <TextField hintText={colors.color1} />
        </div>
      </div>
    )
  }
}
