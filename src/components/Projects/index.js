import React, { Component } from 'react'
import _ from 'lodash'

// Material UI
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

// Styling
const style = {
  minHeight: 100,
}

export default class Projects extends Component {
  render() {
    const { projects, activeTech } = this.props
    if (projects) {
      return (
        <div className="row">

          {projects.map((project, index) => {
            const validTech = _.difference(project.technologies, activeTech)
            if (validTech.length === 0) {
              return (
                <div className="col-4" key={index}>
                  <Paper style={style}>

                    <h3 className="pt-4">{project.title}</h3>

                    {/* Technologies Used */}
                    <div>
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-muted"> {tech} </span>
                      ))}
                    </div>

                    <div className="py-3">
                      <FlatButton label="Demo" />
                      <FlatButton
                        label="Github"
                        icon={<i className="fa fa-github" />}
                      />
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
