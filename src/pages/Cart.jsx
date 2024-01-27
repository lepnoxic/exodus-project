import React from 'react';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  return (
    <div>
    <NavLink to='/location' >
      <button>
        Confirm
      </button>
    </NavLink>
    </div>
  )
};

export default Cart;