import {useRef,useEffect,useState} from 'react';
import Globe from 'react-globe.gl';

function LocationGlobe({ width }) {
  const [places, setPlaces] = useState([]);
  const [arcsData, setArcsData] = useState([]);
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

        const randomIndices = [];
        while (randomIndices.length < numberOfArcs) {
          const randomIndex = Math.floor(Math.random() * N);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }

        const newArcsData = randomIndices.map(() => ({
          startLat: 51.262297,
          startLng: 14.638508,
          endLat: 33.938116,
          endLng: -25.651277,
          color: [
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ],
        }));
        setArcsData(newArcsData);
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