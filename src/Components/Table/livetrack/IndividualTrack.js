
import React, { useContext, useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline,Circle , useMapEvents} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import axios from 'axios'  
import useVehicleTracker from './useVehicleTracker'
import { useNavigate, useParams } from 'react-router-dom'
import { duration } from 'dayjs' // Importing all vehicle icons
import busredSvg from '../../../assets/AllTopViewVehicle/Top R.svg'
import busyellowSvg from '../../../assets/AllTopViewVehicle/Top Y.svg'
import busgreenSvg from '../../../assets/AllTopViewVehicle/Top G.svg'
import busorangeSvg from '../../../assets/AllTopViewVehicle/Top O.svg'
import busgraySvg from '../../../assets/AllTopViewVehicle/Top Grey.svg'

// Fix Leaflet's default marker icon in Webpack
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker'
import './IndividualTrack.css'
import busGreen from '../../../assets/vehicleList/Bus/busGreen.svg'
import busRed from '../../../assets/vehicleList/Bus/busRed.svg'
import busOrange from '../../../assets/vehicleList/Bus/busOrange.svg'
import busYellow from '../../../assets/vehicleList/Bus/busYellow.svg'
import busGray from '../../../assets/vehicleList/Bus/busGray.svg'
// import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./GeoFencing.css";
import Draggable from 'react-draggable'
import GeofenceForm from "./GeofenceForm"; 
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
const mapIcons = {
  bus: {
    red: busredSvg,
    yellow: busyellowSvg,
    green: busgreenSvg,
    orange: busorangeSvg,
    gray: busgraySvg,
  },
  default: {
    red: busredSvg,
    yellow: busyellowSvg,
    green: busgreenSvg,
    orange: busorangeSvg,
    gray: busgraySvg,
  },
}

const getVehicleIcon = (vehicle, cat) => {
  let speed = vehicle.speed
  let ignition = vehicle.attributes.ignition
  const category = mapIcons[cat] || mapIcons['default']
  let course = vehicle.course || 0

  let iconUrl
  switch (true) {
    case speed <= 2.0 && ignition:
      iconUrl = category['yellow']
      break
    case speed > 2.0 && speed < 60 && ignition:
      iconUrl = category['green']
      break
    case speed > 60.0 && ignition:
      iconUrl = category['orange']
      break
    case speed <= 1.0 && !ignition:
      iconUrl = category['red']
      break
    default:
      iconUrl = category['gray']
      break
  }

  return L.divIcon({
    html: `<img src="${iconUrl}" style="transform: rotate(${course}deg); width: 48px; height: 48px;" />`,
    iconSize: [48, 48],
    iconAnchor: [24, 24], // Adjust anchor point based on size and rotation
    popupAnchor: [0, -24],
    className: '', // Ensure no default styles are applied
  })
}
const geofenceIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Use the default Leaflet marker icon
  iconSize: [30, 45], // Make it slightly larger
  iconAnchor: [15, 45], // Anchor point corresponds to the bottom center
  popupAnchor: [0, -40], // Position the popup slightly above the icon
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png", // Default shadow for Leaflet markers
  shadowSize: [45, 45], // Size of the shadow
});
const MapController = ({ individualSalesMan, previousPosition, setPath }) => {
  const map = useMap()
  const animationRef = useRef(null)

  useEffect(() => {
    if (individualSalesMan && map) {
      const { latitude, longitude } = individualSalesMan
      const targetPosition = [latitude, longitude]

      // Update the path with the new position
      setPath((prevPath) => [...prevPath, targetPosition])

      if (previousPosition) {
        const { latitude: prevLat, longitude: prevLon } = previousPosition
        const start = [prevLat, prevLon]
        const end = targetPosition
        const duration = 5000 // Total animation duration in milliseconds

        let startTime

        const animateMarker = (timestamp) => {
          if (!startTime) startTime = timestamp

          const elapsedTime = timestamp - startTime
          const progress = Math.min(elapsedTime / duration, 1) // Calculate progress between 0 and 1

          // Calculate intermediate positions
          const newLat = prevLat + (latitude - prevLat) * progress
          const newLon = prevLon + (longitude - prevLon) * progress

          map.setView([newLat, newLon], map.getZoom(), { animate: true })

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateMarker) // Continue animation
          } else {
            // Final position
            map.setView(targetPosition, 16, { animate: true })
          }
        }

        animationRef.current = requestAnimationFrame(animateMarker)

        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current) // Clean up animation
          }
        }
      } else {
        map.setView(targetPosition, 16, { animate: true })
      }
    }
  }, [individualSalesMan, map, previousPosition, setPath])

  return null
}

const IndividualTrack = (lat, long) => {
  const { deviceId, category, name } = useParams()
  const { vehicleData, loading, error } = useVehicleTracker(deviceId)
  const [individualSalesMan, setIndividualSalesMan] = useState(null)
  const [address, setAddress] = useState(null)
  const previousPosition = useRef(null) // Ref to store the previous position
  const [path, setPath] = useState([]) // State for polyline path
  const [open, setOpen] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null); 
  const [renderTrigger, setRenderTrigger] = useState(false);
 
  // const [isCrossed,setIsCrossed] = useState(false);
  const ClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng; // Extract latitude and longitude from the event
        setClickedLocation({ latitude: lat, longitude: lng });
      },
    });
    return null; // This component doesn't render anything
  };
  const getCategory = (category) => {
    switch (category) {
      case 'bus':
        return 'bus'
      default:
        return 'bus' // Default case
    }
  }
  const selectImage = (category, sp, ig) => {
    const cate = getCategory(category)
    let image

    const imageMap = {
      bus: {
        red: busRed,
        green: busGreen,
        yellow: busYellow,
        orange: busOrange,
        gray: busGray,
      },
    }

    const ignition = ig
    const speed = sp || 0

    if (!ignition && speed < 1) {
      image = imageMap[cate].red
    } else if (ignition && speed > 2 && speed < 60) {
      image = imageMap[cate].green
    } else if (ignition && speed < 2) {
      image = imageMap[cate].yellow
    } else if (ignition && speed > 60) {
      image = imageMap[cate].orange
    } else {
      image = imageMap[cate].gray
    }

    return image // Return a default image if no match found
  }

  useEffect(() => {
    if (vehicleData) {
      setIndividualSalesMan(vehicleData[0])
      console.log(vehicleData[0])
    }
  }, [vehicleData])

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.23e7282ce5839ef4196426bbd0fd0def&lat=${individualSalesMan?.latitude}&lon=${individualSalesMan?.longitude}&format=json`,
        )
        setAddress(response.data)
      } catch (error) {
        console.error('Error fetching the address:', error)
        setAddress('Error fetching address')
      }
    }

    if (individualSalesMan?.latitude && individualSalesMan?.longitude) {
      fetchAddress()
    }
  }, [individualSalesMan])

  const navigate = useNavigate();
  const handleClickOnTrack = () => {
    navigate(`/`);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: "black",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
 
  const [openPopup, setOpenPopup] = useState(true)
  
  const [formData, setFormData] = React.useState({});

  // const [geofences, setGeofence] = useState([]);
  const role = localStorage.getItem("role");
  const [geofence, setGeofence] = useState([]);
  const [matchingGeofences, setMatchingGeofences] = useState([]);
  const [geoStatus, setGeoStatus] = useState(null);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      let response;

      // Fetch geofence data based on role
      if (role == 1) {
        response = await axios.get(`${process.env.REACT_APP_SUPER_ADMIN_API}/geofences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (role == 2) {
        response = await axios.get(`${process.env.REACT_APP_SCHOOL_API}/geofences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (role == 3) {
        response = await axios.get(`${process.env.REACT_APP_BRANCH_API}/geofences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (role == 4) {
        response = await axios.get(`${process.env.REACT_APP_USERBRANCH}/getgeofence`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (response?.data) {
        let allData = [];

        // Process data based on role
        if (role == 1) {
          allData = Object.entries(response.data).flatMap(([deviceId, stops]) =>
            stops.map((stop) => ({
              ...stop,
              deviceId,
            }))
          );
        } else if (role == 2 || role == 4) {
          allData = Object.entries(response.data.branches || {}).flatMap(([branchIndex, branch]) =>
            branch.geofences?.map((geofence) => ({
              ...geofence,
              branchId: branch.branchId,
              branchName: branch.branchName,
              deviceId: `deviceId: ${geofence.deviceId}`,
            })) || []
          );
        } else if (role == 3) {
          allData = Object.entries(response.data.geofences || {}).flatMap(([index, geofence]) => [
            {
              ...geofence,
              branchId: response.data.branchId,
              branchName: response.data.branchName,
              schoolName: response.data.schoolName,
              deviceId: `deviceId: ${geofence.deviceId}`,
            },
          ]);
        }

        setGeofence(allData);

        // Filter geofences that match the deviceId
        const filteredGeofences = allData.filter(
          (item) => item.deviceId == `deviceId: ${deviceId}`
        );
        setMatchingGeofences(filteredGeofences);
        console.log("mmm",filteredGeofences)      }
    } catch (error) {
      console.error('Error fetching geofence data:', error);
    }
  };
  const fetchStatus = async () =>{
    try {
      console.log("Devvvvvvvvvvvvvvvvvvvvv", deviceId);

// Use template literal to properly pass deviceId into the URL
const response = await fetch(`https://parentseyereplica.onrender.com/iscrossedhistory?deviceIds=${deviceId}`);

if (!response.ok) {
  throw new Error('Network response was not ok');
}

const data = await response.json();
console.log("status data", data); // Assuming the response is in JSON format

setGeoStatus(data); // Store the data in geoStatus state
    } catch (err) {
      // setError(err.message); // Handle error by setting the error message in state
    }
  }
  const parseArea = (area) => {
    const match = area.match(/Circle\(([\d.]+) ([\d.]+), ([\d.]+)\)/);
    if (match) {
      const [, lat, lng, radius] = match;
      return { lat: parseFloat(lat), lng: parseFloat(lng), radius: parseFloat(radius) };
    }
    return null;
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
    fetchData();
    fetchStatus();
  }, 5000); 
  return () => clearInterval(interval);
  }, [])
  useEffect(() => {
    // Trigger re-render whenever `geoStatus` or `matchingGeofences` changes
    setRenderTrigger((prev) => !prev);
  }, [geoStatus, matchingGeofences]);
  const handleGeofenceSubmitSuccess = () => {
    // After the geofence is successfully added, fetch the updated data
    fetchData();
  };
  const [showGeofences, setShowGeofences] = useState(false); // Default to show geofences
  const [showRoutes, setShowRoutes] = useState(false); // Default to show geofences

  return (
    <>
      <div className="row">
        <div className="head">
            <h2>Tracking {name ? name : 'User Name'}</h2>
            {/* <h2>Tracking {deviceId ? deviceId : 'User Name'}</h2> */}
            <div style={{display:"flex", gap:"4px"}}>
            <CButton color="danger" // This makes the button red
      onClick={handleClickOnTrack}
    >
      Back to Dashboard
    </CButton>
    <CButton
              color="primary"
              onClick={() => setShowGeofences(!showGeofences)} // Toggle visibility
            >
              {showGeofences ? 'Hide Geofences' : 'Show Geofences'}
            </CButton>
            <CButton
              color="primary"
              onClick={() => setShowRoutes(!showRoutes)} // Toggle visibility
            >
              {showRoutes ? 'Hide Routes' : 'Show Routes'}
            </CButton>
            </div>
         
        </div>

        <div className={showRoutes ? "col-12" : "col-12"}>
          <div className="individualMap">
            <MapContainer
              center={[21.1458, 79.0882]} // Default center in case data isn't available
              zoom={7}
              style={{ height: '650px', marginTop: '7px', border: '1px solid black'}}
            >
              <ClickHandler />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; RocketSales, HB Gadget Solutions Nagpur"
              />

              <Draggable>
                <CCard className="mb-4 parametersContainer" style={{ zIndex: '999' }}>
                  <CCardHeader>Tasks</CCardHeader>
                  <CCardBody>
                    <div className="name">
                      <div className="nameImage">
                        <img
                          src={selectImage(
                            category,
                            individualSalesMan?.speed,
                            individualSalesMan?.attributes?.ignition,
                          )}
                          className="nimg upperdata"
                          alt="vehicle"
                        />
                      </div>
                      <div>{name ? name : 'User Name'}</div>
                    </div>

                    <div className="parameters">
                      <div className="col">
                        <strong>Address</strong>
                        {address
                          ? ` : ${address.address?.road}, ${address.address?.village}, ${address.address?.state_district}, ${address.address?.state}, ${address.address?.country}, ${address.address?.postcode}`
                          : ' : Address of User'}
                      </div>

                      <div className="col">
                        <strong>Ignition</strong>
                        {` : ${individualSalesMan?.attributes?.ignition ? 'On' : 'Off'}`}
                      </div>
                      <div className="col">
                        <strong>Speed</strong>
                        {` : ${Math.round(individualSalesMan?.speed)} kmph`}
                      </div>
                      <div className="col">
                        <strong>Latitude</strong>
                        {` : ${individualSalesMan?.latitude}`}
                      </div>
                      <div className="col">
                        <strong>Longitude</strong>
                        {` : ${individualSalesMan?.longitude}`}
                      </div>
                      <div className="col">
                        <strong>Category</strong>
                        {` : ${category}`}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </Draggable>
             
              {clickedLocation && (
                 <ReactLeafletDriftMarker
                 position={[clickedLocation.latitude, clickedLocation.longitude]}
                 icon={geofenceIcon}
                 duration={100}
               >
                  <GeofenceForm
                   formData={formData}
                   setFormData={setFormData}
                   clickedLocation={clickedLocation}
                   deviceId={deviceId}
                   setOpenPopup={setOpenPopup}
                   onGeofenceSubmitSuccess={handleGeofenceSubmitSuccess} // Pass the callback
                 />
               </ReactLeafletDriftMarker>
        // <Popup
        //   position={[clickedLocation.latitude, clickedLocation.longitude]}
        //   onClose={() => setClickedLocation(null)} // Close popup when it's closed
        // >
        //   <div>
        //     <h4>Clicked Location</h4>
        //     <p>Latitude: {clickedLocation.latitude}</p>
        //     <p>Longitude: {clickedLocation.longitude}</p>
            
        //   </div>
        // </Popup>
      )}     
  {individualSalesMan && (
      <ReactLeafletDriftMarker
        position={[individualSalesMan.latitude, individualSalesMan.longitude]}
        icon={getVehicleIcon(individualSalesMan, category)}
        duration={2000}
      >
         <GeofenceForm
          formData={formData}
          setFormData={setFormData}
          individualSalesMan={individualSalesMan}
          deviceId={deviceId}
          setOpenPopup={setOpenPopup}
          onGeofenceSubmitSuccess={handleGeofenceSubmitSuccess} // Pass the callback
        />
      </ReactLeafletDriftMarker>
    )}

              {/* Draw polyline based on path */}
           <Polyline positions={path} color="blue"/>
              <MapController
                individualSalesMan={individualSalesMan}
                previousPosition={previousPosition.current}
                setPath={setPath}
              />/
                {/* {showGeofences && matchingGeofences.map((geofence) => {
              const parsedArea = parseArea(geofence.area);
              if (parsedArea) {
                return (
                  <Circle
                    key={geofence._id}
                    center={[parsedArea.lat, parsedArea.lng]}
                    radius={parsedArea.radius}
                    className={`geofence-circle ${geofence._id}`}
                    color={geofence.isCrossed ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 128, 0, 0.5)"}
                    strokeWidth={2}
                    fillColor={geofence.isCrossed ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 128, 0, 0.2)"}
                    fillOpacity={0.2}
                  >
                    <Popup>
                      <div>
                        <h3>Geofence Details</h3>
                        <p><strong>name</strong> {geofence.name}</p>
                        <p><strong>Crossed:</strong> {geofence.isCrossed ? "Yes" : "No"}</p>
                        <p><strong>Radius:</strong> {parsedArea.radius} meters</p>
                      </div>
                    </Popup>
                  </Circle>
                );
              }
              return null;
            })} */}
               {showGeofences && matchingGeofences.map((geofence) => {
                  const parsedArea = parseArea(geofence.area);
                  if (parsedArea) {
                    const matchingGeoStatus = geoStatus.data.filter(
                      (status) => status.geofenceName === geofence.name && status.status === "Exited"
                    );
                    var hasExitedStatus = matchingGeoStatus.length > 0;
                   
                    return (
                      
                      <Circle
                      key={`${geofence._id}-${hasExitedStatus}`}
                        // key={geofence._id}
                        center={[parsedArea.lat, parsedArea.lng]}
                        radius={parsedArea.radius}
                        className={`geofence-circle ${geofence._id}`}
                        color={hasExitedStatus ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 128, 0, 0.5)"}
                        strokeWidth={2}
                        fillColor={hasExitedStatus ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 128, 0, 0.2)"}
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div>
                            <h3>Geofence Details</h3>
                            <p><strong>Name:</strong> {geofence.name}</p>
                            <p><strong>Crossed:</strong> {geofence.isCrossed ? "Yes" : "No"}</p>
                            <p><strong>Radius:</strong> {parsedArea.radius} meters</p>
                          </div>
                        </Popup>
                      </Circle>
                    );
                  }
                  return null;
                })}
                {showRoutes && (
            <div
              className="sidebar"
              style={{
                width: '300px',
                backgroundColor: '#f8f9fa',
                padding: '10px',
                height: '650px', // Match map height
                position: 'absolute',
                right: 0,
                top: 0,
                boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
                zIndex: '1000', // Ensure it appears in front of the map, but behind the "Show Routes" button
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4>Travel Route Information</h4>
                {/* Close button */}
                <CButton
                  color="danger"
                  size="sm"
                  style={{ marginTop: '10px' ,marginBottom:'10px'}}
                  onClick={() => setShowRoutes(false)}
                >
                  Close
                </CButton>
              </div>
  
              <div className="vehicle-list" style={{ overflowY: 'auto', height: 'calc(100% - 40px)' }}>
              {matchingGeofences.map((geofence, index) => {
    // Filter geostatus to find matching geofenceName and "Entered" status
    // var arrivalStatus;
    const arrivalStatus = geoStatus?.data?.filter(status => status.geofenceName === geofence.name && status.status === 'Entered') || [];
    console.log("arrived at", arrivalStatus);
    const dipartureStatus = geoStatus?.data?.filter(status => status.geofenceName === geofence.name && status.status === 'Exited') || [];
    console.log("departed at", dipartureStatus);            
    return (
      <div
        key={index}
        // key={`${geofence._id}-${arrivalStatus}`}
        className="vehicle-item"
        style={{
          marginBottom: '10px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      >
        <h5>{geofence.name}</h5>
        <p><strong>Arrival Time:</strong> {arrivalStatus[0] ? new Date(arrivalStatus[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) : 'N/A'}</p>
        <p><strong>Departure Time:</strong> {dipartureStatus[0] ? new Date(dipartureStatus[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) : 'N/A'}</p>
        <p><strong>Stop Duration:</strong> {
            arrivalStatus[0] && dipartureStatus[0] ? (() => {
                const arrivalTime = new Date(arrivalStatus[0].createdAt);
                const departureTime = new Date(dipartureStatus[0].createdAt);
                const diffMs = departureTime - arrivalTime; // Difference in milliseconds
                const minutes = Math.floor((diffMs / 1000) / 60); // Convert to minutes
                return `${minutes} min`;
            })() : 'N/A'
        }</p>
        <p><strong>ETA:</strong> {geofence.eta}</p>
      </div>
    );
  })}
              </div>
            </div>
          )}
            </MapContainer>
            {/* Sidebar for Vehicle Information */}
      {/* {showRoutes && (
        <div className="col-4" style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
          <h4>Vehicle Information</h4>
          <div className="vehicle-list">
            {matchingGeofences.map((geofence, index) => (
              <div key={index} className="vehicle-item" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                <h5>{geofence.name}</h5>
                <p><strong>Location:</strong> {geofence.location}</p>
                <p><strong>Arrival Time:</strong> {geofence.arrivalTime}</p>
                <p><strong>Departure Time:</strong> {geofence.departureTime}</p>
                <p><strong>ETA:</strong> {geofence.eta}</p>
                <p><strong>Current Location:</strong> {geofence.latitude}, {geofence.longitude}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
      
          </div>
        </div>
        
      </div>
    </>
  )

  // return (
  //   <>
  //     <div className="row">
  //       <div className="head">
  //         <h2>Tracking {name ? name : 'User Name'}</h2>
  //         <div style={{ display: "flex", gap: "4px", zIndex: "999" }}>
  //           <CButton color="danger" onClick={handleClickOnTrack}>
  //             Back to Dashboard
  //           </CButton>
  //           <CButton color="primary" onClick={() => setShowGeofences(!showGeofences)}>
  //             {showGeofences ? 'Hide Geofences' : 'Show Geofences'}
  //           </CButton>
  //           <CButton
  //             color="primary"
  //             onClick={() => setShowRoutes(!showRoutes)}
  //             style={{
  //               position: 'relative',
  //               zIndex: showRoutes ? '10' : 'auto' // Ensure button stays in front of the sidebar
  //             }}
  //           >
  //             {showRoutes ? 'Hide Routes' : 'Show Routes'}
  //           </CButton>
  //         </div>
  //       </div>
  
  //       <div className="tracking-container" style={{ display: 'flex', width: '100%' }}>
  //         {/* Map Section */}
  //         <div className={showRoutes ? "col-12" : "col-12"} style={{ position: 'relative' }}>
  //           <div className="individualMap">
  //             <MapContainer
  //               center={[21.1458, 79.0882]}
  //               zoom={7}
  //               style={{ height: '650px', marginTop: '7px', border: '1px solid black' }}
  //             >
  //               <ClickHandler />
  //               <TileLayer
  //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //                 attribution="&copy; RocketSales, HB Gadget Solutions Nagpur"
  //               />
  
  //               {/* Vehicle Marker on Map */}
  //               {individualSalesMan && (
  //                 <ReactLeafletDriftMarker
  //                   position={[individualSalesMan.latitude, individualSalesMan.longitude]}
  //                   icon={getVehicleIcon(individualSalesMan, category)}
  //                   duration={2000}
  //                 >
  //                   <GeofenceForm
  //                     formData={formData}
  //                     setFormData={setFormData}
  //                     individualSalesMan={individualSalesMan}
  //                     deviceId={deviceId}
  //                     setOpenPopup={setOpenPopup}
  //                     onGeofenceSubmitSuccess={handleGeofenceSubmitSuccess}
  //                   />
  //                 </ReactLeafletDriftMarker>
  //               )}
  
  //               {/* Polyline for Route */}
  //               <Polyline positions={path} color="blue" />
  
  //               {/* Geofence Circles */}
  //               {showGeofences && matchingGeofences.map((geofence) => {
  //                 const parsedArea = parseArea(geofence.area);
  //                 if (parsedArea) {
  //                   const matchingGeoStatus = geoStatus.data.filter(
  //                     (status) => status.geofenceName === geofence.name && status.status === "Exited"
  //                   );
  //                   const hasExitedStatus = matchingGeoStatus.length > 0;
  //                   console.log(matchingGeoStatus);
  //                   return (
  //                     <Circle
  //                       key={geofence._id}
  //                       center={[parsedArea.lat, parsedArea.lng]}
  //                       radius={parsedArea.radius}
  //                       className={`geofence-circle ${geofence._id}`}
  //                       color={hasExitedStatus ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 128, 0, 0.5)"}
  //                       strokeWidth={2}
  //                       fillColor={hasExitedStatus ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 128, 0, 0.2)"}
  //                       fillOpacity={0.4}
  //                     >
  //                       <Popup>
  //                         <div>
  //                           <h3>Geofence Details</h3>
  //                           <p><strong>Name:</strong> {geofence.name}</p>
  //                           <p><strong>Crossed:</strong> {geofence.isCrossed ? "Yes" : "No"}</p>
  //                           <p><strong>Radius:</strong> {parsedArea.radius} meters</p>
  //                         </div>
  //                       </Popup>
  //                     </Circle>
  //                   );
  //                 }
  //                 return null;
  //               })}
            
  //             </MapContainer>
  //                 {/* Sidebar for Vehicle Information */}
  //         {showRoutes && (
  //           <div
  //             className="sidebar"
  //             style={{
  //               width: '300px',
  //               backgroundColor: '#f8f9fa',
  //               padding: '10px',
  //               height: '650px', // Match map height
  //               position: 'absolute',
  //               right: 0,
  //               top: 0,
  //               boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
  //               zIndex: '1000', // Ensure it appears in front of the map, but behind the "Show Routes" button
  //               overflowY: 'auto',
  //             }}
  //           >
  //             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  //               <h4>Travel Route Information</h4>
  //               {/* Close button */}
  //               <CButton
  //                 color="danger"
  //                 size="sm"
  //                 style={{ marginTop: '10px' ,marginBottom:'10px'}}
  //                 onClick={() => setShowRoutes(false)}
  //               >
  //                 Close
  //               </CButton>
  //             </div>
  
  //             <div className="vehicle-list" style={{ overflowY: 'auto', height: 'calc(100% - 40px)' }}>
  //               {matchingGeofences.map((geofence, index) => (
  //                 <div
  //                   key={index}
  //                   className="vehicle-item"
  //                   style={{
  //                     marginBottom: '10px',
  //                     padding: '10px',
  //                     border: '1px solid #ddd',
  //                     borderRadius: '4px',
  //                   }}
  //                 >
  //                   <h5>{geofence.name}</h5>
  //                   {/* <p><strong>Location:</strong> {geofence.location}</p> */}
  //                   <p><strong>Arrival Time:</strong> {geofence.arrivalTime}</p>
  //                   <p><strong>Departure Time:</strong> {geofence.departureTime}</p>
  //                   <p><strong>ETA:</strong> {geofence.eta}</p>
  //                   {/* <p><strong>Current Location:</strong> {geofence.latitude}, {geofence.longitude}</p> */}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         )}
  //           </div>
  //         </div>
  
          
  //       </div>
  //     </div>
  //   </>
  // );
  
  
  
}

export default IndividualTrack;