import { connect } from 'react-redux'
import NavBar from './NavBarComponent'
import {projectDataOperations} from '../tree/duck/'
import {projetcsOperations} from './duck/'

const mapStateToProps = (state) => ({
  projects:state.navBarData.projects.projects,
})

const mapDispatchToProps = (dispatch) => ({
  onSelect: (eventKey,event) => {
    dispatch(projectDataOperations.initAndFetchLastVersionProject(eventKey));
  },
  showCreateProjectModal: () => {
    dispatch(projetcsOperations.showCreateProjectModal())
  },
  hideCreateProjectModal: () => {
    dispatch(projetcsOperations.hideCreateProjectModal())
  }

})

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)
