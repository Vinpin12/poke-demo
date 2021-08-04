import '../styles/shop.css';
import '../App.css'
import Cookies from 'universal-cookie';
import React from 'react';
import Wheel from './Wheel';
import shopitems from '../jsons/shop.json';

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
    }
  }
  componentDidMount() {

  }

  buyitem(item, amount, cost) {
    item = item.replace('x10', '');
    var bal = parseInt(cookies.get('pokecoins'))
    if (bal >= (cost * amount)) {
      cookies.set(item, parseInt(cookies.get(item)) + amount)
      cookies.set('pokecoins', parseInt(cookies.get('pokecoins')) - (cost * amount));
    }
    this.setState({
      pokecoins: bal
    })
  }

  LoadShop() { 
    const items = [];
    var keys = Object.keys(shopitems);
    for (var i = 0; i < keys.length; i++) {
      var cookie_item = keys[i].replace('-', '').toLowerCase() + 's';
      // This is kinda awful but at least its dynamic and not static like before
      items.push(<th>
      <label>
        {keys[i]} <br/>
        Cost: ${shopitems[keys[i]]} <br/>
        <img src={`http://play.pokemonshowdown.com/sprites/itemicons/${keys[i].toLowerCase()}.png`} alt={keys[i]}></img> x{cookies.get(cookie_item)}
        </label>
        <br/>
        <button className="buy" cost={shopitems[keys[i]]} id={cookie_item} onClick={e => this.buyitem(e.target.id, 1, document.getElementById(e.target.id).getAttribute("cost"))}>Buy x1</button>
        <br/>
        <button className="buy" cost={shopitems[keys[i]]} id={cookie_item + "x10"} onClick={e => this.buyitem(e.target.id, 10, document.getElementById(e.target.id).getAttribute("cost"))}>Buy x10</button>
        </th>
      );
    }
    return items;
    
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
              {this.LoadShop()}
              </tbody>
              </table>
                  <Wheel></Wheel>
            </div>
        </div>
    );
  }
  
}

export default shop;
