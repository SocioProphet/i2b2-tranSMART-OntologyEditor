import React from 'react';
import Table from 'react-bootstrap/Table'
import Project from './ProjectComponent'

const Projects = ({projects,onViewProjectTree,deleteProject}) => {

    const buildProjects = (projects) => {
        return projects
                .filter(item =>item.status!=="deleted")
                .map((item,n) =>
                  <Project key={n} index={n} project={item} onViewProjectTree={onViewProjectTree} deleteProject={deleteProject}/>
                )
    }

    const nDeleted = (projects) => {
      let nDeleted = 0;
      projects.forEach((item) => {
        if(item.status === "deleted"){
          nDeleted = nDeleted + 1;
        }
      })
      return nDeleted;
    }
    return(
      <div>
      <h1>Projects list (Deleted {nDeleted(projects)})</h1>

      <div>
        <Table striped bordered hover size="sm" className="vw-25">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Creation date</th>
              <th>Last version</th>
              <th>Last version date</th>
            </tr>
          </thead>
          <tbody>
            {buildProjects(projects)}
          </tbody>
        </Table>
      </div>
      </div>
    )
}

export default Projects;
