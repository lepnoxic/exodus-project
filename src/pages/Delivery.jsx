import React, { useEffect } from 'react';

useEffect(() => {
    localStorage.removeItem('cartItems')
}, []);

const Delivery = () => {
  return (
    <div>Thank you for your service</div>
  )
}

export default Delivery;