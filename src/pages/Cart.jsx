import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import jsonData from '/data/items.json';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div>
      <div>
        <h2>Cart Items:</h2>
        <ul>
          {cartItems.map((cartItem) => {
            const item = jsonData.find((dataItem) => dataItem.id === cartItem.id);
            if (item) {
              return (
                <li key={item.id}>
                  {item.name} - Count: {cartItem.count}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <NavLink to='/location'>
        <button>
          Confirm
        </button>
      </NavLink>
    </div>
  );
};

export default Cart;
