import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsonData from '../../data/items.json';
import { FaArrowRightLong } from 'react-icons/fa6';

const Delivery = () => {
    const navigate = useNavigate();
    
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

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
        <div className='flex justify-center items-center w-screen h-screen flex-col gap-10'>
            <div className='w-[55vw] h-[70vh] bg-slate-800 rounded-3xl flex flex-col justify-center items-center gap-1'>
                <div className='text-4xl font-bold'>Thank you for buying at Bluepyter Services</div>
                <table className='table w-[30vw] text-xl'>
                    <tbody>
                    <tr className='flex items-center justify-center'>
                                <td  >{localStorage.getItem('destination')}</td>                
                            <FaArrowRightLong size={21.5 } />
                         
                            <td  >
                            {localStorage.getItem('source')}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table w-[30vw]'>
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
                <div></div>
                <div></div>
                <div className='flex flex-row gap-10'>
                    <button className='btn' onClick={handleItems}>
                        Return to Items
                    </button>
                    <button className='btn btn-error' onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delivery;
