import React, { Component } from 'react';
import Character from './components/Character';
import './App.css';

class App extends Component {
  state = {
    persons: null,
  };

  async componentWillMount() {
    try {
      const response = await fetch('https://swapi.co/api/people/');
      if (!response.ok) {
        throw new Error(response.status);
      }
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      this.setState({ persons: jsonResponse.results });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.state.persons) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {this.state.persons.map(person => {
          return <Character key={person.name} name={person.name} birthday={person.birth_year} />;
        })}
      </div>
    );
    // return (
    //   <div className="App">
    //     {people}
    //   </div>
    // );
  }
}

export default App;
