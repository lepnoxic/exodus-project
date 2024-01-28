import React, {useRef,useEffect,useState} from 'react';
import { useNavigate } from 'react-router';
import Globe from 'react-globe.gl';
import locations from '/data/output1.json';

const width=window.innerWidth;

const Location = () => {
  const [places, setPlaces] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const [currentMode, setCurrentMode] = useState(0);
  const globeEl = useRef();
  const navigate = useNavigate();

  let dstlatitude = 100000;
  let dstlongitude = 100000;
  let srclatitude;
  let srclongitude;

  let text;


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    fetch('../../data/ne_110m_top_50_populated_cities.geojson')
      .then(res => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);

  const createArcs = (latitude, longitude) => {
    fetch('../../data/output.json')
    .then(res => res.json())
    .then(({ coordinates }) => {
      const numberOfArcs = 20;
      const N = coordinates.length;
      const top5Locations = [
        {
          "name": "Proxima Centauri",
          "latitude": -113.184152,
          "longitude": -83.732973
        },
        {
          "name": "Monoceros",
          "latitude": -2.899684,
          "longitude": 37.046811
        },
        {
          "name": "Ankaa",
          "latitude": -24.471862,
          "longitude": 62.39699
        },
        {
          "name": "Akola",
          "latitude": 33.938116,
          "longitude": -25.651277
        },
        {
          "name": "Ronaldo",
          "latitude": -65.011029,
          "longitude": -19.839776
        }
      ];

      const randomIndices = [];
      while (randomIndices.length < numberOfArcs) {
        const randomIndex = Math.floor(Math.random() * N);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      const index = Math.floor(Math.random() * 5)
      const newArcsData = randomIndices.map(() => ({
        startLat: top5Locations[index].latitude,
        startLng: top5Locations[index].longitude,
        endLat: latitude,
        endLng: longitude,
        color: [
          ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        ],
      }));
      srclatitude = top5Locations[index].latitude;
      srclongitude = top5Locations[index].longitude;
      setArcsData(newArcsData);
      localStorage.setItem('source', top5Locations[index].name); 
      localStorage.setItem('srclatitude', srclatitude);
      localStorage.setItem('srclongitude', srclongitude);
      localStorage.setItem('dstlatitude', dstlatitude);
      localStorage.setItem('dstlongitude', dstlongitude);
    });
};

  const updatePOV = (refer, latitude, longitude) => {
    const zoom_location = { lat: latitude, lng: longitude, altitude: 1.2 };
    refer.current.pointOfView(zoom_location, 1000);
  };


  const handleCitySubmit = () => {
    if (dstlatitude == 100000 || dstlongitude == 100000) 
      return;
    
    createArcs(dstlatitude, dstlongitude);
    setCurrentMode(1);
  };

  const handleCitySelection = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex === 'default') {
      // Handle the case where the default option is selected
      return;
    }
    const selectedCity = locations[selectedIndex];
    const { latitude, longitude, name } = selectedCity;
    localStorage.setItem('destination', name);
    updatePOV(globeEl, latitude, longitude);
    dstlatitude = latitude;
    dstlongitude = longitude;
  };

  useEffect(() => {
    if (currentMode === 1) {
      // Wait for 10 seconds before changing mode to 2
      const timeoutId = setTimeout(() => {
        setCurrentMode(2);
      }, 3500); 
      // Cleanup the timeout on component unmount or mode change
      return () => clearTimeout(timeoutId);
    }
  }, [currentMode]);

  useEffect(() => {
    if (currentMode === 2) {
      const storedSrcLatitude = localStorage.getItem('srclatitude');
      const storedSrcLongitude = localStorage.getItem('srclongitude');
      const storedDstLatitude = localStorage.getItem('dstlatitude');
      const storedDstongitude = localStorage.getItem('dstlongitude');
      // Wait for 10 seconds before changing mode to 2
      const timeoutId = setTimeout(() => {
        updatePOV(globeEl, storedSrcLatitude, storedSrcLongitude);
        setCurrentMode(3);
      }, 3500); 
      // Cleanup the timeout on component unmount or mode change
      return () => clearTimeout(timeoutId);
    }
    if (currentMode === 3) {
      const storedSrcLatitude = parseFloat(localStorage.getItem('srclatitude'));
      const storedSrcLongitude = parseFloat(localStorage.getItem('srclongitude'));
      const storedDstLatitude = parseFloat(localStorage.getItem('dstlatitude'));
      const storedDstongitude = parseFloat(localStorage.getItem('dstlongitude')); 
      // Wait for 10 seconds before changing mode to 2
      const timeoutId = setTimeout(() => {
        updatePOV(globeEl, (storedSrcLatitude + storedDstLatitude) / 2, (storedSrcLongitude + storedDstongitude)/2);
        setCurrentMode(4);
      }, 3500); 
      // Cleanup the timeout on component unmount or mode change
      return () => clearTimeout(timeoutId);
    }
    if (currentMode==4) {
      const storedSrcLatitude = parseFloat(localStorage.getItem('srclatitude'));
      const storedSrcLongitude = parseFloat(localStorage.getItem('srclongitude'));
      const storedDstLatitude = parseFloat(localStorage.getItem('dstlatitude'));
      const storedDstongitude = parseFloat(localStorage.getItem('dstlongitude')); 
      // Wait for 10 seconds before changing mode to 2
      const timeoutId = setTimeout(() => {
        updatePOV(globeEl, storedDstLatitude, storedDstongitude);
        setCurrentMode(5);
      }, 3500); 
      // Cleanup the timeout on component unmount or mode change
      return () => clearTimeout(timeoutId);
    }
    if (currentMode == 5) {
      
      const timeoutId = setTimeout(() => {
        navigate('/delivery');
      }, 3500); 
      // Cleanup the timeout on component unmount or mode change
      return () => clearTimeout(timeoutId);
    }
  }, [currentMode]);

  if (currentMode === 0)
    return (
      <div className="flex flex-row overflow-x-hidden">
        <div className='absolute flex flex-row items-center h-screen left-[10vw] text-7xl'>
        <div className='flex flex-row items-center z-[2] gap-5'>
          <div>
            Choose your city: 
          </div>
          <select 
            className="select select-bordered w-full max-w-xs" 
            onChange={(e) => handleCitySelection(e)}
            defaultValue="default"
          >
            <option value="default" disabled>Select a city</option>
            {locations.map((item, index) => (
              <option key={index} value={index}>{item.name}</option>
            ))}
          </select>
          <button className='btn btn-success' onClick={() => handleCitySubmit()}>
            SUBMIT
          </button>
        </div>
        </div>
          <div className='flex-grow flex justify-center items-center' style={{ flex: '0 0 20%' }}>
          </div>
        <div>
          <Globe
            ref={globeEl}
            globeImageUrl="https://i.imgur.com/lPc26ew.jpeg"
            labelsData={places}
            labelLat={d => d.properties.latitude}
            labelLng={d => d.properties.longitude}
            labelText={d => d.properties.name}
            labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
            labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
            labelColor={() => 'rgba(255,255,0,0.5)'}
            labelResolution={5}
            width={width}
            backgroundColor='rgba(0,0,0,0)'
          />
        </div>
      </div>
      
    )

  if (currentMode === 1) {
    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col gap-4'>
          <p className='font-bold text-4xl'>Payment processing</p>
          <span className="loading loading-spinner loading-lg"></span>
          <p>(There is no payment framework)</p>
        </div>
        // Wait for 10 seconds then change currentMode to 2
      )
  }

  if (currentMode >= 2) 
  return (
    <div className="flex flex-row overflow-x-hidden">
      <div className="absolute h-screen flex items-center text-3xl ml-14 z-[3]">
      {currentMode === 2 && (
        <p>Payment Succeded, Initiating Fast Transfer</p>
      )}
      {currentMode === 3 && (
        <p>Package is ready to deliver from <b>{localStorage.getItem('source')}</b></p>
      )}
      {currentMode === 4 && (
        <p>Package is travelling at Mach 3000</p>
      )}
      {currentMode === 5 && (
        <p>Package has arrived at <b>{localStorage.getItem('destination')}</b>, get ready to pick it up</p>
      )}
      </div>
      <div className='flex-grow flex justify-center items-center' style={{ flex: '0 0 20%' }}>
      </div>
    <div>
      <Globe
        ref={globeEl}
        globeImageUrl="https://i.imgur.com/lPc26ew.jpeg"
        labelsData={places}
        labelLat={d => d.properties.latitude}
        labelLng={d => d.properties.longitude}
        labelText={d => d.properties.name}
        labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => 'rgba(255,255,0,0.5)'}
        labelResolution={5}
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
        width={width}
        backgroundColor='rgba(0,0,0,0)'
      />
    </div>
  </div>
    )
};

export default Location;