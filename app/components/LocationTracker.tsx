
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationTracker: React.FC = () => {
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <div className="h-96">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }} // Add style to ensure the map renders correctly
        className='z-0'
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Tracking Order</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationTracker;














// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { LatLngTuple } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const LocationTracker: React.FC = () => {
//   const position: LatLngTuple = [51.505, -0.09]; // Replace with actual location data
//   return (
//     <div className="h-96">
//       <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={position}>
//           <Popup>Tracking Order</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default LocationTracker;

