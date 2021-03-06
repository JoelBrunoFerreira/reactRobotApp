import React, { Component } from 'react';
// import { robots } from './assets/robots'; -> before componentDidMount lifecycle
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import Scroll from './components/Scroll';
import './App.css';

class App extends Component {
  constructor() {
    super();
      this.state = {
        robots: [],
        searchField: ''
      }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
       return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      })
  }

  searchBoxHandler = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render() {
      const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    if(this.state.robots.length === 0) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox onSearchChange={this.searchBoxHandler} />
            <Scroll>
               <CardList robots={filteredRobots} />
            </Scroll>
       </div>
      )
    }
  }
}

export default App;
