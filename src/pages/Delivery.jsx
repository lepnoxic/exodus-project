import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const navigate = useNavigate;

const Delivery = () => {
    useEffect(() => {
        localStorage.removeItem('cartItems')
    }, []);

    return (
    <div>Thank you for buying
        <div>
            <button className='btn' onClick={navigate('/items')}>
                Return to Items
            </button>
            <button className='btn btn-error' onClick={navigate('/home')}>
                Log Out
            </button>
        </div>
    </div>
  )
}

export default Delivery;