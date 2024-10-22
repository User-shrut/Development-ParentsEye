import React, { useState } from "react";
import TableComponent from "./Table"; // Assuming table.jsx is TableComponent
import GoogleMapComponent from "./GoogleMapComponent"; // Assuming GoogleMapComponent is in this file

function ParentComponent() {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const data = []; // Assuming you have your data here

  return (
    <div>
      {/* Pass setCoordinates to TableComponent */}
      <TableComponent setCoordinates={setCoordinates} />
      {/* Pass coordinates to GoogleMapComponent */}
      <GoogleMapComponent 
        latitude={coordinates.latitude} 
        longitude={coordinates.longitude} 
        data={data} 
      />
    </div>
  );
}

export default ParentComponent;
