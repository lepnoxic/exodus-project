import React,{ useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

function LocationGlobe({ width }) {
  const [places, setPlaces] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const globeEl = useRef();


  useEffect(() => {
    fetch('/public/data/ne_110m_top_50_populated_cities.geojson')
      .then(res => res.json())
      .then(({ features }) => setPlaces(features));

    fetch('/public/data/output.json')
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

  const handleButtonClick = () => {
    const zoom_location = { lat: 51.262297, lng: 14.638508, altitude: 0.75 };
    globeEl.current.pointOfView(zoom_location, 1000);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Zoom</button>
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
  )
}

export default LocationGlobe;