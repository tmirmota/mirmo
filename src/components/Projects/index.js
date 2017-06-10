import React, { Component } from 'react'
import _ from 'lodash'

// Material UI
import Paper from 'material-ui/Paper'

// Styling
const style = {
  height: 60,
}

export default class Projects extends Component {
  render() {
    const { projects, technologies } = this.props
    if (projects) {
      return (
        <div className="row">

          {projects.map((project, index) => {
            const validTech = _.difference(project.technologies, technologies)
            if (validTech.length === 0) {
              return (
                <div className="col-4" key={index}>
                  <Paper>
                    {project.title}
                    <div>
                      {project.technologies.map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </Paper>
                </div>
              )
            } else {
              return null
            }
          })}

        </div>
      )
    } else {
      return null
    }
  }
}
