import React, { Component } from 'react'
import _ from 'lodash'

// Material UI
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

// Styling
const styles = {
  paper: {
    minHeight: 100,
  },
  buttons: {
    borderRight: '1px solid #212121',
  },
}

export default class Projects extends Component {
  render() {
    const { projects, activeTech } = this.props
    if (projects) {
      return (
        <div className="row justify-content-center">

          {projects.map((project, index) => {
            const { title, technologies } = project
            const validTech = _.difference(technologies, activeTech)
            if (validTech.length === 0) {
              return (
                <div className="col-4 mb-4" key={index}>
                  <Paper style={styles.paper}>

                    <h3 className="pt-4">{title}</h3>

                    {/* Technologies Used */}
                    <div>
                      {technologies.map((tech, index) => {
                        const isLastTech = technologies.length - 1 === index
                        const isSecondLastTech =
                          technologies.length - 1 === index
                        return (
                          <span key={tech} className="text-muted">
                            {!isLastTech && !isSecondLastTech && tech + ', '}
                            {isSecondLastTech && tech}
                            {isLastTech && ' & ' + tech}
                          </span>
                        )
                      })}
                    </div>

                    <div className="row py-3">
                      <div className="col text-right" style={styles.buttons}>
                        <FlatButton label="Demo" />
                      </div>
                      <div className="col text-left">
                        <FlatButton
                          label="Github"
                          icon={<i className="fa fa-github" />}
                        />
                      </div>
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
