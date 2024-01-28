import React, { useState, useEffect } from 'react';

function SuccessAlert({ message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className={`fixed top-0 left-[20vw] w-[60vw] transition-transform duration-500 ${isVisible ? 'translate-y-4' : '-translate-y-full'}`}>
      <div role="alert" className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{message}</span>
        </div>
    </div>
  );
}

export default SuccessAlert;
