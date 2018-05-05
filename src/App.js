import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import {apiKey, clientId } from './secrets.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      errors: ''
    }

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      if (businesses.errors) {
        this.setState({
          errors: businesses.errors
        })
      } else {
        this.setState({
          businesses: businesses,
          errors: ''
        })
      }
    })
    // console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
  }

  renderErrors() {

  }

  render() {
    return (
      <div className="App">
        <SearchBar searchYelp={this.searchYelp} errors={this.state.errors}/>
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;
