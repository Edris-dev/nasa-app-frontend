import React, { useState } from 'react';
import { MenuItems } from "./MenuItems.js"; //import menus from array (name,link,etc)
import './Navbar.css';

//Navigation component that will live at the top of all pages so user may redirect
function Navbar(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked)
  }

    return(
      <nav className="NavbarItems">
        <h1 className="navbar-logo" onClick={() => props.routeChange('home')}>
          Star Gazer
          <i class="fas fa-meteor"></i>
        </h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item,index) => {
            return(
              <li key={index}>
                <a className={item.cName} onClick={() => props.routeChange(item.link)}>
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

    );

}

export default Navbar;
