import React from 'react';
import '../styles/nav.css';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div className="header">
       <div className="">
          <NavLink to="/"><button className="Menu">Home</button></NavLink>
          <NavLink to="/shop"><button className="Menu">Shop</button></NavLink>
          <NavLink to="/inventory"><button className="Menu">Inventory</button></NavLink>
       </div>
       </div>
    );
}
 
export default Navigation;