import React, {useRef,useEffect,useState} from 'react';
import Globe from 'react-globe.gl';

function HomeGlobe({ width }) {
  const [places, setPlaces] = useState([]);
  const [arcsData, setArcsData] = useState([]);

  const globeE1 = useRef();
  useEffect(() => {
    globeE1.current.controls().autoRotate = true;
    globeE1.current.controls().autoRotateSpeed = 4;
    globeE1.current.controls().enableRotate = false;
    globeE1.current.controls().enableZoom = false;
  },[]);

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

        const newArcsData = randomIndices.map(index => ({
          startLat: coordinates[index][0],
          startLng: coordinates[index][1],
          endLat: coordinates[(index + 1) % N][0],
          endLng: coordinates[(index + 1) % N][1],
          color: [
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ],
        }));
        setArcsData(newArcsData);
      });
  }, []);

  return (
    <div>
      <Globe
      ref = {globeE1}
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

export default HomeGlobe