import { connect } from 'react-redux'
import Projects from './ProjectsComponent'
import {projectDataOperations} from '../tree/duck/'
import {projectsOperations} from './duck/'

const mapStateToProps = (state) => ({
  projects:state.navBarData.projects.projects,
})

const mapDispatchToProps = (dispatch) => ({
  onViewProjectTree: (projectId) => {
    dispatch(projectDataOperations.initAndFetchLastVersionProject(projectId));
  },
  deleteProject: (projectId) => {
    dispatch(projectsOperations.deleteProject(projectId));
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(Projects)
