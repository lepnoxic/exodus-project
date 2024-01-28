import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import jsonData from '../../data/items.json';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div className='flex justify-center items-center w-screen h-screen flex-col'>
      <div className='h-[90vh] w-[40vw] rounded-xl flex flex-col gap-5 justify-center items-center bg-slate-700'>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-4xl'>Cart Items</p>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Name
                </th>
                <th>
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => {
                const item = jsonData.find((dataItem) => dataItem.id === cartItem.id);
                if (item) {
                  return (
                    <tr>
                      <th>
                        {item.id}
                      </th>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {cartItem.count}
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          
        </div>
        <div className='flex flex-row gap-5'>
          <NavLink to='/items'>
            <button className='btn'>
              GO BACK
            </button>
          </NavLink>
          <NavLink to='/location'>
            <button className='btn btn-success'>
              <p className='text-white'>CONFIRM</p>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
