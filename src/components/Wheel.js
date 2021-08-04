import '../styles/shop.css';
import '../App.css'
import React from 'react';
import Cookies from 'universal-cookie';
import { PieChart } from 'react-minimal-pie-chart';
import Arrow from '../images/arrow.png';

const cookies = new Cookies();

const dataChart = [
  { title: 'Pokeball', value: 50, color: '#fc0b03' },
  { title: 'Greatball', value: 30, color: '#2348eb' },
  { title: 'Ultraball', value: 15, color: '#f0e916' },
  { title: 'Masterball', value: 5, color: '#c707ed' },
  
];

class Wheel extends React.Component {

  constructor(){
    super();
    this.state = {
      spin: 0,
      message: "",
      hidden: true
    }
  }
  componentDidMount() {
    //console.log("Can Spin? " + cookies.get('can-spin'))
  }
 // Worst code ever written wow...
 getSpin() {
  setTimeout(function () {
    this.setState({hidden: false});
    document.getElementById('wheel').className='';
  }.bind(this), 4000)
  document.getElementById('wheel').className='spin';
  var totalValue = 0;
  for (var i=0;i<dataChart.length;i++) {
    totalValue += dataChart[i].value
  }
  var msg = ""
  var randomPick = Math.floor(Math.random() * (totalValue - 1)) + 1;
  randomPick /= Math.pow(10, 2);
  var setAngle = 360 * randomPick;
  if (randomPick <= 0.05) {
    msg = 'You\'ve won a Masterball!';
    cookies.set('masterballs', parseInt(cookies.get('masterballs')) + 1)
  }
  else if (randomPick <= 0.15) {
    msg = 'You\'ve won a Ultraball!'
    cookies.set('ultraballs', parseInt(cookies.get('ultraballs')) + 1)
  }
  else if (randomPick <= 0.5) {
    msg = 'You\'ve won a Greatball!'
    cookies.set('greatballs', parseInt(cookies.get('greatballs')) + 1)
  } else {
    msg = 'You\'ve won a Pokeball!'
    cookies.set('pokeballs', parseInt(cookies.get('pokeballs')) + 1)
  }
  this.setState({
    spin: setAngle,
    message: msg,
    hidden: true
  })
  cookies.set('spins', parseInt(cookies.get('spins')) - 1);
 }

  render() {
    return (
                  <div className="spinner">
                  <h1>Spin 2 Win!</h1>
                  <img src={Arrow} alt="arrow" className="arrow"></img>
                    <div id="wheel">
                    <PieChart
                      data={dataChart}
                      label={({ dataEntry }) => dataEntry.title}
                      labelStyle={(index) => ({
                        fill: dataChart[index],
                        fontSize: '4px',
                        fontFamily: 'sans-serif',
                      })}
                      radius={35}
                      labelPosition={70}
                      background={'#000000'}
                      startAngle={this.state.spin}
                    />
                    </div>
                  <p hidden={this.state.hidden}>{this.state.message}</p>
                  <button onClick={() => this.getSpin()} className="button" disabled={cookies.get('spins') === '0'}>Spin x{cookies.get('spins')}</button>
                  </div>
    );
  }
  
}

export default Wheel;
