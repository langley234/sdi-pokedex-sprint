import logo from './logo.svg';
import './App.css';
import React from 'react';
import Pokemon from './pokemon';
import SinglePokemon from './singlePokemon.js';

let MAX_DATA = 151;

class App extends React.Component 
{
  constructor(props)
  {
    super(props);
    
    this.state = {
      dataLoaded: false,
      pokemonData: null,
      typeDataLoaded: false,
      pokemonTypeData: null,
      showingLoadingPage: true,
      showingMainPage: false,
      showingSinglePokePage: false,
      singlePokemonData: null
    }

    this.index = 0;

    this.fetchData = this.fetchData.bind(this);
    this.fetchTypes = this.fetchTypes.bind(this);
    this.viewSinglePokemon = this.viewSinglePokemon.bind(this);
    this.stopViewingSinglePokemon = this.stopViewingSinglePokemon.bind(this);
    this.typeSortSelected = this.typeSortSelected.bind(this);
  }

  componentDidMount() 
  {
    // fetch the pokemon data that contains a name and url to get more specific data
    this.fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_DATA}`);
    // fetch a list of types of pokemon to use for the drop-down selector
    this.fetchTypes(`https://pokeapi.co/api/v2/type`);
  }

  fetchData(url = `https://pokeapi.co/api/v2/pokemon/ditto`)
  {
    fetch(url)
      .then(result => result.json())
      .then((result) => {
        //console.log('result in data fetch call : ', result.results);
        this.setState({
          dataLoaded: true,
          pokemonData: result.results,
          showingMainPage: true,
          showingLoadingPage: false
        });
      },
      (error) => {
        console.log(`Error loading pokemon data in App.js`)
    })
  }

  fetchTypes(url = `https://pokeapi.co/api/v2/type`)
  {
    fetch(url)
      .then(result => result.json())
      .then((result) => {
        console.log('result in type fetch call : ', result.results);
        this.setState({
          typeDataLoaded: true,
          pokemonTypeData: result.results
        });
      },
      (error) => {
        console.log(`Error loading pokemon types in app.js`)
    })
  }
  // ********************************CALLBACKS*********************************** //
  viewSinglePokemon(data) {
    //console.log('data received form pokemon ' ,data);
    this.setState({
      showingMainPage: false,
      showingSinglePokePage: true,
      singlePokemonData: data
    });
  }

  stopViewingSinglePokemon() {
    this.setState({
      showingMainPage: true,
      showingSinglePokePage: false
    });
  }

  typeSortSelected() {
    let x = document.getElementById('pokemon-type-sort');

    console.log('type : ', x);
  }
  //******************************END CALLBACKS********************************** //

  render() {
    if (this.state.showingLoadingPage)
    {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />      
          </header>
          <div>
            <a>About Us</a>
          </div>
        </div>
      );
    }
    else if (this.state.showingMainPage)
    {
      return (
        <div className="App">
          <header className="App-header">
            <div>
              <select name="type-selector" id="pokemon-type-sort">
              <option onSelect={`this.typeSortSelected`}>No Type</option>
                {
                  
                  this.state.typeDataLoaded ?
                  this.state.pokemonTypeData.map((item) => {
                  return <option name={item.name}>{item.name}</option>}) :
                  <option>Loading...</option>
                }
              </select>
            </div>
            <div id= "grid-container">
              {this.state.pokemonData.map((item) => {
                return <Pokemon key={this.index++} data={item} singlePokemonCallback={this.viewSinglePokemon}/>
              })}
            </div>      
          </header>
          <div>
            <a href="./aboutUs.html">About Us</a>
          </div>
        </div>
      )
    }
    else if (this.state.showingSinglePokePage)
    {
      return (
        <SinglePokemon data={this.state.singlePokemonData} returnCallback={this.stopViewingSinglePokemon} />
      );
    }
  }
}

export default App;
