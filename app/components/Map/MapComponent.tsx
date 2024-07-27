// components/Map/MapComponent.tsx
"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';
import { useRouter } from 'next/navigation';

const MapLayer: React.FC = () => {
  const map = useMap();
  const router = useRouter();

  useEffect(() => {
    const addRectangle = (bounds: L.LatLngBoundsExpression, fillColor: string) => {
      const rectangle = L.rectangle(bounds, {
        color: 'blue',
        fillColor,
        fillOpacity: 1,
        weight: 3,
        className: 'blinking',
      }).addTo(map);

      if (fillColor === 'green') {
        rectangle.on('click', () => {
          const boundsStr = JSON.stringify(bounds);
          localStorage.setItem('selectedBounds', boundsStr);
          router.push('/Map');
        });
      }
    };

    const addMarker = (lat: number, lon: number, color: string, popupContent: string, tooltipContent: string) => {
      const icon = L.AwesomeMarkers.icon({
        icon: 'info-sign',
        markerColor: color,
        prefix: 'glyphicon',
        iconUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet.awesome-markers/2.0.2/images/markers/${color}.png`
      });

      const marker = L.marker([lat, lon], { icon }).addTo(map);

      marker.bindPopup(`<div>${popupContent}</div>`);
      marker.bindTooltip(`<div>${tooltipContent}</div>`, { sticky: true });
    };

    addRectangle([[19.085441285714285, 72.824376], [19.037646714285714, 72.88386]], 'green');
    addRectangle([[19.228825, 72.824376], [19.18103042857143, 72.854118]], 'red');
    addRectangle([[18.989852142857142, 72.824376], [18.94205757142857, 72.854118]], 'green');

    addMarker(19.0495, 72.8217, 'blue', 'Mount Mary Bandra West', 'Mount Mary Bandra West');
    addMarker(19.0674, 72.8262, 'blue', 'Pali Hill', 'Pali Hill');
    addMarker(19.081, 72.8497, 'blue', 'Santacruz East', 'Santacruz East');
    addMarker(19.0814, 72.8555, 'blue', 'Kalina', 'Click me!');
    addMarker(19.0506, 72.8339, 'green', 'Timberline Lodge', 'Bandra East Government Colony');
    addMarker(19.0581, 72.8386, 'green', 'Timberline Lodge', 'Bandra East - Nirmal Nagar');
    addMarker(19.0825, 72.8571, 'green', 'Timberline Lodge', 'Ashok Nagar Santracruz East');
    addMarker(19.0792, 72.8573, 'green', 'Timberline Lodge', 'Vakola Santracruz East');
  }, [map, router]);

  return null;
};

const MapComponent: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div id="map" style={{ flex: 1 }}>
        <MapContainer
          center={[19.076, 72.8777]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <MapLayer />
        </MapContainer>
      </div>
      <style jsx>{`
        .navbar-vertical {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 200px;
          background-color: #343a40;
          color: white;
          overflow-x: hidden;
          padding-top: 20px;
          z-index: 1000;
        }
        .navbar-vertical a {
          padding: 10px 15px;
          text-decoration: none;
          font-size: 18px;
          color: white;
          display: block;
          transition: 0.3s;
        }
        .navbar-vertical a:hover {
          background-color: #575d63;
        }
        .blinking {
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default MapComponent;
