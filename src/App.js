import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'
 
import Encounter from './components/Encounter';
import Shop from './components/shop';
import Navigation from './components/Navigation';
import Inventory from './components/Inventory';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div className="App-header">
          <Navigation />
            <Switch>
             <Route path="/" component={Encounter} exact/>
             <Route path="/shop" component={Shop} exact/>
             <Route path="/inventory" component={Inventory} exact/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;