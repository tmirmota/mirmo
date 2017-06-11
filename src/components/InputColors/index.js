import React, { Component } from 'react'
import { SwatchesPicker } from 'react-color'

// Material UI
import FlatButton from 'material-ui/FlatButton'

// Styles
const styles = {
  section: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
  },
  inputSection: {
    position: 'relative',
    left: '-50%',
  },
  button: {
    color: '#FFFFFF',
  },
}

export default class InputColors extends Component {
  render() {
    // TODO: Figure out how to pass unique identifier through handleChange
    const { colors, handleChange1, handleChange2, handleSelect } = this.props
    return (
      <section style={styles.section}>
        <div style={styles.inputSection} className="row">

          <div className="col">
            <FlatButton
              label={colors.color1}
              labelStyle={styles.button}
              onClick={() => handleSelect('color1')}
            />
            {colors.swatch1 &&
              <SwatchesPicker
                color={colors.color1}
                onChangeComplete={handleChange1}
              />}
          </div>

          <div className="col">
            <FlatButton
              label={colors.color2}
              labelStyle={styles.button}
              onClick={() => handleSelect('color2')}
            />
            {colors.swatch2 &&
              <SwatchesPicker
                color={colors.color1}
                onChangeComplete={handleChange1}
              />}
          </div>

        </div>
      </section>
    )
  }
}
