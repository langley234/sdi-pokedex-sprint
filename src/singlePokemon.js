import React from 'react';
import './App.css';
//import React, { useState } from 'react';

class SinglePokemon extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    // ********************************CALLBACKS*********************************** //
    // ********************************END CALLBACKS*********************************** //

    render()
    {
        console.log('forms : ', this.props.data.forms);
        const pokeName = this.props.data.name.charAt(0).toUpperCase() + this.props.data.name.slice(1);
        return (
            <div class={`pokePage`}>
                <div className="poke-page-pokemon-name"><h1>{pokeName}</h1></div>
                
                <img class={'poke-pic'} src={this.props.data.sprites.front_default} alt={pokeName} width={100} height={100} />
                <p className="poke-page-abilities-p">{`Abilities : ${this.props.data.abilities.map((item) => {
                    return (`[${item.ability.name}]`);
                })}`}</p>
                <div>
                    <h1>Moves</h1>
                    <ul className="poke-moves">
                        {this.props.data.moves.map((item) => {
                            return <li>{item.move.name}</li>
                        })}
                    </ul>
                </div>
                
                <button onClick={this.props.returnCallback}>Click to Return</button>
                <div>
                    <a href="./aboutUs.html">About Us</a>
                </div>
            </div>
        );
    }
}

export default SinglePokemon;