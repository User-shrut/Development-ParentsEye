// import * as React from "react";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import "./GeoFencing.css"
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import { MapContainer, TileLayer } from "react-leaflet";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
//   "& .MuiPaper-root": {
//     maxWidth: "180rem !important",
//     width: "180rem !important",
//     height: "600px !important",
//     marginTop: "5rem !important",
//   },
// }));

// const osmProvider = {
//     url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=jXbNOuobzSRdq08XiuKY",
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//   };
  
//   const center = {
//     lat: 19.9606,
//     lng: 79.2961,
//   };
  

// const BootstrapDialogTitle = ({ children, onClose, ...other }) => {
//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// export default function GeoFencing() {
//   const [assetStatusValue, setAssetStatusValue] = React.useState("");
//   const [assetsValue, setAssetsValue] = React.useState("");
//   const [usersValue, setUsersValue] = React.useState("");
//   const [groupsValue, setGroupsValue] = React.useState("");
//   const [areasValue, setAreasValue] = React.useState("");
//   const [landmarksValue, setLandmarksValue] = React.useState("");
//   const [vehiclesValue, setVehiclesValue] = React.useState("");
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Geo
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           Geofencing
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <div style={{ display: "flex", gap: "46px", justifyContent:"center"}}>
//             <FormControl
//               variant="outlined"
//               fullWidth
//               sx={{
//                 width: 250,
//                 "& .MuiInputBase-root": { height: 40 },
//                 marginBottom: 2,
//               }}
//             >
//               <InputLabel id="vehicles-label-6">Select Vehicles</InputLabel>
//               <Select
//                 labelId="vehicles-label-6"
//                 id="vehicles-select-6"
//                 value={vehiclesValue}
//                 onChange={(e) => setVehiclesValue(e.target.value)}
//                 label="Select Asset Status"
//               >
//                 <MenuItem value="MH40BL3039-BESA">MH40BL3039-BESA</MenuItem>
//                 <MenuItem value="MH40AT0461-HANSA">MH40AT0461-HANSA</MenuItem>
//                 <MenuItem value="MH04CU9077">MH04CU9077</MenuItem>
//                 <MenuItem value="MH34BG5552">MH34BG5552</MenuItem>
//                 <MenuItem value="MH31FC2330">MH31FC2330</MenuItem>
//                 <MenuItem value="MH31FC1100">MH31FC1100</MenuItem>
//                 <MenuItem value="MH31-EQ0455">MH31-EQ0455</MenuItem>
//                 <MenuItem value="Mixer">Mixer</MenuItem>
//                 <MenuItem value="MH29M8497-HANSA">MH29M8497-HANSA</MenuItem>

//                 {/* Add your landmark options here */}
//               </Select>
//             </FormControl>

//             <FormControl
//               variant="outlined"
//               fullWidth
//               sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
//             >
//               <InputLabel id="asset-status-label-1">POI Type</InputLabel>
//               <Select
//                 labelId="asset-status-label-1"
//                 id="asset-status-select-1"
//                 value={assetStatusValue}
//                 onChange={(e) => setAssetStatusValue(e.target.value)}
//                 label="Select Asset Status"
//               >
//                 <MenuItem value="All assets">All assets</MenuItem>
//                 <MenuItem value="Running">Running</MenuItem>
//                 <MenuItem value="Parked">Parked</MenuItem>
//                 <MenuItem value="less than 10km">Less than 10km</MenuItem>
//                 <MenuItem value="Out of Network">Out of Network</MenuItem>
//                 <MenuItem value="Device Fault">Device Fault</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl>
//             <Box
//               component="form"
//               sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 id="outlined-basic"
//                 label="Place Name"
//                 variant="outlined"
//               />
//             </Box>
//             </FormControl>
//             <FormControl>
//             <Box
//               component="form"
//               sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 id="outlined-basic"
//                 label="Tolerance(Meters)"
//                 variant="outlined"
//               />
//             </Box>
//             </FormControl>

            

//             <button className="Savebtn">Save</button>
//           </div>
//           <div className="mapContainerInGeofencing">
//           <MapContainer
//           center={center}
//           zoom={7} 
//           style={{ height: "390px", width: "100%" }}
//         >
//           <TileLayer url={osmProvider.url} attribution={osmProvider.attribution} />

//         </MapContainer>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Save changes
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// }
import * as React from "react";
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
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxWidth: "180rem !important",
    width: "180rem !important",
    height: "600px !important",
    marginTop: "5rem !important",
  },
}));

const osmProvider = {
  url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=jXbNOuobzSRdq08XiuKY",
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const center = {
  lat: 19.9606,
  lng: 79.2961,
};

const BootstrapDialogTitle = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function GeoFencing({ lat, long, deviceId }) {
  const [assetStatusValue, setAssetStatusValue] = React.useState("");
  const [assetsValue, setAssetsValue] = React.useState("");
  const [usersValue, setUsersValue] = React.useState("");
  const [groupsValue, setGroupsValue] = React.useState("");
  const [areasValue, setAreasValue] = React.useState("");
  const [landmarksValue, setLandmarksValue] = React.useState("");
  const [vehiclesValue, setVehiclesValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
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

  const handleGeofenceSubmit = async (e) => {
    e.preventDefault();
    console.log(lat, long);
    console.log("ye hai geofence", formData);
    const circleFormat = `Circle(${long} ${lat}, ${formData.radius})`;
    const geofenceData = {
      name: formData.name,
      area: circleFormat,
      busStopTime: formData.busStopTime,
      deviceId: deviceId,
    };
    console.log("formated data: ", geofenceData);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await axios.post(`${process.env.REACT_APP_API}/geofence`, geofenceData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("successfully geofence is added");
        handleClose();
      }
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred");
    }
    handleClose(true);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" className="mb-4" onClick={handleClickOpen}>
        Add Geofence
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Geofence
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent>
            <form onSubmit={handleGeofenceSubmit}>
              <FormControl
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Bus Stop Name"
                  name="name"
                  value={formData.name !== undefined ? formData.name : ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <TextField
                  label="Radius of Area"
                  name="radius"
                  type="number"
                  value={formData.radius !== undefined ? formData.radius : ""}
                  onChange={(e) =>
                    setFormData({ ...formData, radius: e.target.value })
                  }
                  required
                />
                <TextField
                  label="Bus Time"
                  name="time"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    formData.busStopTime !== undefined
                      ? formData.busStopTime
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, busStopTime: e.target.value })
                  }
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </DialogContent>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
