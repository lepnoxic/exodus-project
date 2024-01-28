import React, { useState } from 'react';
import { SortDescIcon } from '@primer/octicons-react';
import { FaCartShopping } from 'react-icons/fa6';
import { SignOutIcon } from '@primer/octicons-react';
import SingleItem from '../components/SingleItem';
import jsonData from '../../data/items.json';
import { NavLink } from 'react-router-dom';
import { FaBullhorn } from 'react-icons/fa6';
import InfoAlert from '../components/InfoAlert';
import { useNavigate } from 'react-router-dom';

const Items = () => {
  const [sortedData, setSortedData] = useState([...jsonData]);
  const [sortBy, setSortBy] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmptyCart = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems'));
    if (cart.length>0) {
      navigate('/cart');
    } else {
      setError('Your cart is empty');
      console.log(error)
    }
  };

  const handleSort = (type) => {
    let sortedItems = [...jsonData];
    if (type === 'name') {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'price') {
      sortedItems.sort((a, b) => a.price - b.price);
    }
    setSortedData(sortedItems);
    setSortBy(type);
  };

  return (
    <div className="w-screen h-screen flex flex-col p-3">
      <div className="navbar bg-base-100 rounded-t-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <SortDescIcon size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={() => handleSort('name')}>
                <p>By Name</p>
              </li>
              <li onClick={() => handleSort('price')}>
                <p>By Price</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center gap-3 flex items-center rounded-xl border-[1px] py-2 pl-3">
          <FaBullhorn className='-rotate-12'></FaBullhorn>
          <div className="relative flex overflow-x-hidden w-[65vw]">
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-20">We are now delivering to Nemus. With this our services are available throughout the planet.</span>
              <span className="mx-20">Taurus puts up bounty on alligators.</span>
              <span className="mx-20">Canis Major distributes meat to avoid pineapple on pizza.</span>
              <span className="mx-20">Ascella shuts down all its public toilets.</span>
              <span className="mx-20">Lepus undergoes mass deforestation to promote global warming.</span>
              <span className="mx-20">Akola is leading cure research.</span>
              <span className="mx-20">Hackerman wins Exodus (hopefully).</span>
              <span className="mx-20">Amogus is the highest rated game on oogleway.</span>
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
            <span className="mx-20">We are now delivering to Nemus. With this our services are available throughout the planet.</span>
              <span className="mx-20">Taurus puts up bounty on alligators.</span>
              <span className="mx-20">Canis Major distributes meat to avoid pineapple on pizza.</span>
              <span className="mx-20">Ascella shuts down all its public toilets.</span>
              <span className="mx-20">Lepus undergoes mass deforestation to promote global warming.</span>
              <span className="mx-20">Akola is leading cure research.</span>
              <span className="mx-20">Hackerman wins Exodus (hopefully).</span>
              <span className="mx-20">Amogus is the highest rated game on oogleway.</span>
            </div>
          </div>
        </div>
        <div className="navbar-end">
            <button onClick={handleEmptyCart} className="btn bg-white btn-circle">
              <FaCartShopping className='flex justify-center items-center' size={21} color='black'></FaCartShopping>
            </button>
            {error && <InfoAlert message={error} />}
          <NavLink to="/">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <SignOutIcon size={24} />
              </div>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="grow rounded-b-lg bg-gray-700 p-3 flex flex-row flex-wrap gap-4 justify-center overflow-scroll">
        {sortedData.map((item, index) => (
          <SingleItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Items;
