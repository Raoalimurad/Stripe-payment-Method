import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Header() {
  const {carts} = useSelector((state)=>state.allCart)
  console.log(carts)
  return (
    <div className='Header'>
       <NavLink to='/' className="navlink">
      <div>
        <h2>Rao Store</h2>
      </div>
      </NavLink>
      <NavLink to='/card' className="navlink">
      <div id='ex4'>
        <span className='p1 fa-stack fa-2x has-badge' data-count={carts.length}>
          <FaShoppingCart className='icon' />
        </span>
      </div>
      </NavLink>
     
    </div>
  );
}

export default Header;
