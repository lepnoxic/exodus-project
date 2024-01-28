import React, { useState, useEffect } from 'react';

function InfoAlert({ message }) {
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
      <div role="alert" className="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{message}</span>
    </div>
    </div>
  );
}

export default InfoAlert;
