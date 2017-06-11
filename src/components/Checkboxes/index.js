import React, { Component } from 'react'

// Material UI
import Checkbox from 'material-ui/Checkbox'

// Styling
const styles = {
  iconStyle: {
    fill: '#03A9F4',
  },
}

export default class Checkboxes extends Component {
  render() {
    const { handleCheck, activeTech, allTech } = this.props
    if (allTech) {
      return (
        <div className="row text-left justify-content-center mb-5">
          <div className="col-2">

            {allTech.map(tech => {
              const isChecked = activeTech.indexOf(tech) > -1
              const checked = isChecked ? true : false
              const checkedStyle = isChecked ? styles.iconStyle : null
              return (
                <Checkbox
                  key={tech}
                  label={tech}
                  iconStyle={checkedStyle}
                  checked={checked}
                  onCheck={() => handleCheck(tech)}
                />
              )
            })}

          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
