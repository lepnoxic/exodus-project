import React, { useState, useEffect } from 'react';
import { FaCoins } from 'react-icons/fa6';


const SingleItem = ({ item, children }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initialize count from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCount(existingItem.count);
    }
  }, [item.id]);

  const handleIncrement = () => {
    setCount(count + 1);

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      cartItems.push({ id: item.id, count: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);

      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.count -= 1;
        if (existingItem.count === 0) {
          const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
      }
    }
  };

  return (
    <div className="card w-[22rem] bg-base-100 shadow-xl">
      <figure><img src={item.image} alt="item-image" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
        </h2>
        <div className='flex flex-row items-center justify-between '>
          <div className='flex flex-col gap-2'>
            <div>Stock: {item.stock} </div>
            <div className='flex flex-row items-center gap-2'>
            <FaCoins size={20} /> {item.price}
            </div>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <button className='btn btn-error w-2 rounded-none rounded-l-lg' onClick={handleDecrement}>-</button>
            <div className='w-7 text-center text-lg bg-slate-800 h-12 flex justify-center items-center'>{count}</div>
            <button className='btn btn-success w-2 rounded-none rounded-r-lg' onClick={handleIncrement}>+</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SingleItem;
