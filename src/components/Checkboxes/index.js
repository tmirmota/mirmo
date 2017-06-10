import React, { Component } from 'react'

// Material UI
import Checkbox from 'material-ui/Checkbox'

export default class Checkboxes extends Component {
  componentWillMount() {
    const { technologies } = this.props
    this.setState({ technologies })
  }
  render() {
    const { technologies } = this.state
    if (technologies) {
      return (
        <div>
          {technologies.map(tech => <Checkbox key={tech} label={tech} />)}
        </div>
      )
    } else {
      return null
    }
  }
}
