import React from "react";
import {Link} from 'react-router-dom'
import "../../styles/App.css"

const ShowHeader = () => {
    return (
        <div className="navbar">
        <nav>
          <h1 className="brand"><Link to="/">NT219</Link></h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/transaction">Transfer Money</Link></li>
            <li><Link to="/history">Transaction History</Link></li>
            <button className="auth-button">
              <Link to="/SignIn">Đăng nhập | Đăng ký</Link>
            </button>
          </ul>
          <div style={{clear: 'both'}}></div>
        </nav>
      </div>
    );
}

export default ShowHeader;