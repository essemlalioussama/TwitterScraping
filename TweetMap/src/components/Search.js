import { Component } from "react";

class Search extends Component {
  
    constructor(props){
        super(props);
        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        fetch("http://localhost:9000/tweetscount?topic=".concat(this.state.value))
            .then(res => res.json())
            .then((result) => this.props.setSearchResult(result));
        this.props.setSelectedCity(null);
        this.props.setSearchTopic(this.state.value);
        this.setState({value: ''});
        event.preventDefault();
    }

  
    render() {
    return (
        <form id="searchForm" onSubmit={this.handleSubmit}>
          <label htmlFor="header-search">
            <span className="visually-hidden">Chercher les topics : </span>
          </label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            id="searchTerm"
            placeholder="Ex: Covid, Sport ... "
          />
          <button id="searchButton" type="submit">Chercher</button>
        </form>
      );
  }
}

export default Search;
