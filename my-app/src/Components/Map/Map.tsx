import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
// Определение типа для координат
const position: [number, number] = [51.505, -0.09];


const Map: React.FC = () => {
  return (
    <div >
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}
        style={{ height: '400px', width: '85%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>

  );
};

export default Map;
