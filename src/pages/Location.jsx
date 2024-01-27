import React, {useRef,useEffect,useState} from 'react';
import Globe from 'react-globe.gl';
import locations from '/data/output1.json'

const width=window.innerWidth;

const Location = () => {
  const [places, setPlaces] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const [currentMode, setCurrentMode] = useState(0);
  const globeEl = useRef();
  


  useEffect(() => {
    fetch('../../data/ne_110m_top_50_populated_cities.geojson')
      .then(res => res.json())
      .then(({ features }) => setPlaces(features));

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
          endLat: 51.262297,
          endLng: 14.638508,
          color: [
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ],
        }));
        setArcsData(newArcsData);
        console.log(top5Locations[0].latitude)
      });
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
      setArcsData(newArcsData);
      console.log(top5Locations[0].latitude)
    });
};

  const updatePOV = (latitude, longitude) => {
    const zoom_location = { lat: latitude, lng: longitude, altitude: 0.75 };
    globeEl.current.pointOfView(zoom_location, 1000);
  };

  let srclatitude = 100000;
  let srclongitude = 100000;


  const handleCitySubmit = () => {
    if (srclatitude == 100000 || srclongitude == 100000) 
      return;
    createArcs(srclatitude, srclongitude);
    setCurrentMode(1);
  };

  const handleCitySelection = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex === 'default') {
      // Handle the case where the default option is selected
      return;
    }
    const selectedCity = locations[selectedIndex];
    const { latitude, longitude } = selectedCity;
    updatePOV(latitude, longitude);
    srclatitude = latitude;
    srclongitude = longitude;
  };



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
            // arcsData={arcsData}
            // arcColor={'color'}
            // arcDashLength={() => Math.random()}
            // arcDashGap={() => Math.random()}
            // arcDashAnimateTime={() => Math.random() * 4000 + 500}
            width={width}
            backgroundColor='rgba(0,0,0,0)'
          />
        </div>
      </div>
      
    )
  if (currentMode === 1) 
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