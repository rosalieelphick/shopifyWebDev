import React, { Component } from 'react';
import './App.css';
import Results from './components/Results';
import List from './components/List';
import axios from 'axios';

let dataArray = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    }
  }

  search = (searchQuery) => {
    axios({
      method: 'GET',
      url: `https://api.github.com/search/repositories?q={${searchQuery}}&per_page=10`,
      dataResponse: 'json'
    }).then((res) => {
      res.data.items.forEach((result) => {
        let obj = {
          "name": result.full_name,
          "language": result.language,
          "url": result.html_url,
          "added": false
        }
        dataArray.push(obj);
      });
      this.releaseCall();
    });
  }

  releaseCall = () => {
    dataArray.forEach((item) => {
      let index = dataArray.indexOf(item)
      axios({
        method: 'GET',
        url: `https://api.github.com/repos/${item.name}/releases`,
        dataResponse: 'json'
      }).then((res) => {
        if (res.data.length > 0) {
          dataArray[index].tag = res.data[0].tag_name
        } else {
          dataArray[index].tag = "-"
        }
        this.setState({
          results: dataArray
        })    
      })
    })
  }

  handleAdd = (index) => {
    let favoriteArray = Array.from(this.state.favorites);
    let listArray = Array.from(this.state.results);

    listArray[index].added = true;
    listArray[index].originalIndex = index;

    favoriteArray.push(listArray[index]);
    
    this.setState({
      favorites: favoriteArray,
      results: listArray
    })
  }

  handleRemove = (indexRemove) => {
    let favoriteArray = Array.from(this.state.favorites);
    let originalIndex = favoriteArray[indexRemove].originalIndex;
    
    let listArray = Array.from(this.state.results)
    listArray[originalIndex].added = false;

    favoriteArray.splice(indexRemove, 1)

    this.setState({
      favorites: favoriteArray,
      results: listArray
    })

  }

  clearFields = () => {
    dataArray = [];
    this.setState({
      results: []
    })
  }

  render() {
    return (
      <div className="App">

        <header>
          <h1>My Github Favorites</h1>
        </header>

        <main>
          <Results 
            search={this.search}
            results={this.state.results} 
            handleAdd={this.handleAdd}
            clearFields={this.clearFields}
          />

          <List 
            favorites={this.state.favorites}
            handleRemove={this.handleRemove}
          />
        </main>

      </div>
    );
  }
}

export default App;
