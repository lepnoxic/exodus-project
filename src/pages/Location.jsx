import React from 'react';
import { NavLink } from 'react-router-dom';
import LocationGlobe from '../components/LocationGlobe';

const width=window.innerWidth;

const Location = () => {
  return (
    <div>
        <LocationGlobe width={width} />
        <NavLink to='/items' >
            <button className='btn' >
                SAVE
            </button>
        </NavLink>
    </div>
    
  )
};

export default Location;