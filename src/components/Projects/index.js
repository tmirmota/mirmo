import React, { Component } from 'react'
import _ from 'lodash'

// Material UI
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

// Styling
const styles = {
  paper: {
    height: '100%',
    padding: 0,
  },
  image: {
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
  },
  buttons: {
    border: '1px solid #212121',
    height: '100%',
    marginRight: 3,
    marginLeft: 3,
  },
}

export default class Projects extends Component {
  render() {
    const { projects, activeTech, selected } = this.props
    if (projects) {
      return (
        <div className="row justify-content-center">

          {projects.map((project, index) => {
            const { title, technologies, image, url, github } = project
            const validTech = _.difference(technologies, activeTech)
            const isSelected = technologies.indexOf(selected) > -1
            const paperDepth = isSelected ? 5 : 1
            if (validTech.length === 0) {
              return (
                <div className="col-sm-12 col-md-4 mb-4" key={index}>
                  <Paper style={styles.paper} zDepth={paperDepth}>
                    <a href={url} target="_blank">
                      <img
                        src={image}
                        className="img-fluid"
                        style={styles.image}
                      />
                    </a>
                    <div className="p-3">
                      <h3 className="pt-2">{title}</h3>

                      {/* Technologies Used */}
                      {technologies.map((tech, index) => {
                        const isLastTech = technologies.length - 1 === index
                        const isSecondLastTech =
                          technologies.length - 2 === index
                        return (
                          <span key={tech} className="text-muted">
                            {!isLastTech && !isSecondLastTech && tech + ', '}
                            {isSecondLastTech && tech + ' & '}
                            {isLastTech && tech}
                          </span>
                        )
                      })}

                      <div className="mt-2">
                        {github &&
                          <FlatButton
                            label="Github"
                            icon={<i className="fa fa-github" />}
                          />}
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
