import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Delivery = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('cartItems');
    }, []);

    return (
        <div className=''>
            Thank you for buying
            <div>
                <button className='btn' onClick={() => navigate('/items')}>
                    Return to Items
                </button>
                <button className='btn btn-error' onClick={() => navigate('/')}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Delivery;
