import React, { Component } from 'react'

// Material UI
import Checkbox from 'material-ui/Checkbox'

export default class Checkboxes extends Component {
  componentWillMount() {
    const { technologies } = this.props
    this.setState({ allTech: technologies })
  }
  render() {
    const { handleCheck, technologies } = this.props
    const { allTech } = this.state
    if (allTech) {
      return (
        <div>
          {allTech.map(tech => {
            const isChecked = technologies.indexOf(tech) > -1
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
      )
    } else {
      return null
    }
  }
}
