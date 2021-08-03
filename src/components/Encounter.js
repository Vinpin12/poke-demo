import '../styles/encounter.css';
import pokemon_list from '../jsons/pokemon.json';
import rarity_tier from "../jsons/rarity.json";
import catch_rate from "../jsons/catchrate.json";
import Cookies from 'universal-cookie';
import React from 'react';

const cookies = new Cookies();

class Encounter extends React.Component {




  constructor(){
    super();
    this.state = {
      counter: 0,
      pokemon: pokemon_list,
      rarity_JSON: rarity_tier, 
      encounter: "Find a new Pokemon",
      encounter_img: "http://play.pokemonshowdown.com/sprites/ani/unown-question.gif",
      is_shiny: false,
      type: "",
      id: "",
      is_caught: null,
      new_trainer: true,
      flee: false
    }
  }
  

  componentDidMount() {
    if (cookies.get('pokecoins') == null) {
      cookies.set('pokecoins', 0, { path: '/' });
      cookies.set('pokeballs', 5, { path: '/' });
      cookies.set('greatballs', 1, { path: '/' });
      cookies.set('ultraballs', 1, { path: '/' });
      cookies.set('can-spin', true, { path: '/' });
      localStorage.setItem('inventory', JSON.stringify([{catchid: 0, id: '25', type: 'Uncommon', name: 'Pikachu', shiny: false}]));
      this.setState({
        new_trainer: false
      })
    } 
  }

  encounter = () => {
    var rarity_list = this.state.rarity_JSON; // Get JSON object of pokemon in tiers
    var tier = Math.random(); // Call number to decide which tier to select
    var type = "Common"
    if (tier <= 0.5) { // Common Encounter 50% Chance
      type = "Common"
    }
    else if (tier <= 0.80) { // Uncommon Encounter 30% Chance
      type = "Uncommon"
    }
    else if (tier <= 0.95) { // Rare Encounter 15% Chance
      type = "Rare"
    }
    else if (tier <= 0.99) { // Super-Rare Encounter 4% Chance
      type = "Super-Rare"
    }
    else { // Legendary Encounter 1% Chance
      type = "Legendary"
    }
    var rarity_keys = Object.keys(rarity_list[type]); // Get all keys for Common category
    var p = Math.floor(Math.random() * Object.keys(rarity_list[type]).length) // Get random number within length of current Category
    var pokemon = rarity_list[type][rarity_keys[p]]; // Select random p pokemon from given tier category

    var shiny = Math.floor(Math.random() * 1000); // Decide if pokemon should be shiny 0.1% Chance
    if (shiny === 1)
      shiny = true
    else
      shiny = false
    this.setState({
      type: type,
      encounter: pokemon,
      encounter_img: `http://play.pokemonshowdown.com/sprites/ani${shiny ? '-shiny' : ''}/` + pokemon.toLowerCase() + ".gif",
      id: rarity_keys[p],
      is_shiny: shiny,
      is_caught: "",
      flee: false
    });
  }

  fleeChance(rarity) {
    var f = Math.random();
    var has_fleed = false;
    switch(rarity) {
      case "Common":
        if(f < 0.4) {
          has_fleed = true;
        }
        break;
      case "Uncommon":
        if(f < 0.5) {
          has_fleed = true;
        }
        // code block
        break;
      case "Rare":
        if(f < 0.65) {
          has_fleed = true;
        }
        // code block
        break;
      case "Super-Rare":
        if(f < 0.75) {
          has_fleed = true;
        }
          // code block
        break;      
      case "Legendary":
        if(f < 0.9) {
          has_fleed = true;
        }
        // code block
        break;
      default:
        has_fleed = true;
    }
    return has_fleed;
  }

  // Function takes pokemon rarity type, pokemon index ID, and the pokeball name used for the catch attempt
  // Then decides if the catch chance passes to set the state variable of catch chance to true or false if catch chance fails
  catchEncounter(type, id, balltype) { 
    if (type !== "" && id !== "" && cookies.get(balltype) > 0) {
      var pokemon_name = this.state.rarity_JSON[type][id]; // gets name of pokemon from encounter
      var ball_ratio = catch_rate[balltype]
      var catch_ratio = catch_rate[type]
      cookies.set(balltype, cookies.get(balltype) - 1)
      var catch_chance = catch_ratio * ball_ratio // calculate catch chace from pokemon rarity multiplyer by ball multiplyer
      var seed = Math.random() // get random seed for catch chance
      if (seed < catch_chance) { // check if seed is less than catch chance
        var coins = this.calculateCoins(catch_ratio) // call function to calculate the coins that should be awarded for the successful catch
        this.setState({ // Set caught state to true if seed is less than catch chance
          is_caught: true,
        });
        var temp_inventory = JSON.parse(localStorage.getItem('inventory'));
        if (temp_inventory.length === 0) {
          temp_inventory.push({catchid: 0, id: id, type: type, name: pokemon_name, shiny: this.state.is_shiny})
        }
        else {
        temp_inventory.push({catchid: temp_inventory[temp_inventory.length - 1]['catchid'] + 1, id: id, type: type, name: pokemon_name, shiny: this.state.is_shiny})
        }
        console.log(temp_inventory)
        localStorage.setItem('inventory', JSON.stringify(temp_inventory));
        cookies.set('pokecoins', parseInt(cookies.get('pokecoins')) + coins);
      }
      else {
        this.setState({ // Set caught state to false if seed is greater than catch chance
          is_caught: false,
          flee: this.fleeChance(type)
        });
      }
      //console.log("seed: " + seed + " catch chance: " + catch_chance); // log catch chance vs seed ratio
    }
  }

  // Calculate pokecoins obtained from a successful catch
  // Then return coins
  calculateCoins(catch_ratio) {
    var coins = Math.floor(2500 / (catch_ratio**catch_ratio))
    return coins;
  }

  render() {
    let caught = this.state.is_caught;

    const renderCatch = () => {
      if (caught === false) {
        return "❌";
      } 
      else if (caught) {
        return "✔️";
      }
      else {
        return "";
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="coins">
          Pokecoins: {cookies.get('pokecoins')}
          </div>
          <p className={this.state.is_shiny ? 'shiny' : ''}>
              {this.state.encounter}
            </p>
            <div className={this.state.type}>
              {this.state.type} 
              {renderCatch()}
            </div>
          <div className={this.state.is_shiny ? 'shiny-encounter' : 'encounter'}>
            <img src={this.state.encounter_img} alt={this.state.encounter}></img>
          </div>
          <div className="balls">
            <button className="pokeball" onClick={() => this.catchEncounter(this.state.type, this.state.id, "pokeballs")} disabled={this.state.id === "" || this.state.flee || this.state.is_caught}>Pokeball x{cookies.get('pokeballs')}</button>
            <button className="greatball" onClick={() => this.catchEncounter(this.state.type, this.state.id, "greatballs")} disabled={this.state.id === "" || this.state.flee || this.state.is_caught}>Greatball x{cookies.get('greatballs')}</button>
            <button className="ultraball" onClick={() => this.catchEncounter(this.state.type, this.state.id, "ultraballs")} disabled={this.state.id === "" || this.state.flee || this.state.is_caught}>Ultraball x{cookies.get('ultraballs')}</button><br></br>
            <button className={cookies.get('masterballs') > 0 ? "masterball" : "masterball hidden"} onClick={() => this.catchEncounter(this.state.type, this.state.id, "masterballs")} disabled={this.state.id === "" || this.state.flee || this.state.is_caught}>Masterballs x{cookies.get('masterballs')}</button>
          </div>
          <div className="static">
            <button className="new-encounter" onClick={this.encounter}>New Encounter</button>
          </div>
        </header>
      </div>
    );
  }
  
}

export default Encounter;
