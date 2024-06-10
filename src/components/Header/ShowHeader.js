import React from "react";
import {Link} from 'react-router-dom'
import "../../styles/App.css"

const ShowHeader = () => {
    return (
        <div className="navbar">
        <nav>
          <h1 className="brand"><Link to="/">NT219 Bank</Link></h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">All Customers</Link></li>
            <li><Link to="/transaction">Transfer Money</Link></li>
            <li><Link to="/history">Transaction History</Link></li>
          </ul>
          <div style={{clear: 'both'}}></div>
        </nav>
        <div className="responsive-bar">
          <h3 className="brand"><Link to="/">NT219 Bank</Link></h3>
          <h4 className="menu">Menu</h4>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    );
}

export default ShowHeader;