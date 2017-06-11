import React, { Component } from 'react'

// Material UI
import Checkbox from 'material-ui/Checkbox'

export default class Checkboxes extends Component {
  render() {
    const { handleCheck, activeTech, allTech } = this.props
    if (allTech) {
      return (
        <div className="row text-left justify-content-center">
          <div className="col-2">

            {allTech.map(tech => {
              const isChecked = activeTech.indexOf(tech) > -1
              const checked = isChecked ? true : false
              return (
                <Checkbox
                  key={tech}
                  label={tech}
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
