import logo from './logo.svg';
import './App.css';
import React from 'react';
import About from './about.js';
import Pokemon from './pokemon';
import SinglePokemon from './singlePokemon.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

let HOME_PATH = '';
let POKEMON_PATH = '/pokemon'

let MAX_DATA = 151;

class App extends React.Component 
{
  constructor(props)
  {
    super(props);
    
    this.state = {
      dataLoaded: false,
      summaryPokemonData: null,
      detailedPokemonData: null,
      typeDataLoaded: false,
      pokemonTypeData: null,
      showingLoadingPage: true,
      showingMainPage: false,
      showingSinglePokePage: false,
      singlePokemonData: null,
      pageNotFound: false
    }

    this.detailedPokemonData = [];
    this.summaryPokemonData = [];
    this.path = '';

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

    // resolve path name
    if (window.location.pathname.toString() !== HOME_PATH && window.location.pathname.toString() !== `/`)
    {
      let name = window.location.pathname;
      if (!name.includes(POKEMON_PATH))
      {
        this.setState({
          pageNotFound: true,
          showingLoadingPage: false
        })
      }
      name = name.substring(name.lastIndexOf('/') + 1);
      this.path = name;
    }
  }

  fetchData(url = `https://pokeapi.co/api/v2/pokemon/ditto`) {
    fetch(url)
      .then(result => result.json())
      .then((result) => {
        this.summaryPokemonData = result.results;
      })
      .then(() => {
        Promise.all(this.summaryPokemonData.map((item) => {
          return fetch(item.url)
            .then(result => result.json())
            .then((result) => {
              //console.log('ppp');
              this.detailedPokemonData.push(result);
            })
        }))
          .then(() => {
            // console.log(this.detailedPokemonData);
            // console.log("DONE");

            console.log('PATH HERE', this.path);

            if (this.path === HOME_PATH) {
              //console.log('executing here');
              this.setState({
                summaryPokemonData: this.summaryPokemonData,
                showingMainPage: true,
                showingLoadingPage: false,
                detailedPokemonData: this.detailedPokemonData,
                dataLoaded: true
              });
            }
            else {
              let pageFound = false;

              for (let i = 0; i < this.detailedPokemonData.length; i++) {
                if (this.detailedPokemonData[i].name === this.path) {
                  pageFound = true;
                  this.setState({
                    summaryPokemonData: this.summaryPokemonData,
                    showingMainPage: true,
                    showingLoadingPage: false,
                    detailedPokemonData: this.detailedPokemonData,
                    dataLoaded: true,
                    singlePokemonData: this.detailedPokemonData[i]
                  })
                }
              }

              if (!pageFound)
              {
                this.setState({
                  pageNotFound: true,
                  showingLoadingPage: false
                });
              }  
            }
          })
      })


  }

  fetchTypes(url = `https://pokeapi.co/api/v2/type`)
  {
    fetch(url)
      .then(result => result.json())
      .then((result) => {
       // console.log('result in type fetch call : ', result.results);
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
     this.setState({
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
    //let x = document.getElementById('pokemon-type-sort');

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
            <button>About Us</button>
          </div>
        </div>
      );
    }
    else if (this.state.pageNotFound)
    {
      return (
        <div>
          <h2>Page Not Found</h2>
        </div>
      );
    }
    else if (this.state.showingMainPage)
    {
      return (
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="App">
                <header className="App-header">
                  <div>
                    <select name="type-selector" id="pokemon-type-sort">
                      <option onSelect={this.typeSortSelected}>No Type</option>
                      {

                        this.state.typeDataLoaded ?
                          this.state.pokemonTypeData.map((item) => {
                            return <option key={this.index++} name={item.name}>{item.name}</option>
                          }) :
                          <option>Loading...</option>
                      }
                    </select>
                  </div>
                  <div id="grid-container">
                    {console.log(`path : ${window.location.pathname}`)}
                    {this.state.detailedPokemonData.map((item) => {
                      return <Pokemon key={this.index++} data={item} singlePokemonCallback={this.viewSinglePokemon} />
                    })}
                  </div>
                </header>
              </div>
              <div>
                <ul>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
            </Route>

            <Route path="/about">
              <About />
            </Route>
            
            <Route path={`/pokemon/`}>
              <SinglePokemon data={this.state.singlePokemonData} returnCallback={this.stopViewingSinglePokemon} />
            </Route>
          </Switch>
        </Router>
      )
        
        
    }
    // else if (this.state.showingSinglePokePage) {
    //   return (
    //     <SinglePokemon data={this.state.singlePokemonData} returnCallback={this.stopViewingSinglePokemon} />
    //   );
    //}
  }
}

export default App;
