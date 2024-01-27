import React, {useRef,useEffect,useState} from 'react';
import Globe from 'react-globe.gl';

function HomeGlobe({ width }) {

  const globeE1 = useRef();
  useEffect(() => {
    globeE1.current.controls().autoRotate = true;
    globeE1.current.controls().autoRotateSpeed = 4;
    globeE1.current.controls().enableRotate = false;
  },[]);

  const N = 20;
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
  }));


  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch('/data/update.geojson').then(res => res.json())
      .then(({ features }) => setPlaces(features));
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