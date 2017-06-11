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
  centerSection: {
    position: 'relative',
    left: '-50%',
  },
  button: {
    color: '#FFFFFF',
  },
  swatch: {
    position: 'absolute',
    top: '-250px',
    left: '50%',
  },
}

export default class InputColors extends Component {
  render() {
    // TODO: Figure out how to pass unique identifier through handleChange
    const { colors, handleChange1, handleChange2, handleSelect } = this.props
    return (
      <section style={styles.section}>
        <div style={styles.centerSection} className="row">

          <div className="col">
            <FlatButton
              label={colors.color1}
              labelStyle={styles.button}
              onClick={() => handleSelect('color1')}
            />
            {colors.swatch1 &&
              <div style={styles.swatch}>
                <div style={styles.centerSection}>
                  <SwatchesPicker
                    color={colors.color1}
                    onChangeComplete={handleChange1}
                  />
                </div>
              </div>}
          </div>

          <div className="col">
            <FlatButton
              label={colors.color2}
              labelStyle={styles.button}
              onClick={() => handleSelect('color2')}
            />
            {colors.swatch2 &&
              <div style={styles.swatch}>
                <div style={styles.centerSection}>
                  <SwatchesPicker
                    color={colors.color2}
                    onChangeComplete={handleChange2}
                  />
                </div>
              </div>}
          </div>

        </div>
      </section>
    )
  }
}
