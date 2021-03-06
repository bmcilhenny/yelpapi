import React from 'react';
import './SearchBar.css';


const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count"
}

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? 'active' : '';
  }


  // handles another search without forcing user to hit search if they switch filter
  handleSortByChange(sortByOption) {
    let oldSortby = this.state.sortBy
    this.setState({
      sortBy: sortByOption
    }, () => {
        if (this.readyToSearchAgain(oldSortby)) {
          this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
        }
    })
  }

  readyToSearchAgain(oldSortBy) {
    debugger;
    return this.state.term && this.state.location && this.state.sortBy !== oldSortBy ? true : false;
  }


  handleTermChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
  }

  renderSortByOptions() {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return <li
        className={this.getSortByClass(sortByOptionValue)}
        key={sortByOptionValue}
        onClick={() => this.handleSortByChange(sortByOptionValue)}>
        {sortByOption}
      </li>
    })
  }

  renderErrors() {
    return (
      <div className="alert">
        That was a "{this.props.errors.statusText}", make sure there are no typos.
      </div>
    )
  }


  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBarContent">
          <h1>Gurgle</h1>
          <div className="SearchBar-sort-options">
            <ul>
              {console.log("Inside the Search Bar render", this.state.sortBy)}
              {this.renderSortByOptions()}
            </ul>
          </div>
          <div className="SearchBar-fields">
            <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
          </div>
          <div className="SearchBar-submit" onClick={this.handleSearch}>
            <a>Let's Go</a>
          </div>
        </div>
        <div className="SearchBar-errors">
          {this.props.errors ? this.renderErrors() : null}
        </div>
      </div>
    )
  }
}

export default SearchBar;
