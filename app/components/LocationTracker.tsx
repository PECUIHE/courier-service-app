"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationTracker = () => {
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <div className=" flex flex-col gap-10 space-y-4 p-6">
      <div className='flex flex-col items-center gap-4'>
        <h1 className="text-3xl font-bold text-red-500">TRACK & TRACE</h1>
        <div className="bg-gray-100 p-4 rounded-lg w-full max-w-lg">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Enter your tracking number(s)"
              className="flex-1 px-4 py-2 border-none focus:ring-0 focus:outline-none text-gray-700 caret-red-600"
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded-none hover:bg-red-600">
              Track
            </button>
          </div>
        </div>
      </div>

      <div className="h-96 z-0">
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
    </div>
  );
};

export default LocationTracker;

