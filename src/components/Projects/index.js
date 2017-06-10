import React, { Component } from 'react'

export default class Projects extends Component {
  render() {
    const { projects } = this.props
    if (projects) {
      const block = projects.map((project, index) => (
        <p key={index}>{project.title}</p>
      ))
      return <span>{block}</span>
    } else {
      return null
    }
  }
}
