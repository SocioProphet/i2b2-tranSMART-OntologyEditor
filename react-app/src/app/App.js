import React, { Component } from 'react';
// import ProjectDropdown from './home/ProjectsDropDownContainer';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import Home from './home/'
// import ContextMenu from './context'

class App extends Component {
    state = {
        characters: []
    };

    removeCharacter = index => {
        const { characters } = this.state;

        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index;
            })
        });
    }

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
    }

    render() {
        // const { characters } = this.state;

        return (
          <div>
            <Home />
          </div>

        );
    }
}

export default App;
