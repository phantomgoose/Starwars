import React, { Component } from 'react';
import Character from './components/Character';
import './App.css';

class App extends Component {
  state = {
    pages: [],
    page: 0,
  };

  async componentDidMount() {
    try {
      const response = await fetch('https://swapi.co/api/people/');
      if (!response.ok) {
        throw new Error(response.status);
      }
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      this.setState({ pages: this.state.pages.concat(jsonResponse) });
    } catch (err) {
      console.log(err);
    }
  }

  handleNext = async () => {
    if (this.state.pages[this.state.page + 1] !== undefined) {
      this.setState({ page: this.state.page + 1 });
    } else {
      const currentPage = this.state.pages[this.state.page];
      try {
        const response = await fetch(currentPage.next);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        this.setState(prevState => {
          return { pages: this.state.pages.concat(jsonResponse), page: prevState.page + 1 };
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleBack = () => {
    if (this.state.pages[this.state.page - 1] !== undefined) {
      this.setState(prevState => {
        return { page: prevState.page - 1 };
      });
    }
  };

  render() {
    if (this.state.pages.length < 1) {
      return <p>Loading...</p>;
    }
    const currentPage = this.state.pages[this.state.page];
    console.log(currentPage);
    return (
      <div>
        {currentPage.results.map(person => {
          return <Character key={person.name} name={person.name} birthday={person.birth_year} />;
        })}
        <button onClick={this.handleBack}>Back</button>
        <button onClick={this.handleNext}>Next</button>
      </div>
    );
  }
}

export default App;
