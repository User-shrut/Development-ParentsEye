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
import animetedcarimg from "../googlemap/SVG/animetedcarimg.png";
import cartoonimgbus from "../googlemap/SVG/cartoonimgbus.png";
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
  const {
    TotalResponsesStudent,
    totalResponses,
    allDevices,
    totalLeaveRequest,
    TotalResponsesPresent,
    TotalResponsesAbsent,
    TotalResponsesDrivers,
    TotalResponsesSupervisor,
  } = useContext(TotalResponsesContext); // Consume the context
  // const { totalLeaveRequest } = useContext(TotalResponsesContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1px 100px",
      }}
    >
      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Total students
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {TotalResponsesStudent}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Present students
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {TotalResponsesPresent}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>
      {/* Stopped */}
      {/* <Card sx={{ width: 197, margin: "5px" }}>
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
            {TotalResponsesPresent}/student
          </Typography>
        </CardContent>
      </Card> */}

      {/* <Card sx={{ width: 197, margin: "5px" }}>
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
            {TotalResponsesAbsent}/student
          </Typography>
        </CardContent>
      </Card> */}
      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Absent
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {TotalResponsesAbsent}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Requests
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {totalLeaveRequest}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Drivers
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {TotalResponsesDrivers}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Supervisors
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {TotalResponsesSupervisor}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-48px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Running Vehicles
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {vehicleRunningCount}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Parked Vehicles
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {vehicleStoppedCount}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>



      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Offline Vehicles
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {vehicleUnreachableCount}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-68px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>




      <Box
        sx={{
          width: "186px",
          height: "101px", // Adjust height based on your image
          marginTop: "23px",
          // backgroundImage: `url(${cartoonimgbus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 2,
          borderLeft: "4px solid", // Mimics `border-start-4`
          borderColor: "success.main", // Mimics `border-start-success`
          padding: "10px", // Add padding similar to `py-1 px-3`
        }}
      >
        {/* Running text */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem", // Equivalent to `small`
            whiteSpace: "nowrap", // Mimics `text-truncate`
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px", // Space between text and number
          }}
        >
          Total Devices
        </Box>

        {/* Student count */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Equivalent to `fs-5`
            fontWeight: "bold", // Equivalent to `fw-semibold`
            color: "success.main", // Mimics `runningData` color
          }}
        >
          {allDevices}
        </Typography>

        {/* Image at the bottom (car icon) */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer", // Mimics `onClick` behavior
          }}
        >
          <img
            style={{
              width: "7.5rem",
              marginBottom: "9px",
              marginRight: "-48px",
            }}
            src={cartoonimgbus}
            alt=""
          />
        </Box>
      </Box>


    </Box>
  );
};
