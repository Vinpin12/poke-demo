import '../styles/shop.css';
import '../App.css'
import Cookies from 'universal-cookie';
import React from 'react';
import Wheel from './Wheel';

const cookies = new Cookies();


const dataChart = [
  { title: 'Pokeball', value: 50, color: '#fc0b03' },
  { title: 'Greatball', value: 30, color: '#2348eb' },
  { title: 'Ultraball', value: 15, color: '#f0e916' },
  { title: 'Masterball', value: 5, color: '#c707ed' },
  
];

class shop extends React.Component {

  constructor(){
    super();
    this.state = {
        pokeball: 50,
        greatball: 250,
        ultraball: 1000
    }
  }
  componentDidMount() {

  }

 buyPokeball(amount) {
  var bal = parseInt(cookies.get('pokecoins'))
  var cost = 50
  if (bal >= (cost * amount)) {
    cookies.set('pokeballs', parseInt(cookies.get('pokeballs')) + amount)
    cookies.set('pokecoins', parseInt(cookies.get('pokecoins')) - (cost * amount));
  }
  this.setState({
    pokecoins: bal
  })
}
 buyGreatball(amount) {
  var bal = parseInt(cookies.get('pokecoins'))
  var cost = 250
  if (bal >= (cost * amount)) {
    cookies.set('greatballs', parseInt(cookies.get('greatballs')) + amount);
    cookies.set('pokecoins', parseInt(cookies.get('pokecoins')) - (cost * amount));
  }
  this.setState({
    pokecoins: bal
  })
 }
 buyUltraball(amount) {
  var bal = parseInt(cookies.get('pokecoins'))
  var cost = 1000
  if (bal >= (cost * amount)) {
    cookies.set('ultraballs', parseInt(cookies.get('ultraballs')) + amount);
    cookies.set('pokecoins', parseInt(cookies.get('pokecoins')) - (cost * amount));
  }
  this.setState({
    pokecoins: bal
  })
 }
 getSpin() {
  var totalValue = 0;
  for (var i=0;i<dataChart.length;i++) {
    totalValue += dataChart[i].value
  }
  var randomPick = Math.floor(Math.random() * (totalValue - 1)) + 1;
  randomPick /= Math.pow(10, 2);
  var setAngle = 360 * randomPick;
  this.setState({
    spin: setAngle
  })
  if (randomPick <= 0.05) {
    console.log('You\'ve won a Masterball!');
  }
  else if (randomPick <= 0.15) {
    console.log('You\'ve won a Ultraball!');
  }
  else if (randomPick <= 0.5) {
    console.log('You\'ve won a Greatball!');
  } else {
    console.log('You\'ve won a Pokeball!');
  }
 }
  render() {
    return (
        <div className="App-header">
            <p className="coins">Pokecoins: {cookies.get('pokecoins')}</p>
            <p>Poke Shop</p>
            <div className="shopItems">
              <table>
              <tbody>
              <tr>
                <th>
              <label>
                Pokeball <br/>
                Cost: ${this.state.pokeball} <br/>
                <img src="http://play.pokemonshowdown.com/sprites/itemicons/poke-ball.png" alt="Pokeball"></img> x{cookies.get('pokeballs')}
                </label>
                <br/>
                <button className="buy" onClick={() => this.buyPokeball(1)}>Buy x1</button>
                <br/>
                <button className="buy" onClick={() => this.buyPokeball(10)}>Buy x10</button>
                </th>

                <th>
              <label>
                Greatball <br/>
                Cost: ${this.state.greatball} <br/>
                <img src="http://play.pokemonshowdown.com/sprites/itemicons/great-ball.png" alt="Greatball"></img> x{cookies.get('greatballs')}
                </label>
                <br/>
                <button className="buy" onClick={() => this.buyGreatball(1)}>Buy x1</button>
                <br/>
                <button className="buy" onClick={() => this.buyGreatball(10)}>Buy x10</button>
                </th>

                <th>
              <label>
                Ultraball <br/>
                Cost: ${this.state.ultraball} <br/>
                <img src="http://play.pokemonshowdown.com/sprites/itemicons/ultra-ball.png" alt="Ultraball"></img> x{cookies.get('ultraballs')}
                </label>
                <br/>
                <button className="buy" onClick={() => this.buyUltraball(1)}>Buy x1</button>
                <br/>
                <button className="buy" onClick={() => this.buyUltraball(10)}>Buy x10</button>
                </th>
                  </tr>
                  </tbody>
                  </table>
                  <Wheel></Wheel>
            </div>
        </div>
    );
  }
  
}

export default shop;
