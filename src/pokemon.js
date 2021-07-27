import React from 'react';
import './App.css';
//  const { useEffect, useState } = React;


//  const Pokemon = (props) => {
//     const [dataLoaded, setDataLoaded] = useState(null);
//     const [pokemonData, setPokemonData] = useState(null);
//     const [spriteLoaded, setSpriteLoaded] = useState(false);
//     const [viewingPokemonInDepth, setViewingPokemonInDepth] = useState(false);

//      let fetchData = (url) => {
//          fetch(url)
//              .then(result => result.json())
//              .then(
//                  (result) => {
//                      setDataLoaded(true);
//                      setPokemonData(result);
//                  },
//                  (error) => {
//                      console.log(`Error loading pokemon data for ${props.data.name}`)
//                  })
//      };

//      let imageClickCallback = () => {
//          setViewingPokemonInDepth(true);
//      };

//      let viewSinglePokemon = (data) => {
//          props.singlePokemonCallback(pokemonData);
//      };

//     const pokeName = props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1);
     
//     return (
//         <div className={"pokemonEntry"}>
//                 <div>
//                     {dataLoaded ?
//                         pokeName :
//                         `${props.data.name} not yet loaded...`}
//                 </div>
//                 <div>
//                     {dataLoaded ?
//                         <img onClick={viewSinglePokemon} src={pokemonData.sprites.front_default} alt={props.data.name} width={100} height={100} /> :
//                         `${props.data.name} image not yet loaded...`}
//                 </div>
//             </div>
//     );
//  }

class Pokemon extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            dataLoaded: false,
            pokemonData: null,
            spriteLoaded: false,
            viewingPokemonInDepth: false
        }

        this.fetchData = this.fetchData.bind(this);
        this.imageClickCallback = this.imageClickCallback.bind(this);
        this.viewSinglePokemon = this.viewSinglePokemon.bind(this);
    }

    componentDidMount() {
        this.fetchData(this.props.data.url);
    }

    fetchData(url) {
        fetch(url)
            .then(result => result.json())
            .then(
                (result) => {
                    this.setState({
                        dataLoaded: true,
                        pokemonData: result
                    });
                },
                (error) => {
                    console.log(`Error loading pokemon data for ${this.props.data.name}`)
                })
    }
    
    // **************************************  CALLBACKS **************************************//
    imageClickCallback() {
        this.setState({
            viewingPokemonInDepth: true
        })
    }

    viewSinglePokemon(data) {
        this.props.singlePokemonCallback(this.state.pokemonData);
    }
    // **************************************END CALLBACKS ************************************//
    render() {
        const pokeName = this.props.data.name.charAt(0).toUpperCase() + this.props.data.name.slice(1);
        return (
            <div className={"pokemonEntry"}>
                <div>
                    {this.state.dataLoaded ?
                        pokeName :
                        `${this.props.data.name} not yet loaded...`}
                </div>
                <div>
                    {this.state.dataLoaded ?
                        <img onClick={this.viewSinglePokemon} src={this.state.pokemonData.sprites.front_default} alt={this.props.data.name} width={100} height={100} /> :
                        `${this.props.data.name} image not yet loaded...`}
                </div>
            </div>
        );
    }
}

 export default Pokemon;