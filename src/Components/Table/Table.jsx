import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { COLUMNS } from "./columns.js";
import MOCK_DATA from "./MOCK_DATA.json";
import GoogleMapComponent from "../googlemap/googlemap.jsx";
import { Cards } from "../Cards/Cards.jsx";
import * as XLSX from "xlsx";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Typography,
  keyframes,
} from "@mui/material";
import IndividualGooglemap from "../googlemap/IndividualGooglemap/IndividualGooglemap.jsx";
import "./table.css";
import {
  CCol,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { IoMdBatteryCharging } from "react-icons/io";
import { MdGpsFixed, MdGpsNotFixed } from "react-icons/md";
import { PiEngineFill } from "react-icons/pi";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "./DashCon.css";
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// Extend dayjs with the duration plugin
import busY from "../../assets/school-bus-yellow.png"
dayjs.extend(duration);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

export const Tablee = ({ data }) => {
  // console.log(data);
  const [page, setPage] = useState(0);
  const [individualDataObj, setIndividualDataObj] = useState({});
  const [filterText, setFilterText] = useState("");
  const [filteredRows, setFilteredRows] = useState(
    MOCK_DATA.map((row) => ({ ...row, isSelected: false }))
  );
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(COLUMNS.map((col) => [col.accessor, true]))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [vehicleRunningCount, setVehicleRunningCount] = useState(0);
  const [vehicleStoppedCount, setVehicleStoppedCount] = useState(0);
  const [vehicleOverspeedCount, setVehicleOverspeedCount] = useState(0);
  const [vehicleIdleCount, setVehicleIdleCount] = useState(0);
  const [vehicleUnreachableCount, setVehicleUnreachableCount] = useState(0);
  const [apiData, setAPIData] = useState([]);
  const [assetDetailsModalOpen, setAssetDetailsModalOpen] = useState(false);
  const [assetStatusValue, setAssetStatusValue] = useState("");
  const [assetsValue, setAssetsValue] = useState("");
  const [usersValue, setUsersValue] = useState("");
  const [groupsValue, setGroupsValue] = useState("");
  const [areasValue, setAreasValue] = useState("");
  const [landmarksValue, setLandmarksValue] = useState("");
  const [vehiclesValue, setVehiclesValue] = useState("");
  const [totDist, setTotDist] = useState(0);
  const [attributes1, setAttributes1] = useState("");
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [addressesValue, setAddressesValue] = useState();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
  const [individualMap, setIndividualMap] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const role = localStorage.getItem("role");
  const [currentPage, setCurrentPage] = useState(0); // State for the current page
  const [rowsPerPage, setRowsPerPage] = useState(13); // State for the number of rows per page

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update the current page state
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value)); // Update rows per page
    setCurrentPage(0); // Reset to first page
  };

  // Calculate the number of pages
  const pageCount = Math.ceil(data.length / rowsPerPage);

  // Get the current rows based on the selected page
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = data.slice(startIndex, endIndex);

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    setFilteredRows(data.map((row) => ({ ...row, isSelected: false })));
  }, [data]);

  useEffect(() => {
    setLatitude(data.map((row) => row.latitude));
    // console.log(latitude);
  }, [data]);

  useEffect(() => {
    setLongitude(data.map((row) => row.longitude));
    //  console.log(longitude);
  }, [data]);

  useEffect(() => {
    // console.log(filteredRows);
    // for (let i = 0; i < filteredRows.length; i++) {
    //   let row = filteredRows[i];
    //   if (row.hasOwnProperty('attributes')) {
    //     for (let key in row.attributes) {
    //       if (key === 'totalDistance') {
    //         console.log(row.attributes[key]);
    //         // COLUMNS(row.attributes[key])
    //       } else {
    //         console.log('');
    //       }
    //     }
    //   }
    // }
  }, [filteredRows]);

  useEffect(() => {
    const running = data.filter((row) => row.speed > 0).length;
    setVehicleRunningCount(running);

    const stopped = data.filter(
      (row) => row.speed === 0 && row.status === "offline"
    ).length;
    setVehicleStoppedCount(stopped);

    const overspeed = data.filter((row) => row.speed > 140).length;
    setVehicleOverspeedCount(overspeed);

    const idle = data.filter(
      (row) => row.speed === 0 && row.status === "online"
    ).length;
    setVehicleIdleCount(idle);

    const currentTime = new Date();
    const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;

    const unreachable = data.filter(
      (row) =>
        row.status === "offline" &&
        currentTime - new Date(row.lastUpdate) > twelveHoursInMilliseconds
    ).length;

    setVehicleUnreachableCount(unreachable);
  }, [data]);

  useEffect(() => {
    const getAddressFromLatLng = async (lat, lng) => {
      const apiKey = "AIzaSyAvHHoPKPwRFui0undeEUrz00-8w6qFtik";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        if (response.data.results.length > 0) {
          setAddressesValue(response.data.results[0].formatted_address);
        } else {
          setAddressesValue("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddressesValue("Error fetching address");
      }
    };

    const fetchAddresses = async () => {
      const addresses = await Promise.all(
        data.map(async (row) => {
          const address = await getAddressFromLatLng(
            row.latitude,
            row.longitude
          );
          // console.log('lat long value',row.latitude, row.longitude)
          return { ...row, address };
        })
      );
      setAddressesValue(addresses);
      // console.log(addresses);
    };

    fetchAddresses();
  }, [data]);

  useEffect(() => {
    filterData(filterText);
  }, [filterText]);

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);
  };

  const filterData = (text) => {
    const filteredData = MOCK_DATA.filter((row) =>
      Object.values(row).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(text.toLowerCase())
      )
    ).map((row) => ({ ...row, isSelected: false }));
    setFilteredRows(filteredData);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleVehicleClick = () => {
    setAssetDetailsModalOpen(true);
  };

  const handleLocationClick = (latitude, longitude, row) => {
    setIndividualMap(true);
    console.log("I am row .........................   ", row);
    setLati(latitude);

    setLongi(longitude);
  };

  const handleData = (dataLat, dataLng, data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].latitude === dataLat && data[i].longitude === dataLng) {
        setIndividualDataObj(data[i]);
        // console.log(data[i]);
      }
    }
  };

  const handleExport = () => {
    const dataToExport = filteredRows.map((row) => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Dashboard.xlsx");
  };

  const handleColumnVisibilityChange = (accessor) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [accessor]: !prevState[accessor],
    }));
  };

  const handleRowSelect = (index) => {
    const newFilteredRows = [...filteredRows];
    newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
    setFilteredRows(newFilteredRows);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newFilteredRows = filteredRows.map((row) => ({
      ...row,
      isSelected: newSelectAll,
    }));
    setFilteredRows(newFilteredRows);
    setSelectAll(newSelectAll);
  };

  const sortedData = [...filteredRows];

  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const columns = COLUMNS.map((col) => ({
    ...col,
    Cell:
      col.accessor === "select"
        ? ({ row }) => (
            <input
              type="checkbox"
              checked={row.original.isSelected}
              onChange={() => handleRowSelect(row.index)}
            />
          )
        : col.Cell,
  }));
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  // const fetchAddress = useCallback(async (latitude, longitude) => {
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();

  //     if (data.address) {
  //       setAddress(
  //         `${data.address.neighbourhood || ""}, ${data.address.city || ""}, ${
  //           data.address.state || ""
  //         }, ${data.address.postcode || ""}`
  //       );
  //     } else {
  //       setError("No address details available");
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     setError("Error fetching address");
  //     console.log(error);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (individualDataObj.latitude && individualDataObj.longitude) {
  //     fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
  //   }
  // }, [individualDataObj.latitude, individualDataObj.longitude, fetchAddress]);
  const determineStatus = (vehicle) => {
    const currentTime = new Date();
    const lastUpdateTime = new Date(vehicle.lastUpdate); // Assuming vehicle has a lastUpdate property

    if (vehicle.ignition && vehicle.speed > 5) return "Running";
    if (vehicle.ignition && vehicle.speed <= 5) return "Ideal";
    if (!vehicle.ignition && vehicle.speed === 0) return "Stopped";
    if (!vehicle.ignition && currentTime - lastUpdateTime > 24 * 60 * 60 * 1000)
      return "Unreachable";
    return "New";
  };
  const [filteredAssets, setFilteredAssets] = useState(data);

  const filteredVehicles = filteredAssets.filter((vehicle) => {
    const status = determineStatus(vehicle);
    return assetStatusValue === "All assets" || status === assetStatusValue;
  });
  useEffect(() => {
    if (assetsValue === "All assets" || assetsValue === "") {
      setFilteredAssets(data);
    } else {
      const filteredData = data.filter((asset) => asset.name === assetsValue);
      setFilteredAssets(filteredData);
    }
  }, [assetsValue, data]);

  // Update the filteredRows to use filteredAssets
  useEffect(() => {
    setFilteredRows(
      filteredAssets.map((row) => ({ ...row, isSelected: false }))
    );
  }, [filteredAssets]);

  useEffect(() => {
    let filteredData = data;

    if (vehiclesValue && vehiclesValue !== "All vehicles") {
      filteredData = filteredData.filter(
        (asset) => asset.category === vehiclesValue
      );
    }

    setFilteredAssets(filteredData);
  }, [vehiclesValue, data]);

  const handleSelectVehicle = (event) => {
    setVehiclesValue(event.target.value);
  };
  
  const [totalResponses, setTotalResponses] = useState(0);
  const fetchData = async () => {
    console.log("Fetching data...");
    // setLoading(true); // Set loading to true when starting fetch
    try {
      const username = "hbtrack";
      const password = "123456@";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get("http://104.251.212.84/api/users", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      console.log("Fetched data:", response.data);

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        // Set the fetched data with isSelected property for each user
        setFilteredRows(
          response.data.map((row) => ({ ...row, isSelected: false }))
        );
        setTotalResponses(response.data.length);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
      alert("An error occurred while fetching data.");
    } finally {
      // setLoading(false);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);
  const [groups, setGroups] = useState([]); // Holds the fetched groups
  // const [groupsValue, setGroupsValue] = useState(''); // Holds the selected group
  // const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://104.251.212.84/api/groups", {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("hbtrack:123456@"), // Replace with actual credentials
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setGroups(data); // Assuming the API returns an array of groups
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGroups();
  }, []);
  // const [areasValue, setAreasValue] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    const fetchAreasData = async () => {
      try {
        const username = "hbtrack"; // Replace with your actual username
        const password = "123456@"; // Replace with your actual password
        const token = btoa(`${username}:${password}`); // Base64 encode the username and password

        const response = await fetch("http://104.251.212.84/api/geofences", {
          method: "GET",
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Geofence data: ", data);

        // Transform data to create dropdown options
        setAreas(data.map((item) => item.name));
      } catch (error) {
        console.error("Error fetching areas data:", error);
        setError(error.message);
      }
    };

    fetchAreasData();
  }, []);

  // const fetchDataDriver = async (startDate = "", endDate = "") => {
  //   // setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     let response;
  //     if (role == 1) {
  //       response = await axios.get(
  //         `${process.env.REACT_APP_SUPER_ADMIN_API}/read-drivers`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     } else if (role == 2) {
  //       response = await axios.get(
  //         `${process.env.REACT_APP_SCHOOL_API}/read-drivers`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     } else if (role == 3) {
  //       response = await axios.get(
  //         `${process.env.REACT_APP_BRANCH_API}/read-drivers`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     }

  //     console.log("fetch data", response.data);

  //     if (response?.data) {
  //       console.log(response.data);
  //       const allData =
  //         role == 1
  //           ? response?.data.data.flatMap((school) =>
  //               school.branches.flatMap((branch) =>
  //                 Array.isArray(branch.drivers) && branch.drivers.length > 0
  //                   ? branch.drivers
  //                   : []
  //               )
  //             )
  //           : role == 2
  //           ? response?.data.branches.flatMap((branch) => branch.drivers)
  //           : response?.data.drivers;

       
  //       console.log("drivers : ", allData);

  //       console.log("this is drivers data", allData);

  //       setDrivers(allData); // If no date range, use all data
       
  //     } else {
  //       console.error("Expected an array but got:", response.data.drivers);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
 
  const fetchDataDriver = async (startDate = "", endDate = "") => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let response;
      if (role == 1) {
        response = await axios.get(
          `${process.env.REACT_APP_SUPER_ADMIN_API}/read-drivers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 2) {
        response = await axios.get(
          `${process.env.REACT_APP_SCHOOL_API}/read-drivers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 3) {
        response = await axios.get(
          `${process.env.REACT_APP_BRANCH_API}/read-drivers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("fetch data", response.data);

      if (response?.data) {
        console.log(response.data);
        const allData =
          role == 1
            ? response?.data.data.flatMap((school) =>
                school.branches.flatMap((branch) =>
                  Array.isArray(branch.drivers) && branch.drivers.length > 0
                    ? branch.drivers
                    : []
                )
              )
            : role == 2
            ? response?.data.branches.flatMap((branch) => branch.drivers)
            : response?.data.drivers;

       
        console.log("drivers : ", allData);

        console.log("this is drivers data", allData);

        setDrivers(allData); // If no date range, use all data
       
      } else {
        console.error("Expected an array but got:", response.data.drivers);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  useEffect(() => {
    fetchDataDriver();
  }, []);
  
  

 

  

  return (
    <>
      <div style={{ marginTop: "80px" }}>
        {individualMap ? (
          <></>
        ) : (
          <>
            <hr />
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "0px",
                padding: "0 20px",
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="asset-status-label-1">Asset Status</InputLabel>
                <Select
                  labelId="asset-status-label-1"
                  id="asset-status-select-1"
                  value={assetStatusValue}
                  onChange={(e) => setAssetStatusValue(e.target.value)}
                  label="Select Asset Status"
                >
                  <MenuItem value="All assets">All assets</MenuItem>
                  <MenuItem value="Running">Running</MenuItem>
                  <MenuItem value="Parked">Parked</MenuItem>
                  <MenuItem value="less than 10km">Less than 10km</MenuItem>
                  <MenuItem value="Out of Network">Out of Network</MenuItem>
                  <MenuItem value="Device Fault">Device Fault</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="asset-status-label-2">Assets</InputLabel>
                <Select
                  labelId="assets-label-2"
                  id="assets-select-2"
                  value={assetsValue}
                  onChange={(e) => setAssetsValue(e.target.value)}
                  label="Select Assets"
                >
                  {/* Add your asset options here 
                </Select>
              </FormControl> */}
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="asset-status-label-2">Assets</InputLabel>
                <Select
                  labelId="assets-label-2"
                  id="assets-select-2"
                  value={assetsValue}
                  onChange={(e) => {
                    setAssetsValue(e.target.value);
                    handleSelectVehicle();
                  }}
                  label="Select Assets"
                >
                  <MenuItem value="All assets">All assets</MenuItem>
                  {data.map((asset) => (
                    <MenuItem key={asset.name} value={asset.name}>
                      {asset.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="users-label-3">Users</InputLabel>
                <Select
                  labelId="users-label-3"
                  id="users-select-3"
                  value={usersValue}
                  onChange={(e) => setUsersValue(e.target.value)}
                  label="Select Users"
                >
                  <MenuItem value="All users">All users</MenuItem>
                  <MenuItem value="ankur(Ankur Jain)">
                    ankur(Ankur Jain)
                  </MenuItem>
                  <MenuItem value="ashwini(Ashwini Gaikwad)">
                    ashwini(Ashwini Gaikwad)
                  </MenuItem>
                  <MenuItem value="harshal(harshal harshal)">
                    harshal(harshal harshal)
                  </MenuItem>
                  <MenuItem value="Harshal 123 (HARSHAL CREDANCE)">
                    Harshal 123 (HARSHAL CREDANCE)
                  </MenuItem>
                  <MenuItem value="josh(josh JOSH)">josh(josh JOSH)</MenuItem>
                  <MenuItem value="vts(CGS Company)">vts(CGS Company)</MenuItem>
                  <MenuItem value="vtsdemo1 (chate global services)">
                    vtsdemo1 (chate global services)
                  </MenuItem>
                  <MenuItem value="wcldemo(wcl wcl)">wcldemo(wcl wcl)</MenuItem>
                  {/* Add your user options here 
                </Select>
              </FormControl> */}
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="users-label-3">Users</InputLabel>
                <Select
                  labelId="users-label-3"
                  id="users-select-3"
                  value={usersValue}
                  onChange={(e) => setUsersValue(e.target.value)}
                  label="Select Users"
                >
                  <MenuItem value="All users">All users</MenuItem>

                  {/* Dynamically create MenuItems from filteredRows */}
                  {filteredRows.map((user) => (
                    <MenuItem key={user.id} value={user.name}>
                      {user.name} (
                      {user.fullName || user.companyName || "Unknown"})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel
                  id="groups-label-4"
                  style={{ alignItems: "center" }}
                >
                  Groups
                </InputLabel>
                <Select
                  labelId="groups-label-4"
                  id="groups-select-4"
                  value={groupsValue}
                  onChange={(e) => setGroupsValue(e.target.value)}
                  label="Select Groups"
                >
                  <MenuItem value="All Group">All Group</MenuItem>
                  <MenuItem value="Ankur asset">Ankur asset</MenuItem>
                  {/* Add your group options here 
                </Select>
              </FormControl> */}
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel
                  id="groups-label-4"
                  style={{ alignItems: "center" }}
                >
                  Groups
                </InputLabel>
                <Select
                  labelId="groups-label-4"
                  id="groups-select-4"
                  value={groupsValue}
                  onChange={(e) => setGroupsValue(e.target.value)}
                  label="Select Groups"
                >
                  <MenuItem value="All Group">All Group</MenuItem>

                  {/* Dynamically generate MenuItem components based on the fetched groups */}
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.name}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>

                {/* Error Handling */}
                {/* {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
              </FormControl>
              {/* <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="areas-label-5">Areas</InputLabel>
                <Select
                  labelId="areas-label-5"
                  id="areas-select-5"
                  value={areasValue}
                  onChange={(e) => setAreasValue(e.target.value)}
                  label="Select Areas"
                >
                  <MenuItem value="All Areas">All Areas</MenuItem>
                  <MenuItem value="amanora">amanora</MenuItem>
                  <MenuItem value="Ram Nager">Ram Nager</MenuItem>
                  {/* Add your area options here 
                </Select>
              </FormControl> */}
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="areas-label-5">Areas</InputLabel>
                <Select
                  labelId="areas-label-5"
                  id="areas-select-5"
                  value={areasValue}
                  onChange={(e) => setAreasValue(e.target.value)}
                  label="Select Areas"
                >
                  <MenuItem value="All Areas">All Areas</MenuItem>

                  {/* Dynamically generate MenuItem components based on the fetched areas */}
                  {areas.map((area, index) => (
                    <MenuItem key={index} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>

                {/* Error Handling */}
                {/* {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="landmarks-label-6">Landmarks</InputLabel>
                <Select
                  labelId="landmarks-label-6"
                  id="landmarks-select-6"
                  value={landmarksValue}
                  onChange={(e) => setLandmarksValue(e.target.value)}
                  label="Select Landmarks"
                >
                  <MenuItem value="All Landmarks">All Landmarks</MenuItem>
                  <MenuItem value="API Corner">API Corner</MenuItem>
                  <MenuItem value="LOADING POINT">LOADING POINT</MenuItem>
                  <MenuItem value="Shivneri Lawns">Shivneri Lawns</MenuItem>
                  <MenuItem value="UNLOADING POINT">UNLOADING POINT</MenuItem>
                  <MenuItem value="weighing bridge">weighing bridge</MenuItem>
                  <MenuItem value="yashwant nagar">yashwant nagar</MenuItem>
                  {/* Add your landmark options here */}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  width: 250,
                  "& .MuiInputBase-root": { height: 40 },
                  marginBottom: 2,
                }}
              >
                <InputLabel id="vehicles-label-6">Select Vehicles</InputLabel>
                <Select
                  labelId="vehicles-label-6"
                  id="vehicles-select-6"
                  value={vehiclesValue}
                  onChange={(e) => setVehiclesValue(e.target.value)} // Uncomment to handle changes
                  label="Select Asset Status"
                >
                  {/* You can add 'All Vehicles' as the default option */}
                  <MenuItem value="All assets">All Vehicles</MenuItem>

                  {/* New vehicle types you provided */}
                  <MenuItem value="Default">Default</MenuItem>
                  <MenuItem value="Animal">Animal</MenuItem>
                  <MenuItem value="Bicycle">Bicycle</MenuItem>
                  <MenuItem value="Boat">Boat</MenuItem>
                  <MenuItem value="Bus">Bus</MenuItem>
                  <MenuItem value="Camper">Camper</MenuItem>
                  <MenuItem value="Crane">Crane</MenuItem>
                  <MenuItem value="Helicopter">Helicopter</MenuItem>
                  <MenuItem value="Motorcycle">Motorcycle</MenuItem>
                  <MenuItem value="Offroad">Offroad</MenuItem>
                  <MenuItem value="Person">Person</MenuItem>
                  <MenuItem value="Pickup">Pickup</MenuItem>
                  <MenuItem value="Plane">Plane</MenuItem>
                  <MenuItem value="Ship">Ship</MenuItem>
                  <MenuItem value="Tractor">Tractor</MenuItem>
                  <MenuItem value="Train">Train</MenuItem>
                  <MenuItem value="Tram">Tram</MenuItem>
                  <MenuItem value="Trolleybus">Trolleybus</MenuItem>
                  <MenuItem value="Truck">Truck</MenuItem>
                  <MenuItem value="Van">Van</MenuItem>
                  <MenuItem value="Scooter">Scooter</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* <br />
        <div style={{ display: "flex", justifyContent: "right" }}>
          
        </div> */}
          </>
        )}

        {/* GoogleMaps */}
        {individualMap ? (
          <IndividualGooglemap
            latitude={latitude}
            longitude={longitude}
            setIndividualMap={setIndividualMap}
            style={{ width: "100%" }}
            data={data}
            individualDataObj={individualDataObj}
          />
        ) : (
          <div
            className="gogo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <GoogleMapComponent
              latitude={latitude}
              longitude={longitude}
              data={data}
            />
          </div>
        )}

        {/* <br /> */}
      </div>

      {individualMap ? (
        <></>
      ) : (
        <>
          <Cards
            vehicleRunningCount={vehicleRunningCount}
            vehicleStoppedCount={vehicleStoppedCount}
            vehicleOverspeedCount={vehicleOverspeedCount}
            vehicleIdleCount={vehicleIdleCount}
            vehicleUnreachableCount={vehicleUnreachableCount}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <hr
              style={{
                margin: "0px",
                width: "88%",
                borderBottom: "1px solid black",
              }}
            />
          </div>
          {/* Horizontal line added here */}
        </>
      )}

      <br />

      {individualMap ? <></> : <hr />}
      <div>
        {individualMap ? (
          <></>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              marginLeft: "3.5rem",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={filterText}
              onChange={handleFilterChange}
              sx={{
                marginRight: "10px",
                marginLeft: "1053px",
                width: "200px",
                "& .MuiInputBase-root": { height: 40 },
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginRight: "5px",
                    }}
                  />
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                color: "black",
                backgroundColor: "#f4d24a",
                "&:hover": {
                  backgroundColor: "#f8ebb5",
                },
              }}
            >
              Manage Columns
            </Button>
          </div>
        )}

        {individualMap ? <></> : <hr />}

        {/* GoogleMaps */}
        {individualMap ? (
          <></>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="paper">
              <CTable
                className="my-3 border vehiclesTable mt-0"
                hover
                responsive
              >
                <CTableHead
                  className="text-nowrap "
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <CTableRow>
                    <CTableHeaderCell
                      className="text-center sr-no table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Sr No.
                    </CTableHeaderCell>
                    <CTableHeaderCell
                          className="text-center vehicle table-cell headCell"
                          style={{ position: 'sticky', top: 0 }}
                        >
                          Vehicle
                        </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center device-name table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Device Name
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center address table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                        width: "25%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Address
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="text-center address table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                        width: "25%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Driver
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center last-update table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                        width: "25%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Last Update
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center current-delay table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      &nbsp;&nbsp; C/D &nbsp;&nbsp;
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center speed table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Sp
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center distance table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Distance
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center total-distance table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      T/D
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center satellite table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Sat
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center ignition table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Ig
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center gps table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      GPS
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center power table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      Power
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="text-center status table-cell headCell"
                      style={{
                        position: "sticky",
                        top: 0,
                        width: "15%",
                      }}
                    >
                      Track
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {currentRows.map((item, index) => (
                    <CTableRow
                      key={index}
                      className={`table-row collapsed trans`}
                    >
                      {/* Sr No. */}
                      <CTableDataCell className="text-center sr-no table-cell">
                        {index + 1}
                      </CTableDataCell>

                      <CTableDataCell className="text-center vehicle table-cell">
                            <div>
                              
                                  <img
                                    src={busY}
                                    className="dashimg upperdata"
                                    alt="vehicle"
                                  />
                               
                            </div>
                            
                          </CTableDataCell>

                      <CTableDataCell className="device-name table-cell n text-center">
                        {(() => {
                          // const device = salesman.find((device) => device.id === item.deviceId)
                          if (item && item.name) {
                            const nameParts = item.name.split(" ");
                            const firstWord = nameParts[0];
                            const remainingWords = nameParts.slice(1).join(" "); // Join remaining words

                            return (
                              <>
                                <div className="upperdata">
                                  <div>{firstWord}</div>{" "}
                                  {/* First word on the first line */}
                                  {remainingWords && (
                                    <div>{remainingWords}</div>
                                  )}{" "}
                                  {/* Remaining words on the second line if present */}
                                </div>
                              </>
                            );
                          }
                          return <div className="upperdata">Unknown</div>;
                        })()}
                      </CTableDataCell>

                      <CTableDataCell
                        className="text-center address table-cell"
                        style={{ width: "20rem" }}
                      >
                        <div className="upperdata" style={{ fontSize: "1rem" }}>
                          shiv kailasa, mihan, khapri, nagpur, maharshtra 111111
                        </div>
                      </CTableDataCell>

                      <CTableDataCell
                        className="text-center address table-cell"
                        style={{ width: "20rem" }}
                      >
                        <div className="upperdata" style={{ fontSize: "1rem" }}>
                          {(() => {
                            const driver = drivers.find(
                              (driver) => driver.deviceId === item.deviceId
                            );
                            return driver ? driver.driverName : "N/A";
                          })()}
                        </div>
                      </CTableDataCell>
                      {/* {visibleColumns.lastUpdate && ( */}
                      <CTableDataCell className="text-center last-update table-cell">
                        {(() => {
                          // const device = salesman.find((device) => device.id === item.deviceId)
                          if (item && item.lastUpdate) {
                            const date = dayjs(item.lastUpdate).format(
                              "YYYY-MM-DD"
                            ); // Format date
                            const time = dayjs(item.lastUpdate).format(
                              "HH:mm:ss"
                            ); // Format time
                            return (
                              <div className="upperdata ld">
                                <div>{date}</div> {/* Date on one line */}
                                <div>{time}</div> {/* Time on the next line */}
                              </div>
                            );
                          }
                          return <div>N/A</div>;
                        })()}
                      </CTableDataCell>
                      {/* )} */}
                      {/* {visibleColumns.cd && ( */}
                      <CTableDataCell className="text-center cd current-delay table-cell">
                        {(() => {
                          // const device = salesman.find((device) => device.id === item.deviceId)
                          if (item && item.lastUpdate) {
                            const now = dayjs();
                            const lastUpdate = dayjs(item.lastUpdate);
                            const duration = dayjs.duration(
                              now.diff(lastUpdate)
                            );

                            const days = duration.days();
                            const hours = duration.hours();
                            const minutes = duration.minutes();
                            const seconds = duration.seconds();

                            // Conditional formatting based on duration values
                            if (days > 0) {
                              return `${days}d ${hours}h ${minutes}m`;
                            } else if (hours > 0) {
                              return `${hours}h ${minutes}m`;
                            } else if (minutes > 0) {
                              return `${minutes}m`;
                            } else {
                              return `${seconds}s`; // Display seconds if all else is zero
                            }
                          }
                          return "0s"; // Default if no device or lastUpdate
                        })()}
                      </CTableDataCell>

                      {/* {visibleColumns.sp && ( */}
                      <CTableDataCell className="text-center sp speed table-cell">
                        <div className="upperdata">{`${Math.round(
                          item.speed
                        )} kmph`}</div>
                      </CTableDataCell>
                      {/* )} */}
                      {/* {visibleColumns.distance && ( */}
                      <CTableDataCell className="text-center d distance table-cell">
                        {`${Math.round(item.attributes.distance)} km`}
                      </CTableDataCell>

                      {/* {visibleColumns.td && ( */}
                      <CTableDataCell className="text-center td total-distance table-cell">
                        {`${Math.round(item.attributes.totalDistance)} km`}
                      </CTableDataCell>

                      {/* {visibleColumns.sat && ( */}
                      <CTableDataCell className="text-center satelite table-cell">
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <MdGpsNotFixed style={{ fontSize: "1.6rem" }} />{" "}
                          {/* Adjust icon size as needed */}
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "49%",
                              transform: "translate(-50%, -50%)",
                              fontSize: "0.8rem", // Adjust text size
                              color: "black",
                              fontWeight: "bold",
                            }}
                          >
                            {item.attributes.sat}
                          </span>
                        </div>
                      </CTableDataCell>
                      {/* // )} */}
                      <CTableDataCell className="text-center ignition table-cell">
                        {(() => {
                          const { ignition } = item.attributes;

                          let iconColor = "gray"; // Default color
                          let iconText = "N/A"; // Default text

                          if (ignition) {
                            iconColor = "green";
                            iconText = "On";
                          } else if (ignition === false) {
                            iconColor = "red";
                            iconText = "Off";
                          }

                          return (
                            <div
                              style={{ color: iconColor, fontSize: "1.1rem" }}
                            >
                              <PiEngineFill />
                            </div>
                          );
                        })()}
                      </CTableDataCell>
                      {/* {visibleColumns.gps && ( */}
                      <CTableDataCell className="text-center gps table-cell">
                        {(() => {
                          const { valid } = item;

                          let iconColor = "gray"; // Default color
                          let iconText = "N/A"; // Default text

                          if (valid) {
                            iconColor = "green";
                            iconText = "On";
                          } else if (valid === false) {
                            iconColor = "red";
                            iconText = "Off";
                          }

                          return (
                            <div
                              style={{ color: iconColor, fontSize: "1.1rem" }}
                            >
                              <MdGpsFixed />
                            </div>
                          );
                        })()}
                      </CTableDataCell>
                      {/* )} */}
                      {/* {visibleColumns.power && ( */}
                      <CTableDataCell className="text-center power table-cell">
                        {(() => {
                          const power = item.attributes.battery;

                          let iconColor = "gray"; // Default color
                          let iconText = "N/A"; // Default text

                          if (power) {
                            iconColor = "green";
                            iconText = "On";
                          } else if (power === false) {
                            iconColor = "red";
                            iconText = "Off";
                          }

                          return (
                            <div
                              style={{ color: iconColor, fontSize: "1.2rem" }}
                            >
                              <IoMdBatteryCharging />
                            </div>
                          );
                        })()}
                      </CTableDataCell>
                      {/* )} */}
                      <CTableDataCell className="text-center status table-cell">
                        <button
                          className="btn btn-primary"
                          // onClick={() => handleClickOnTrack(item)}
                        >
                          Live Track
                        </button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              <CRow className="justify-content-between align-items-center mt-3">
                <CCol xs="auto">
                  <CFormSelect
                    id="rows-per-page"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}
                    aria-label="Rows per page"
                    className="me-2"
                    style={{ width: "auto" }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </CFormSelect>
                </CCol>

                <CCol xs="auto">
                  <ReactPaginate
                    previousLabel={<MdKeyboardArrowLeft />}
                    nextLabel={<MdKeyboardArrowRight />}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination d-flex align-items-center"}
                    activeClassName={"active"}
                    previousLinkClassName={"previous"}
                    nextLinkClassName={"next"}
                    pageLinkClassName={"page"}
                    breakLinkClassName={"break"}
                  />
                </CCol>
              </CRow>
            </div>
          </div>
        )}

        {individualMap ? (
          <></>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<ImportExportIcon />}
            onClick={handleExport}
            sx={{
              marginRight: "10px",
              color: "black",
              backgroundColor: "#f4d24a",
              "&:hover": {
                backgroundColor: "#1a242f",
              },
            }}
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Export
          </Button>
        )}

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Manage Columns</h2>
            {columns.map((column) => (
              <div
                key={column.accessor}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{column.Header}</span>
                <Switch
                  checked={columnVisibility[column.accessor]}
                  onChange={() => handleColumnVisibilityChange(column.accessor)}
                />
              </div>
            ))}
          </Box>
        </Modal>
        <Modal
          open={assetDetailsModalOpen}
          onClose={() => setAssetDetailsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper>
                  <h3>Asset Details</h3>
                  <br />
                  <p>Asset Name</p>
                  <p>Device Id</p>
                  <p>Device Description</p>
                  <p>Device Status</p>
                  <p>SIM Number or SAT</p>
                  <p>Driver Name</p>
                  <p>Driver Mobile No</p>
                  <p>Battery Size</p>
                  <p>KM Reading</p>
                  <p>Max Speed Limit</p>
                  <p>Provider 3G or SAT</p>
                  <p>Engine Runtime</p>
                  <p>Sensor Type</p>
                  <p>Message Cause</p>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Current Location</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Distance Travel(Today)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Max Speed</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Distance Graph(Last 7 Days)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Speed Graph(Last 3 hours)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Landmark Report(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Distance Location(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>All Points(Last 20 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Stop Report(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Area In/Out Report(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        {/* 
        <Modal
          open={locationModalOpen}
          onClose={() => setLocationModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           
    <Box sx={style}>
    <div style={{ height: '500px', width: '100%' }}>
      <iframe
        src={`https://maps.google.com/maps?q=${latitude[1]},${longitude[1]}&z=${zoom}&output=embed`}
        style={{ border: 0, height: '100%', width: '100%' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="google map"
      ></iframe>
    </div>
          </Box>
    
        </Modal> */}
      </div>
    </>
  );
};
