import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { green, red, yellow, blue, grey, orange } from "@mui/material/colors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StopIcon from "@mui/icons-material/Stop";
import SpeedIcon from "@mui/icons-material/Speed";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useContext } from "react";
import { TotalResponsesContext } from "../../TotalResponsesContext";
//import {StudentDetail} from "./Components/VariousTables/School/StudentDetail/StudentDetail.jsx"
//import {StudentDetail} from ".VariousTables/StudentDetail"
// import Leave from './Components/School/Leave/Leave.jsx';
export const Cards = ({
  vehicleRunningCount,
  vehicleStoppedCount,
  vehicleOverspeedCount,
  vehicleIdleCount,
  vehicleUnreachableCount,
}) => {
  const { totalResponses, totalLeaveRequest } = useContext(
    TotalResponsesContext
  ); // Consume the context
  // const { totalLeaveRequest } = useContext(TotalResponsesContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap:'11px 48px'
      }}
    >
      <Card
        sx={{
          width: 197,
          margin: "5px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "10px" }}>
          {/* Box with similar style as the first one */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: green[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px", // Consistent height as the first card
            }}
          >
            <AccessTimeIcon sx={{ color: green[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Running</Typography>{" "}
            {/* Font size consistent with first card */}
          </Box>

          {/* Typography similar to first card */}
          <Typography variant="h6" sx={{ color: green[500], fontSize: 18 }}>
            {vehicleRunningCount}/Assets
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: 197,
          margin: "5px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: red[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px", // Consistent height as the first card
            }}
          >
            <StopIcon sx={{ color: red[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Stopped</Typography>
            {/* Font size consistent with the first card */}
          </Box>
          <Typography variant="h6" sx={{ color: red[500], fontSize: 18 }}>
            {vehicleStoppedCount}/Assets
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 197,
          margin: "5px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: orange[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px", // Consistent height
            }}
          >
            <SpeedIcon sx={{ color: orange[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Overspeed</Typography>
            {/* Consistent font size */}
          </Box>
          <Typography variant="h6" sx={{ color: orange[500], fontSize: 18 }}>
            {vehicleOverspeedCount}/Assets
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 197,
          margin: "5px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: yellow[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px", // Consistent height
            }}
          >
            <HourglassEmptyIcon
              sx={{ color: yellow[500], marginRight: "5px" }}
            />
            <Typography sx={{ fontSize: 20 }}>Idle</Typography>
            {/* Consistent font size */}
          </Box>
          <Typography variant="h6" sx={{ color: yellow[500], fontSize: 18 }}>
            {vehicleIdleCount}/Assets
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 197,
          margin: "5px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: blue[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px", // Consistent height
            }}
          >
            <ErrorIcon sx={{ color: blue[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Unreachable</Typography>
            {/* Consistent font size */}
          </Box>
          <Typography variant="h6" sx={{ color: blue[500], fontSize: 18 }}>
            {vehicleUnreachableCount}/Assets
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 197, margin: "5px" }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: yellow[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px",
            }}
          >
            <HourglassEmptyIcon
              sx={{ color: yellow[500], marginRight: "5px" }}
            />
            <Typography sx={{ fontSize: 20 }}>All Vehicles</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: yellow[500], fontSize: 18 }}>
            {vehicleUnreachableCount +
              vehicleOverspeedCount +
              vehicleStoppedCount +
              vehicleIdleCount +
              vehicleRunningCount}
            /student
          </Typography>
        </CardContent>
      </Card>
      {/* New */}

      {/* Running */}
      <Card sx={{ width: 197, margin: "5px" }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: green[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px",
            }}
          >
            <AccessTimeIcon sx={{ color: green[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Total No. Of Student</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: green[500], fontSize: 18 }}>
            {totalResponses}/Students
          </Typography>
        </CardContent>
      </Card>

      {/* Stopped */}
      <Card sx={{ width: 197, margin: "5px" }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: red[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px",
            }}
          >
            <StopIcon sx={{ color: red[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Present Student</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: red[500], fontSize: 18 }}>
            {vehicleStoppedCount}/student
          </Typography>
        </CardContent>
      </Card>

      {/* Overspeed */}
      <Card sx={{ width: 197, margin: "5px" }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: orange[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px",
            }}
          >
            <SpeedIcon sx={{ color: orange[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Absent Student</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: orange[500], fontSize: 18 }}>
            {vehicleOverspeedCount}/student
          </Typography>
        </CardContent>
      </Card>

      {/* Idle */}

      {/* Leaves Card */}
      <Card sx={{ width: 197, margin: "5px" }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: blue[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px",
            }}
          >
            <ErrorIcon sx={{ color: blue[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Leaves</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: blue[500], fontSize: 18 }}>
            {totalLeaveRequest}/student
          </Typography>
        </CardContent>
      </Card>

      {/* New */}
      <Card sx={{ width: 197, margin: "5px" }}>
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: grey[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px",
            }}
          >
            <NewReleasesIcon sx={{ color: grey[200], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Drivers</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: grey[500], fontSize: 18 }}>
            00/drivers
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: 197,
          margin: "5px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: red[200],
              padding: "5px",
              borderRadius: 2,
              marginBottom: "5px",
              height: "60px", // Consistent height as the first card
            }}
          >
            <StopIcon sx={{ color: red[500], marginRight: "5px" }} />
            <Typography sx={{ fontSize: 20 }}>Supervisor</Typography>
            {/* Font size consistent with the first card */}
          </Box>
          <Typography variant="h6" sx={{ color: red[500], fontSize: 18 }}>
            {vehicleStoppedCount}/Assets
          </Typography>
        </CardContent>
      </Card>
     
    </Box>
  );
};
