// import React, { useState } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import { Popup } from "react-leaflet";
// import axios from "axios";

// const GeofenceForm = ({ formData, setFormData, individualSalesMan, deviceId, setOpenPopup,onGeofenceSubmitSuccess  }) => {
//   const handleGeofenceSubmit = async (e) => {
//     e.preventDefault();

//     // Validate Form Data
//     if (!formData.name || !formData.radius || !formData.busStopTime) {
//       alert("All fields are required.");
//       return;
//     }

//     const circleFormat = `Circle(${individualSalesMan?.latitude} ${individualSalesMan?.longitude}, ${formData.radius})`;
//     const geofenceData = {
//       name: formData.name,
//       area: circleFormat,
//       busStopTime: formData.busStopTime,
//       deviceId: deviceId,
//     };

//     console.log("Formatted data: ", geofenceData);

//     try {
//       const accessToken = localStorage.getItem("token");
//       const response = await axios.post(`${process.env.REACT_APP_API}/geofence`, geofenceData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201) {
//         alert("Geofence added successfully.");
//         onGeofenceSubmitSuccess(); 
//         setOpenPopup(false); // Close popup after success
//         const closeButton = document.querySelector('.leaflet-popup-close-button');
//         if (closeButton) {
//           closeButton.click(); // Close the popup by simulating a click on the close button
//         }
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "An error occurred.");
//     }
//   };

//   return (
//     <Popup>
//       <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
//         <Typography
//           variant="h6"
//           component="h2"
//           style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}
//         >
//           Add New Geofence
//         </Typography>
//       </div>

//       <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
//         <TextField
//           label="Bus Stop Name"
//           name="name"
//           variant="outlined"
//           size="small"
//           value={formData.name || ""}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//           fullWidth
//         />
//       </div>

//       <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
//         <TextField
//           label="Radius of Area"
//           name="radius"
//           type="number"
//           variant="outlined"
//           size="small"
//           value={formData.radius || ""}
//           onChange={(e) => setFormData({ ...formData, radius: e.target.value })}
//           required
//           fullWidth
//         />
//       </div>

//       <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
//         <TextField
//           label="Bus Time"
//           name="time"
//           type="time"
//           variant="outlined"
//           size="small"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           value={formData.busStopTime || ""}
//           onChange={(e) =>
//             setFormData({ ...formData, busStopTime: e.target.value })
//           }
//           required
//           fullWidth
//         />
//       </div>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleGeofenceSubmit}
//         style={{
//           alignSelf: 'center',
//           marginTop: '15px',
//           padding: '10px 20px',
//           textTransform: 'capitalize',
//           fontWeight: 'bold',
//           fontSize: '14px',
//         }}
//       >
//         Submit
//       </Button>
//     </Popup>
//   );
// };

// export default GeofenceForm;
import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Popup } from "react-leaflet";
import axios from "axios";

const GeofenceForm = ({ formData, setFormData, individualSalesMan, deviceId, setOpenPopup, onGeofenceSubmitSuccess ,clickedLocation }) => {
  const handleGeofenceSubmit = async (e) => {
    e.preventDefault();

    // Validate Form Data
    if (!formData.name || !formData.radius || !formData.busStopTime) {
      alert("All fields are required.");
      return;
    }
     // Determine source of latitude and longitude
     const latitude =
     clickedLocation?.latitude || individualSalesMan?.latitude || null;
   const longitude =
     clickedLocation?.longitude || individualSalesMan?.longitude || null;

     if (!latitude || !longitude) {
      alert("Invalid location data. Please provide a valid location.");
      return;
    }
    const circleFormat = `Circle(${latitude} ${longitude}, ${formData.radius})`;
    // const circleFormat = `Circle(${clickedLocation?.latitude} ${clickedLocation?.longitude}, ${formData.radius})`;
    const geofenceData = {
      name: formData.name,
      area: circleFormat,
      busStopTime: formData.busStopTime,
      deviceId: deviceId,
    };

    console.log("Formatted data: ", geofenceData);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await axios.post(`${process.env.REACT_APP_API}/geofence`, geofenceData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Geofence added successfully.");
        onGeofenceSubmitSuccess(); // Call the success callback passed from parent
        setOpenPopup(false); // Close popup after success
        const closeButton = document.querySelector(".leaflet-popup-close-button");
        if (closeButton) {
          closeButton.click(); // Close the popup by simulating a click on the close button
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Popup>
      <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
        <Typography
          variant="h6"
          component="h2"
          style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
        >
          Add New Geofence
        </Typography>
      </div>

      <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
        <TextField
          label="Bus Stop Name"
          name="name"
          variant="outlined"
          size="small"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          fullWidth
        />
      </div>

      <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
        <TextField
          label="Radius of Area"
          name="radius"
          type="number"
          variant="outlined"
          size="small"
          value={formData.radius || ""}
          onChange={(e) => setFormData({ ...formData, radius: e.target.value })}
          required
          fullWidth
        />
      </div>

      <div style={{ margin: "9px 0px", padding: "3px 13px" }}>
        <TextField
          label="Bus Time"
          name="time"
          type="time"
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.busStopTime || ""}
          onChange={(e) =>
            setFormData({ ...formData, busStopTime: e.target.value })
          }
          required
          fullWidth
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGeofenceSubmit}
        style={{
          alignSelf: "center",
          marginTop: "15px",
          padding: "10px 20px",
          textTransform: "capitalize",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        Submit
      </Button>
    </Popup>
  );
};

export default GeofenceForm;
