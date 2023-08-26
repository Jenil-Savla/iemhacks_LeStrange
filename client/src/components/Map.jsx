import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibXJicmFpbnRhc3RpYyIsImEiOiJjbDBycXU3dHAwNGI0M2JzMDFhNGVzOXF2In0.ftBK_3AgFaxqIs19eFH-wA';

export default function App( {latt, long} ) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] =  useState(long) //useState(72.8384);
  const [ltt, setLat] =  useState(latt) //useState(19.107);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current){
      map.current.remove();
    } ; // initialize map only once
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, ltt],
          zoom: zoom
        });
        });
        }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('load', () => {
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [lng, ltt],
              [long, latt]
            ]
          }
        }
      });
    });
  });


  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {ltt} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="h-[350px] map-container" />
    </div>
  );
}
