import React from 'react';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  return (
    <div>Cart
    <NavLink to='/location' >
      <button>
        GO TO LOCATION
      </button>
    </NavLink>
    </div>
  )
};

export default Cart;