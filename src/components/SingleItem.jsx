import React from 'react';

const SingleItem = ({ item, children }) => {
  return (
    <div className="card w-[22rem] bg-base-100 shadow-xl">
      <figure><img src={item.image} alt="item-image" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
        </h2>
        <div className='flex flex-row items-center'>
          <p>
            Stock : {item.stock} <br />
            Price : {item.price}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
};

export default SingleItem;