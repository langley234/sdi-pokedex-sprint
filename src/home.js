import React from 'react';
import Pokemon from './pokemon';
import SinglePokemon from './singlePokemon.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from 'react-router-dom';
  
class Home extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            pokemonData: props.data,
            showingSinglePokePage: false,
            singlePokemonData: null
        }

        this.viewSinglePokemon = this.viewSinglePokemon.bind(this);
    }

    // Current URL: https://my-website.com/page_a
//const nextURL = 'https://my-website.com/page_b';
//const nextTitle = 'My new page title';
//const nextState = { additionalInformation: 'Updated the URL with JS' };

// This will create a new entry in the browser's history, without reloading
//window.history.pushState(nextState, nextTitle, nextURL);

// This will replace the current entry in the browser's history, without reloading
//window.history.replaceState(nextState, nextTitle, nextURL);

    // ****************************************** CALLBACKS **************************************************** //
    viewSinglePokemon(data) {
        //console.log('data received form pokemon ' ,data);
        this.setState({
          showingMainPage: false,
          showingSinglePokePage: true,
          singlePokemonData: data
        });
      }
    // ****************************************** END CALLBACKS **************************************************** //

    render() {
        if (!this.state.showingSinglePokePage) {
            return (
                <div className="App">

                    <header className="App-header">
                        <div>
                            <select name="type-selector" id="pokemon-type-sort">
                                <option onSelect={`this.typeSortSelected`}>No Type</option>
                                {

                                    this.state.typeDataLoaded ?
                                        this.state.pokemonTypeData.map((item) => {
                                            return <option name={item.name}>{item.name}</option>
                                        }) :
                                        <option>Loading...</option>
                                }
                            </select>
                        </div>
                        <div id="grid-container">
                            {this.state.pokemonData.map((item) => {
                                return (
                                    <Pokemon key={this.index++} data={item} singlePokemonCallback={this.viewSinglePokemon.bind(this)} />
                                );
                            })}
                        </div>
                    </header>
                    <div>
                        <a href="./aboutUs.html">About Us</a>
                    </div>
                </div>

            );
        }
        else {
            return (
                
                    <SinglePokemon data={this.state.singlePokemonData} returnCallback={this.stopViewingSinglePokemon} />
                    
                
                
            );
        }

    }
}

export default Home;