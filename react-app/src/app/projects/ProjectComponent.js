import React from 'react';


import { FaEye,FaFileExport,FaTrash } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

const Project = ({index,project,history,onViewProjectTree,deleteProject}) => {
  const formatDate = (date) => (
    new Date(date).toLocaleDateString()+ " - " + new Date(date).toLocaleTimeString()
  )

  const handleViewProjectTree = (projectId) => {
    history.push("/tree")
    onViewProjectTree(projectId);
  }

  // const handleDeleteProject = (projectId) => {
  //   onViewProjectTree(projectId);
  // }

  return(
        <tr >
          <td ><h3>
            <FaEye className="text-primary ml-1" onClick={(event) => handleViewProjectTree(project._id)}/>
            <FaFileExport  className="text-success ml-2" />
            <FaTrash  className="text-danger ml-1" onClick={(event) => deleteProject(project._id)} />
          </h3></td>
          <td onClick={(event) => handleViewProjectTree(project._id)}>{project.name}</td>
          <td onClick={(event) => handleViewProjectTree(project._id)}>{formatDate(project.creation_date)}</td>
          <td onClick={(event) => handleViewProjectTree(project._id)}>{project.current_version}</td>
          <td onClick={(event) => handleViewProjectTree(project._id)}>{formatDate(project.version_date)}</td>

        </tr>
    )
}

export default withRouter(Project);
