import React from 'react';
import { NavLink } from 'react-router-dom';

const Location = () => {
  return (
    <div>
        <div>
            Go to items
        </div>
        <NavLink to='/items' >
            <button className='btn' >
                SAVE
            </button>
        </NavLink>
    </div>
    
  )
};

export default Location;