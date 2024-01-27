import React, { useEffect } from 'react';


const Delivery = () => {
    useEffect(() => {
        localStorage.removeItem('cartItems')
    }, []);
  return (
    <div>Thank you for your service</div>
  )
}

export default Delivery;