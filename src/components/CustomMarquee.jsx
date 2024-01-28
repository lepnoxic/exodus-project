import React, { useEffect } from 'react';
import Marquee from 'react-fast-marquee';

function CustomMarquee(props) {
  useEffect(() => {
    // Get all elements with the class 'rfm-marquee-container' (assuming this is the class used by the Marquee component)
    const marqueeContainers = document.querySelectorAll('.rfm-marquee-container');

    // Loop through each container and set the width to 65vw
    marqueeContainers.forEach(container => {
      container.style.setProperty('--width', '65vw');
    });
  }, []); // Run this effect only once after the component mounts

  return (
    <Marquee {...props}>
      {props.children}
    </Marquee>
  );
}

export default CustomMarquee;
