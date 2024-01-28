import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Delivery = () => {
    const navigate = useNavigate();
    
    const handleItems = () => {
        localStorage.removeItem('cartItems')
        navigate('/items')
    };

    const handleLogout = () => {
        localStorage.removeItem('cartItems')
        localStorage.removeItem('user')
        navigate('/')
    };

    return (
        <div className='flex justify-center items-center w-screen h-screen flex-col'>
            <div className='text-4xl'>Thank you for buying at Bluepyter Services</div>
            
            <div>Destination : {localStorage.getItem('destination')}</div>
            <div>Source : {localStorage.getItem('source')}</div>
            {console.log(localStorage.getItem('cartItems'))}

            <div>
                <button className='btn' onClick={handleItems}>
                    Return to Items
                </button>
                <button className='btn btn-error' onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Delivery;
