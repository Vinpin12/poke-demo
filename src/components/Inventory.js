import '../styles/inventory.css';
import '../App.css'
import React from 'react';

class Inventory extends React.Component {




  constructor(){
    super();
    this.state = {
      inventory: JSON.parse(localStorage.getItem('inventory'))
    }
  }

  release(e) {
    var id = e.target.id;
    var temp_inventory = this.state.inventory;
    temp_inventory.splice(id, 1)
    localStorage.setItem('inventory', temp_inventory);
    this.setState({

    })
  }

  render() {
    var inventory = this.state.inventory;
    const pokemon = []
    var unique_pokemon = [];
    if (inventory) {
      for (var i = 0; i < inventory.length; i++) {
          pokemon.push(<div id={i} key={i}>
            <div className="grid-item" key={inventory[i]['catchid']}>
            <p className={inventory[i]['shiny'] ? 'shiny' : 'normal'}>
            {inventory[i]['name']}
            </p>
          <img src={`http://play.pokemonshowdown.com/sprites/ani${inventory[i]['shiny'] ? '-shiny' : ''}/${inventory[i]['name'].toLowerCase()}.gif`} alt={inventory[i]['name']}></img></div>
          <button className="release" id={i} onClick={(e) => this.release(e)}>Release</button>
          </div>)
        }
      for (var x = 0; x < inventory.length; x++) {
        unique_pokemon.push(inventory[x]['id'])
      }
      unique_pokemon = Array.from(new Set(unique_pokemon))
    }
    return (
        <div className="App-header">
            <p>
            Total Pokemon: {inventory.length} &nbsp;&nbsp;
            Pokedex: {unique_pokemon.length} / 151
            </p>
            <div className="grid-container">
            {pokemon}
            </div>
        </div>
    );
  }
  
}

export default Inventory;
