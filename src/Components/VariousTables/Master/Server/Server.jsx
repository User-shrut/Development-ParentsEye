




// //new updated code 
// import React, { useState, useEffect, useContext, Component } from "react";
// import axios from "axios";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Switch from "@mui/material/Switch";
// import { COLUMNS } from "./columns";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import ImportExportIcon from "@mui/icons-material/ImportExport";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import * as XLSX from "xlsx";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import { TotalResponsesContext } from "../../../../TotalResponsesContext";
// import CircularProgress from "@mui/material/CircularProgress";
// import CloseIcon from "@mui/icons-material/Close";
// import { IconButton } from "@mui/material";
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// //import { TextField } from '@mui/material';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// // import { Select, MenuItem, TextField } from '@mui/material';

// // import {Box, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   height: "80%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   overflowY: "auto", // Enable vertical scrolling
//   display: "flex",
//   flexDirection: "column",
//   padding: "1rem",
// };

// export const Server = () => {
//   const { setTotalResponses } = useContext(TotalResponsesContext); // Get the context value

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterText, setFilterText] = useState("");
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: "ascending",
//   });
//   const [columnVisibility, setColumnVisibility] = useState(
//     Object.fromEntries(COLUMNS().map((col) => [col.accessor, true]))
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [importModalOpen, setImportModalOpen] = useState(false);
//   const [importData, setImportData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [originalRows, setOriginalRows] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");



//   const fetchData = async () => {
//     console.log('Fetching data...');
//     setLoading(true); // Set loading to true when starting fetch
//     try {
//       const username = "school";
//       const password = "123456";
//       const token = btoa(`${username}:${password}`);

//       const response = await axios.get("https://rocketsalestracker.com/api/server", {
//         headers: {
//           Authorization: `Basic ${token}`,
//         },
//       });

//       console.log('fetch data', response.data);

//       if (response.data && typeof response.data === 'object') {
//         const wrappedData = [response.data];
//         setFilteredRows(wrappedData.map(row => ({ ...row, isSelected: false })));
//         setTotalResponses(wrappedData.length);
//       } else {
//         console.error('Expected an object but got:', response.data);
//       }
//     } catch (error) {
//       console.error('Fetch data error:', error);
//       alert('An error occurred while fetching data.');
//     } finally {
//       setLoading(false);
//     }
//   };



//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterData(filterText);
//   }, [filterText]);



//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleFilterChange = (event) => {
//     const text = event.target.value;
//     setFilterText(text);
//   };


//   const filterData = (text) => {
//     // Apply text-based filtering
//     if (text === "") {
//       // If no text is provided, reset to original rows
//       setFilteredRows(originalRows.map(row => ({ ...row, isSelected: false })));
//     } else {
//       // Filter based on text
//       const filteredData = originalRows
//         .filter((row) =>
//           Object.values(row).some(
//             (val) =>
//               typeof val === "string" &&
//               val.toLowerCase().includes(text.toLowerCase())
//           )
//         )
//         .map((row) => ({ ...row, isSelected: false }));

//       setFilteredRows(filteredData);
//     }
//   };

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleColumnVisibilityChange = (accessor) => {
//     setColumnVisibility((prevState) => ({
//       ...prevState,
//       [accessor]: !prevState[accessor],
//     }));
//   };

//   const handleRowSelect = (index) => {
//     const newFilteredRows = [...filteredRows];
//     newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
//     setFilteredRows(newFilteredRows);
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     const newFilteredRows = filteredRows.map((row) => ({
//       ...row,
//       isSelected: newSelectAll,
//     }));
//     setFilteredRows(newFilteredRows);
//     setSelectAll(newSelectAll);
//   };

//   const handleEditButtonClick = () => {
//     const selected = filteredRows.find((row) => row.isSelected);
//     if (selected) {
//       setSelectedRow(selected);
//       setFormData(selected);
//       setEditModalOpen(true);
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteSelected = async () => {
//     // Log filteredRows to check its structure
//     console.log("Filtered rows:", filteredRows);

//     // Get selected row IDs
//     const selectedIds = filteredRows
//       .filter((row) => row.isSelected)
//       .map((row) => {
//         // Log each row to check its structure
//         console.log("Processing row:", row);
//         return row._id; // Ensure id exists and is not undefined
//       });

//     console.log("Selected IDs:", selectedIds);

//     if (selectedIds.length === 0) {
//       alert("No rows selected for deletion.");
//       return;
//     }
//     const userConfirmed = window.confirm(
//       `Are you sure you want to delete ${selectedIds.length} record(s)?`
//     );

//     if (!userConfirmed) {
//       // If the user clicks "Cancel", exit the function
//       return;
//     }
//     try {
//       // Define the API endpoint and token
//       const apiUrl =
//         "https://schoolmanagement-4-pzsf.onrender.com/school/delete";
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0"; // Replace with actual token

//       // Send delete requests for each selected ID
//       const deleteRequests = selectedIds.map((id) =>
//         fetch(`${apiUrl}/${id}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }).then((response) => {
//           if (!response.ok) {
//             throw new Error(
//               `Error deleting record with ID ${id}: ${response.statusText}`
//             );
//           }
//           return response.json();
//         })
//       );

//       // Wait for all delete requests to complete
//       await Promise.all(deleteRequests);

//       // Filter out deleted rows
//       const newFilteredRows = filteredRows.filter((row) => !row.isSelected);

//       // Update state
//       setFilteredRows(newFilteredRows);
//       setSelectAll(false);

//       alert("Selected records deleted successfully.");
//     } catch (error) {
//       console.error("Error during deletion:", error);
//       alert("Failed to delete selected records.");
//     }
//     fetchData();
//   };

//   const handleExport = () => {
//     const dataToExport = filteredRows.map((row) => {
//       const { isSelected, ...rowData } = row;
//       return rowData;
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, "Server.xlsx");
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetNames = workbook.SheetNames;
//         const sheet = workbook.Sheets[sheetNames[0]];
//         const parsedData = XLSX.utils.sheet_to_json(sheet);
//         setImportData(parsedData);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const sortedData = [...filteredRows];
//   if (sortConfig.key !== null) {
//     sortedData.sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === "ascending" ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === "ascending" ? 1 : -1;
//       }
//       return 0;
//     });
//   }

//   const handleAddButtonClick = () => {
//     setFormData({});
//     setAddModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setEditModalOpen(false);
//     setAddModalOpen(false);
//     setFormData({});
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value,
//   //   });
//   // };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
  
//     // Split name to handle nested keys like 'attributes.speedUnit'
//     const keys = name.split('.');
  
//     setFormData((prevFormData) => {
//       let updatedFormData = { ...prevFormData };
  
//       // Handle nested keys by reducing them into the object
//       keys.reduce((acc, key, index) => {
//         if (index === keys.length - 1) {
//           acc[key] = value; // Set the final key to the new value
//         } else {
//           acc[key] = acc[key] || {}; // Ensure intermediate objects are present
//         }
//         return acc[key];
//       }, updatedFormData);
  
//       return updatedFormData;
//     });
//   };
  

//   // ALL ATTRIBUTES

//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [savedValue, setSavedValue] = useState('');

//   const handleAddClick = () => {
//     setIsInputVisible(true);
//   };

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSaveButtonClick = () => {
//     setSavedValue(inputValue);
//     setIsInputVisible(false);
//   };


  

//   const handleEditSubmit = async () => {
//     const apiUrl = `https://rocketsalestracker.com/api/server`;
//     const username = "school";
//     const password = "123456";
//     const token = btoa(`${username}:${password}`);

//     // Ensure attributes are correctly merged and updated
//     const updatedAttributes = {
//         ...formData.attributes, // Keep existing attributes
//         // speedUnit: "kn", // Update or add specific attributes here
//     };

//     const updatedData = {
//         ...formData,
//         isSelected: false,
//         attributes: updatedAttributes,
//     };

//     try {
//         console.log("Sending request to:", apiUrl);
//         console.log("Request payload:", JSON.stringify(updatedData, null, 2));

//         const response = await fetch(apiUrl, {
//             method: "PUT",
//             headers: {
//                 "Authorization": `Basic ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedData),
//         });

//         console.log("Response status:", response.status);
//         console.log("Response headers:", response.headers);

//         if (!response.ok) {
//             const errorResult = await response.json();
//             console.error("Error response:", errorResult);
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResult.message}`);
//         }

//         const result = await response.json();
//         console.log("Update successful:", result);
//         alert("Updated successfully");

//         // Update filteredRows in state
//         const updatedRows = filteredRows.map((row) =>
//             row.id === selectedRow.id
//                 ? { ...row, ...updatedData, isSelected: false }
//                 : row
//         );
//         setFilteredRows(updatedRows);

//         handleModalClose();
//         fetchData(); // Refetch data to ensure the UI is up-to-date
//     } catch (error) {
//         console.error("Error updating row:", error.message, error.stack);
//         alert("Error updating data");
//     }
// };







  



//   const handleAddSubmit = async () => {
//     try {
//       // Define the API endpoint and credentials
//       const apiUrl = "https://rocketsalestracker.com/api/devices"; // Replace with actual API endpoint
//       const username = "school"; // Replace with your actual username
//       const password = "123456"; // Replace with your actual password
//       const token = btoa(`${username}:${password}`); // Encode credentials in Base64
  
//       // Prepare the new row object based on the expected schema
//       const newRow = {
      
       
//         attributes: {
//           speedUnit: formData.attributes?.speedUnit || '',
//           custommap: formData.attributes?.custommap || '',
//           customoverlay: formData.attributes?.customoverlay || '',
//           defaultmap: formData.attributes?.defaultmap || '',
//           coordinates: formData.attributes?.coordinates || '',
//           speed: formData.attributes?.speed || '',
//           distance: formData.attributes?.distance || '',
//           altitude: formData.attributes?.altitude || '',
//           volume: formData.attributes?.volume || '',
//           time: formData.attributes?.time || '',
//           poi: formData.attributes?.poi || '',
//           announce: formData.attributes?.announce || '',
//           loc: formData.attributes?.loc || '',
//           per: formData.attributes?.per || '',
//           attri: formData.attributes?.attri || '',
//           file: formData.attributes?.file || '',
//           logo: formData.attributes?.logo || '',
//           colorPrimary: formData.attributes?.colorPrimary || '',
//           locationIqKey: formData.attributes?.locationIqKey || '',
//           mapOnSelect: formData.attributes?.mapOnSelect || false,
//         },
//         calendarId: formData.calendarId || '', // Ensure formData has 'calendarId'
//         status: formData.status || '', // Ensure formData has 'status'
//         phone: formData.phone || '', // Ensure formData has 'phone'
//         model: formData.model || '', // Ensure formData has 'model'
//         expirationTime: formData.expirationTime || '', // Ensure formData has 'expirationTime'
//         contact: formData.contact || '', // Ensure formData has 'contact'
//         category: formData.category || '', // Ensure formData has 'category'
//         registration: formData.registration || false,
//         readonly: formData.readonly || false,
//         deviceReadonly: formData.deviceReadonly || false,
//         map: formData.map || '',
//         latitude: formData.latitude || 0,
//         longitude: formData.longitude || 0,
//         zoom: formData.zoom || 0,
//         twelveHourFormat: formData.twelveHourFormat || false,
//         forceSettings: formData.forceSettings || false,
//         coordinateFormat: formData.coordinateFormat || '',
//         limitCommands: formData.limitCommands || false,
//         disableReports: formData.disableReports || false,
//         fixedEmail: formData.fixedEmail || false,
//         poiLayer: formData.poiLayer || '',
//         announcement: formData.announcement || '',
//         emailEnabled: formData.emailEnabled || false,
//         geocoderEnabled: formData.geocoderEnabled || false,
//         textEnabled: formData.textEnabled || false,
//         storageSpace: formData.storageSpace || [],
//         newServer: formData.newServer || false,
//         openIdEnabled: formData.openIdEnabled || false,
//         openIdForce: formData.openIdForce || false,
//         version: formData.version || '',
//       };
  
  
//       // POST request to the server with Basic Auth
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Authorization": `Basic ${token}`, // Add Basic Auth header
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newRow),
//       });
  
//       // Parse the JSON response
//       const result = await response.json();
  
//       if (response.ok) {
//         // Update the state with the new row
//         setFilteredRows([...filteredRows, result]);
  
//         // Close the modal and refresh data
//         handleModalClose();
//         fetchData();
  
//         console.log("Record created successfully:", result);
//         alert("Record created successfully");
//       } else {
//         // Log and alert the specific server response in case of an error
//         console.error("Server responded with:", result);
//         alert(`Unable to create record: ${result.message || response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error during POST request:", error);
//       alert("Unable to create record");
//       // Handle the error appropriately (e.g., show a notification to the user)
//     }
//   };
 
//   const [permissions, setPermissions] = useState({
//     registration: false,
//     readonly: false,
//     deviceReadonly: false,
//     limitCommands: false,
//     disableReports: false,
//     noEmailChange: false,
//   });
  
//   // Function to handle checkbox toggle
//   const handlePermissionButtonClick = (feature) => {
//     setPermissions(prevPermissions => ({
//       ...prevPermissions,
//       [feature]: !prevPermissions[feature],
//     }));
//   };

 

//   const [timezones, setTimezones] = useState([]);
 
//   useEffect(() => {
//     // Fetch timezones from the API with basic authentication
//     const fetchTimezones = async () => {
//       try {
//         const response = await axios.get('https://rocketsalestracker.com/api/server/timezones', {
//           auth: {
//             username: 'school',
//             password: '123456'
//           }
//         });
//         setTimezones(response.data); // Assuming response.data is an array of timezones
//       } catch (error) {
//         console.error('Error fetching timezones:', error);
//       }
//     };

//     fetchTimezones();
//   }, []);
//   const [checkboxState, setCheckboxState] = useState({
//     showMapOnSelection: false,
//     showGeofences: false,
//     darkMode: false,
//   });

//   // Handler to update the checkbox state
//   const handleCheckboxChange = (event) => {
//     setCheckboxState(prevState => ({
//       ...prevState,
//       [event.target.name]: event.target.checked,
//     }));
//   };
//   const [locationOpen, setLocationOpen] = useState(false);
//   const [permissionOpen, setPermissionOpen] = useState(false);

//   const [attributesOpen, setAttributesOpen] = useState(false); // Toggle state

// const handleAttributesToggle = () => {
//   setAttributesOpen(!attributesOpen);
// };
// const [selectedFile, setSelectedFile] = useState(null);

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setSelectedFile(file);
//     // Optionally, handle file upload or preview here
//   }
// };
// const [newAttribute, setNewAttribute] = useState({
//   key: '',
//   type: 'string',
// });



// const handleAddButtonClick12 = () => {
//   setShowAddForm(true);
// };

// const handleNewAttributeChange = (e) => {
//   const { name, value } = e.target;
//   setNewAttribute((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

// const handleAddAttributeSubmit = () => {
//   setFormData((prev) => ({
//     ...prev,
//     [`attributes.${newAttribute.key}`]: newAttribute.type === 'boolean' ? false : '',
//   }));
//   setShowAddForm(false);
// };

// const [showAddForm, setShowAddForm] = useState(false);
//   return (
//     <>
//       <h1 style={{ textAlign: "center", marginTop: "80px" }}>
//         Server
//       </h1>
//       <div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "10px",
//           }}
//         >
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={filterText}
//             onChange={handleFilterChange}
//             sx={{ marginRight: "10px", width: "300px" }}
//             InputProps={{
//               startAdornment: (
//                 <SearchIcon
//                   style={{
//                     cursor: "pointer",
//                     marginLeft: "10px",
//                     marginRight: "5px",
//                   }}
//                 />
//               ),
//             }}
//           />
//           <Button
//             onClick={() => setModalOpen(true)}
//             sx={{
//               backgroundColor: "rgb(85, 85, 85)",
//               color: "white",
//               fontWeight: "bold",
//               marginRight: "10px",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <ImportExportIcon />
//             Column Visibility
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteSelected}
//             sx={{ marginRight: "10px" }}
//             startIcon={<DeleteIcon />}
//           >
//             Delete
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleEditButtonClick}
//             sx={{ marginRight: "10px" }}
//             startIcon={<EditIcon />}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleAddButtonClick}
//             sx={{ marginRight: "10px" }}
//             startIcon={<AddCircleIcon />}
//           >
//             Add
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => setImportModalOpen(true)}
//             sx={{ backgroundColor: "rgb(255, 165, 0)", marginRight: "10px" }}
//             startIcon={<CloudUploadIcon />}
//           >
//             Import
//           </Button>
//           <Button variant="contained" color="primary" onClick={handleExport}>
//             Export
//           </Button>
//         </div>
       

//         {loading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "20px",
//             }}
//           >
//             <CircularProgress />
//           </div>
//         ) : (
//           <>
//             <TableContainer
//               component={Paper}
//               sx={{
//                 maxHeight: 440,
//                 border: "1.5px solid black",
//                 borderRadius: "7px",
//               }}
//             >
            
//               <Table
//                 stickyHeader
//                 aria-label="sticky table"
//                 style={{ border: "1px solid black" }}
//               >
//                 <TableHead>
//                   <TableRow
//                     style={{
//                       borderBottom: "1px solid black",
//                       borderTop: "1px solid black",
//                     }}
//                   >
//                     <TableCell
//                       padding="checkbox"
//                       style={{
//                         borderRight: "1px solid #e0e0e0",
//                         borderBottom: "2px solid black",
//                       }}
//                     >
//                       <Switch
//                         checked={selectAll}
//                         onChange={handleSelectAll}
//                         color="primary"
//                       />
//                     </TableCell>
//                     {COLUMNS()
//                       .filter((col) => columnVisibility[col.accessor])
//                       .map((column) => (
//                         <TableCell
//                           key={column.accessor}
//                           align={column.align}
//                           style={{
//                             minWidth: column.minWidth,
//                             cursor: "pointer",
//                             borderRight: "1px solid #e0e0e0",
//                             borderBottom: "2px solid black",
//                             padding: "4px 4px",
//                             textAlign: "center",
//                             fontWeight: "bold",
//                           }}
//                           onClick={() => requestSort(column.accessor)}
//                         >
//                           {column.Header}
//                           {sortConfig.key === column.accessor ? (
//                             sortConfig.direction === "ascending" ? (
//                               <ArrowUpwardIcon fontSize="small" />
//                             ) : (
//                               <ArrowDownwardIcon fontSize="small" />
//                             )
//                           ) : null}
//                         </TableCell>
//                       ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {sortedData.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={COLUMNS().filter((col) => columnVisibility[col.accessor]).length}
//                         style={{
//                           textAlign: 'center',
//                           padding: '16px',
//                           fontSize: '16px',
//                           color: '#757575',
//                         }}
//                       >
//                         <h4>No Data Available</h4>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     sortedData
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((row, index) => (
//                         <TableRow
//                           hover
//                           role="checkbox"
//                           tabIndex={-1}
//                           key={row.id}
//                           onClick={() =>
//                             handleRowSelect(page * rowsPerPage + index)
//                           }
//                           selected={row.isSelected}
//                           style={{
//                             backgroundColor:
//                               index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
//                             borderBottom: "none",
//                           }}
//                         >
//                           <TableCell
//                             padding="checkbox"
//                             style={{ borderRight: "1px solid #e0e0e0" }}
//                           >
//                             <Switch checked={row.isSelected} color="primary" />
//                           </TableCell>
//                           {COLUMNS()
//                             .filter((col) => columnVisibility[col.accessor])
//                             .map((column) => {
//                               // Debug output
//                               // console.log(`Row data: ${JSON.stringify(row)}, Column accessor: ${column.accessor}`);

//                               // Access the correct value from the row
//                               const value = column.accessor.split('.').reduce((acc, part) => acc && acc[part], row);

//                               return (
//                                 <TableCell
//                                   key={column.accessor}
//                                   align={column.align}
//                                   style={{
//                                     borderRight: "1px solid #e0e0e0",
//                                     paddingTop: "4px",
//                                     paddingBottom: "4px",
//                                     borderBottom: "none",
//                                     backgroundColor:
//                                       index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
//                                     fontSize: "smaller",
//                                   }}
//                                 >
//                                   {column.Cell ? column.Cell({ value }) : value}
//                                 </TableCell>
//                               );
//                             })}
//                         </TableRow>
//                       ))
//                   )}
//                 </TableBody>
//               </Table>

//             </TableContainer>
//             <TablePagination
//               rowsPerPageOptions={[10, 25, 100]}
//               component="div"
//               count={sortedData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//             {/* //</></div> */}
//           </>
//         )}
//         <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//           <Box sx={style}>
//             <h2>Column Visibility</h2>
//             {COLUMNS().map((col) => (
//               <div key={col.accessor}>
//                 <Switch
//                   checked={columnVisibility[col.accessor]}
//                   onChange={() => handleColumnVisibilityChange(col.accessor)}
//                   color="primary"
//                 />
//                 {col.Header}
//               </div>
//             ))}
//           </Box>
//         </Modal>
//         {/* <Modal open={editModalOpen} onClose={handleModalClose}>
//           <Box sx={style}>
//             {/* <h2>Edit Row</h2> 
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: "20px",
//               }}
//             >
//               <h2 style={{ flexGrow: 1 }}>Edit Row</h2>
//               <IconButton onClick={handleModalClose}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             {COLUMNS()
//               .slice(0, -1)
//               .map((col) => (
//                 <TextField
//                   key={col.accessor}
//                   label={col.Header}
//                   variant="outlined"
//                   name={col.accessor}
//                   value={formData[col.accessor] || ""}
//                   onChange={handleInputChange}
//                   sx={{ marginBottom: "10px" }}
//                   fullWidth
//                 />
//               ))}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleEditSubmit}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Modal> */}
// <Modal open={editModalOpen} onClose={handleModalClose}>
//   <Box sx={style}>
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         marginBottom: "20px",
//       }}
//     >
//       <h2 style={{ flexGrow: 1 }}>Edit Row</h2>
//       <IconButton onClick={handleModalClose}>
//         <CloseIcon />
//       </IconButton>
//     </Box>

//     {COLUMNS()
//       .slice(0, -29)
//       .map((col) => (
//         col.accessor === 'map' && col.Header === 'Default Map' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="maps-select-label">Default Map</InputLabel>
//             <Select
//               labelId="maps-select-label"
//               label="Default Map"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//             >
//               <MenuItem value={"LocationIQ Streets"}>LocationIQ Streets</MenuItem>
//               <MenuItem value={"LocationIQ Dark"}>LocationIQ Dark</MenuItem>
//               <MenuItem value={"OpenStreet Map"}>OpenStreet Map</MenuItem>
//               <MenuItem value={"OpenTopoMap"}>OpenTopoMap</MenuItem>
//               <MenuItem value={"Carto Basemaps"}>Carto Basemaps</MenuItem>
//               <MenuItem value={"Google Road"}>Google Road</MenuItem>
//               <MenuItem value={"Google Satellite"}>Google Satellite</MenuItem>
//               <MenuItem value={"Google Hybrid"}>Google Hybrid</MenuItem>
//               <MenuItem value={"Auto Navi"}>Auto Navi</MenuItem>
//               <MenuItem value={"Ordnance Survey"}>Ordnance Survey</MenuItem>
//             </Select>
//           </FormControl>
//         ) : col.accessor === 'coordinateFormat' && col.Header === 'Coordinate Format' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="coordinates-select-label">Coordinate Format</InputLabel>
//             <Select
//               labelId="coordinates-select-label"
//               label="Coordinate Format"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//             >
//               <MenuItem value={"dd"}>Decimal Degrees</MenuItem>
//               <MenuItem value={"ddm"}>Degrees Decimal Minutes</MenuItem>
//               <MenuItem value={"dms"}>Degrees Minutes Seconds</MenuItem>
//             </Select>
//           </FormControl>
//         ) : col.accessor === 'attributes.speedUnit' && col.Header === 'Speed Unit' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="speed-select-label">Speed Unit</InputLabel>
//             <Select
//               labelId="speed-select-label"
//               label="Speed Unit"
//               name="attributes.speedUnit" // directly access the attributes.speedUnit
//               value={formData.attributes?.speedUnit || ''} // safely access nested value
//               onChange={handleInputChange}
//             >
//               <MenuItem value={"kn"}>kn</MenuItem>
//               <MenuItem value={"km/h"}>km/h</MenuItem>
//               <MenuItem value={"mph"}>mph</MenuItem>
//             </Select>
//           </FormControl>
//         ) 
//          : col.accessor === 'attributes.distance' && col.Header === 'Distance' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="distance-select-label">Distance Unit</InputLabel>
//             <Select
//               labelId="distance-select-label"
//               label="Distance Unit"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//             >
//               <MenuItem value={"km"}>km</MenuItem>
//               <MenuItem value={"mi"}>mi</MenuItem>
//               <MenuItem value={"nmi"}>nmi</MenuItem>
//             </Select>
//           </FormControl>
//         ) : col.accessor === 'attributes.altitudeUnit' && col.Header === 'Altitude' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="altitude-select-label">Altitude Unit</InputLabel>
//             <Select
//               labelId="altitude-select-label"
//               label="Altitude Unit"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//             >
//               <MenuItem value={"m"}>m</MenuItem>
//               <MenuItem value={"ft"}>ft</MenuItem>
//             </Select>
//           </FormControl>
//         ) : col.accessor === 'attributes.volumeUnit' && col.Header === 'Volume' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="volume-select-label">Volume Unit</InputLabel>
//             <Select
//               labelId="volume-select-label"
//               label="Volume Unit"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//             >
//               <MenuItem value={"ltr"}>Liter</MenuItem>
//               <MenuItem value={"usGal"}>U.S. Gallon</MenuItem>
//               <MenuItem value={"impGal"}>Imp. Gallon</MenuItem>
//             </Select>
//           </FormControl>
//         ) : col.accessor === 'attributes.time' && col.Header === 'Time' ? (
//           <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//             <InputLabel id="timezone-select-label">Timezone</InputLabel>
//             <Select
//               labelId="timezone-select-label"
//               label="Timezone"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//             >
//               {timezones.map((timezone, index) => (
//                 <MenuItem key={index} value={timezone}>
//                   {timezone}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//          ) : col.accessor === 'attributes.loc' && col.Header === 'Location' ? (
       

//         <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//   <InputLabel id="location-select-label">Location</InputLabel>
//   <Select
//     labelId="location-select-label"
//     label="Location"
//     name={col.accessor}
//     value={formData[col.accessor] || ''}
//     onChange={handleInputChange}
//     onClick={() => setLocationOpen(!locationOpen)} // toggle the state when clicked
//   >
//     <MenuItem value="Location Details">Location Details</MenuItem>
//   </Select>

//   {locationOpen && (
//     <Box mt={2}>
//       <TextField
//         label="Latitude"
//         variant="outlined"
//         name="latitude"
//         type="number" // Add number input type
//         value={formData.latitude || 0} // Default to 0 if no value
//         onChange={handleInputChange}
//         inputProps={{ step: 1 }} // Increment/Decrement by 1
//         sx={{ marginBottom: "10px" }}
//         fullWidth
//       />
//       <TextField
//         label="Longitude"
//         variant="outlined"
//         name="longitude"
//         type="number" // Add number input type
//         value={formData.longitude || 0} // Default to 0 if no value
//         onChange={handleInputChange}
//         inputProps={{ step: 1 }} // Increment/Decrement by 1
//         sx={{ marginBottom: "10px" }}
//         fullWidth
//       />
//       <TextField
//         label="Zoom"
//         variant="outlined"
//         name="zoom"
//         value={formData.zoom || ""}
//         onChange={handleInputChange}
//         sx={{ marginBottom: "10px" }}
//         fullWidth
//       />

//       {/* Current Location Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => {
//           // Get the current location using the browser's Geolocation API
//           if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//               (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   latitude: latitude.toFixed(6),  // Set latitude to current location
//                   longitude: longitude.toFixed(6), // Set longitude to current location
//                 }));
//               },
//               (error) => {
//                 console.error("Error getting the current location:", error);
//                 alert("Unable to retrieve current location.");
//               }
//             );
//           } else {
//             alert("Geolocation is not supported by this browser.");
//           }
//         }}
//         sx={{ marginTop: "10px" }}
//       >
//         Current Location
//       </Button>
//     </Box>
//   )}
// </FormControl>


//  ):col.accessor === 'attributes.per' && col.Header === 'Permission' ? (
//         <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//           <InputLabel id="permission-select-label">Permission</InputLabel>
//           <Select
//             labelId="permission-select-label"
//             label="Permission"
//             name={col.accessor}
//             value={formData[col.accessor] || ''}
//             onChange={handleInputChange}
//             onClick={() => setPermissionOpen(!permissionOpen)} // Toggle visibility of text fields
//           >
//             <MenuItem value="Permission Details">Permission Details</MenuItem>
//           </Select>
      
//           {permissionOpen && (
//             <Box mt={2}>
//               {[
//                 { label: 'Registration', accessor: 'registration' },
//                 { label: 'Readonly', accessor: 'readonly' },
//                 { label: 'Device Readonly', accessor: 'deviceReadonly' },
//                 { label: 'Limit Commands', accessor: 'limitCommands' },
//                 { label: 'Disable Reports', accessor: 'disableReports' },
//                 { label: 'No Email Change', accessor: 'fixedEmail' }
//               ].map(({ label, accessor }) => (
//                 <TextField
//                   key={accessor}
//                   label={label}
//                   variant="outlined"
//                   name={accessor}
//                   value={formData[accessor] || ''}
//                   onChange={handleInputChange}
//                   sx={{ marginBottom: "10px" }}
//                   fullWidth
//                 />
//               ))}
//             </Box>
//           )}
//         </FormControl>
//         ) : col.accessor === 'attributes.file' && col.Header === 'File' ? (
  
// <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//   <InputLabel id="file-select-label">
//     File<span style={{ color: 'red' }}> *</span>
//   </InputLabel>
//   <Select
//     labelId="file-select-label"
//     label="File"
//     name={col.accessor}
//     value={formData[col.accessor] || ''}
//     onChange={handleInputChange}
//     required
//   >
//     {/* Upload Button */}
//     <MenuItem>
//       <label htmlFor="contained-button-file">
//         <Button
//           variant="contained"
//           color="primary"
//           component="span"
//         >
//           Upload
//         </Button>
//       </label>
//     </MenuItem>

//     {/* Hidden File Input */}
//     <input
//       accept="image/*"
//       id="contained-button-file"
//       type="file"
//       style={{ display: 'none' }}
//       onChange={handleFileChange} // Handle file selection
//     />
//   </Select>
// </FormControl>
//         ) : col.accessor === 'attributes.attri' && col.Header === 'All Attri' ? (

// <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//   <InputLabel id="attributes-select-label">Attributes</InputLabel>
//   <Select
//     labelId="attributes-select-label"
//     label="Attributes"
//     name={col.accessor}
//     value={formData[col.accessor] || ''}
//     onChange={handleInputChange}
//     onClick={handleAttributesToggle} // Toggle dropdown visibility
//   >
//     <MenuItem value="Attribute Details">Attribute Details</MenuItem>
//   </Select>

//   {attributesOpen && (
//     <Box mt={2}>
//       {/* Logo Image */}
//       <TextField
//         label="Logo Image"
//         variant="outlined"
//         name="attributes.logo"
//         value={formData['attributes.logo'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Color Primary */}
//       <TextField
//         label="Color Primary"
//         variant="outlined"
//         name="attributes.colorPrimary"
//         value={formData['attributes.colorPrimary'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Location IQ Token */}
//       <TextField
//         label="Location IQ Token"
//         variant="outlined"
//         name="attributes.locationIqKey"
//         value={formData['attributes.locationIqKey'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Map Direction */}
//       <TextField
//         label="Map Direction"
//         variant="outlined"
//         name="attributes.mapDirrection"
//         value={formData['attributes.mapDirrection'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Sound Events */}
//       <TextField
//         label="Sound Events"
//         variant="outlined"
//         name="attributes.soundEvents"
//         value={formData['attributes.soundEvents'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Map On Select */}
//       <TextField
//         label="Map On Select"
//         variant="outlined"
//         name="attributes.mapOnSelect"
//         value={formData['attributes.mapOnSelect'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Map Geofences */}
//       <TextField
//         label="Map Geofences"
//         variant="outlined"
//         name="attributes.mapGeofences"
//         value={formData['attributes.mapGeofences'] || ''}
//         onChange={handleInputChange}
//         sx={{ marginBottom: '10px' }}
//         fullWidth
//       />

//       {/* Dark Mode */}
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Checkbox
//               name="attributes.darkMode"
//               checked={formData['attributes.darkMode'] || false}
//               onChange={handleInputChange}
//             />
//           }
//           label="Dark Mode"
//         />
//       </FormGroup>
//         {/* +Add Button */}
//         <Button
//         variant="contained"
//         color="primary"
//         sx={{ marginTop: '10px' }}
//         onClick={handleAddButtonClick12}
//       >
//         +Add
//       </Button>
//       {showAddForm && (
//             <Box mt={2}>
//               <TextField
//                 label="Attribute Key"
//                 variant="outlined"
//                 name="key"
//                 value={newAttribute.key}
//                 onChange={handleNewAttributeChange}
//                 sx={{ marginBottom: '10px' }}
//                 fullWidth
//               />
//               <Select
//                 name="type"
//                 value={newAttribute.type}
//                 onChange={handleNewAttributeChange}
//                 sx={{ marginBottom: '10px' }}
//                 fullWidth
//               >
//                 <MenuItem value="string">String</MenuItem>
//                 <MenuItem value="boolean">Boolean</MenuItem>
//                 <MenuItem value="number">Number</MenuItem>
//               </Select>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddAttributeSubmit}
//               >
//                 Save
//               </Button>
//             </Box>
//           )}
//         </Box>
//       )}
// </FormControl>

//   ) : (
//   <TextField
//     key={col.accessor}
//     label={`${col.Header} *`}
//     variant="outlined"
//     name={col.accessor}
//     value={formData[col.accessor] || ""}
//     onChange={handleInputChange}
//     sx={{ marginBottom: "10px" }}
//     fullWidth
//     required
//   />
  
//   )
//       ))}



   
//       <Button
//               variant="contained"
//               color="primary"
//               onClick={handleEditSubmit}
//             >
//               Submit
//             </Button>
//     </Box>
  
// </Modal>

        
//         <Modal open={addModalOpen} onClose={handleModalClose}>
//           <Box sx={style}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: "20px",
//               }}
//             >
//               <h2 style={{ flexGrow: 1 }}>Add Row</h2>
//               <IconButton onClick={handleModalClose}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             {COLUMNS()
//               .slice(0, -1)
//               .map((col) => (
//                 col.accessor === 'attributes.defaultmap' && col.Header === 'Default Map' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
//                     <InputLabel id="maps-select-label">Default Map</InputLabel>
//                     <Select
//                       labelId="maps-select-label"
//                       label="Default Map"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                     >
//                       <MenuItem value={"LocationIQ Streets"}>LocationIQ Streets</MenuItem>
//                       <MenuItem value={"LocationIQ Dark"}>LocationIQ Dark</MenuItem>
//                       <MenuItem value={"OpenStreet Map"}>OpenStreet Map</MenuItem>
//                       <MenuItem value={"OpenTopoMap"}>OpenTopoMap</MenuItem>
//                       <MenuItem value={"Carto Basemaps"}>Carto Basemaps</MenuItem>
//                       <MenuItem value={"Google Road"}>Google Road</MenuItem>
//                       <MenuItem value={"Google Satellite"}>Google Satellite</MenuItem>
//                       <MenuItem value={"Google Hybrid"}>Google Hybrid</MenuItem>
//                       <MenuItem value={"Auto Navi"}>Auto Navi</MenuItem>
//                       <MenuItem value={"Ordnance Survey"}>Ordnance Survey</MenuItem>
//                     </Select>
//                   </FormControl>
//                 ) : col.accessor === 'attributes.coordinates' && col.Header === 'Coordinate' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="coordinates-select-label">
//                       Coordinate Format<span style={{ color: 'red' }}> </span>
//                     </InputLabel>
//                     <Select
//                       labelId="coordinates-select-label"
//                       label="Coordinate Format"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"Decimal Degrees"}>Decimal Degrees</MenuItem>
//                       <MenuItem value={"Degrees Decimal Minutes"}>Degrees Decimal Minutes</MenuItem>
//                       <MenuItem value={"Degrees Minutes Seconds"}>Degrees Minutes Seconds</MenuItem>
//                     </Select>
//                   </FormControl>
//                 ) : col.accessor === 'attributes.speed' && col.Header === 'Speed' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="speed-select-label">
//                       Speed Unit<span style={{ color: 'red' }}> </span>
//                     </InputLabel>
//                     <Select
//                       labelId="speed-select-label"
//                       label="Speed Unit"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"kn"}>kn</MenuItem>
//                       <MenuItem value={"km/h"}>km/h</MenuItem>
//                       <MenuItem value={"mph"}>mph</MenuItem>
//                     </Select>
//                   </FormControl>
//                 ) : col.accessor === 'attributes.distance' && col.Header === 'Distance' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="distance-select-label">
//                       Distance Unit<span style={{ color: 'red' }}> </span>
//                     </InputLabel>
//                     <Select
//                       labelId="distance-select-label"
//                       label="Distance Unit"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"km"}>km</MenuItem>
//                       <MenuItem value={"mi"}>mi</MenuItem>
//                       <MenuItem value={"nmi"}>nmi</MenuItem>
//                     </Select>
//                   </FormControl>
//                 ) : col.accessor === 'attributes.altitude' && col.Header === 'Altituted' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="altitude-select-label">
//                       Altitude Unit<span style={{ color: 'red' }}> </span>
//                     </InputLabel>
//                     <Select
//                       labelId="altitude-select-label"
//                       label="Altitude Unit"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"m"}>m</MenuItem>
//                       <MenuItem value={"ft"}>ft</MenuItem>
//                     </Select>
//                   </FormControl>
//                 ) : col.accessor === 'attributes.volume' && col.Header === 'Volume' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="volume-select-label">
//                       Volume Unit<span style={{ color: 'red' }}> </span>
//                     </InputLabel>
//                     <Select
//                       labelId="volume-select-label"
//                       label="Volume Unit"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"Liter"}>Liter</MenuItem>
//                       <MenuItem value={"U.S. Gallon"}>U.S. Gallon</MenuItem>
//                       <MenuItem value={"Imp. Gallon"}>Imp. Gallon</MenuItem>
//                     </Select>
//                   </FormControl>
//                 ) : col.accessor === 'attributes.time' && col.Header === 'Time' ? (
                
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                   <InputLabel id="timezone-select-label">
//                     Timezone<span style={{ color: 'red' }}> *</span>
//                   </InputLabel>
//                   <Select
//                     labelId="timezone-select-label"
//                     label="Timezone"
//                     name={col.accessor}
//                     value={formData[col.accessor] || ''}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     {timezones.map((timezone, index) => (
//                       <MenuItem key={index} value={timezone}>
//                         {timezone}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 ) : col.accessor === 'attributes.loc' && col.Header === 'Location' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="location-select-label">
//                       Location<span style={{ color: 'red' }}> *</span>
//                     </InputLabel>
//                     <Select
//                       labelId="location-select-label"
//                       label="Location"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"Location1"}>
//                         Latitude
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Location2"}>
//                         Longitude
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Location3"}>
//                         Zoom
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       {/* Add more locations as needed */}
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleAddSubmit}
//                         sx={{ marginTop: '10px' }}
//                       >
//                         Current Location
//                       </Button>
//                     </Select>
//                   </FormControl>

//                 ) : col.accessor === 'attributes.per' && col.Header === 'Permission' ? (
                 
// <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//   <InputLabel id="permission-select-label">
//     Permission<span style={{ color: 'red' }}> *</span>
//   </InputLabel>
//   <Select
//     labelId="permission-select-label"
//     label="Permission"
//     name={col.accessor}
//     value={formData[col.accessor] || ''}
//     onChange={handleInputChange}
//     required
//   >
//     <FormGroup sx={{ marginTop: '10px' }}>
//       {[
//         { label: 'Registration', feature: 'registration' },
//         { label: 'Readonly', feature: 'readonly' },
//         { label: 'Device Readonly', feature: 'deviceReadonly' },
//         { label: 'Limit Commands', feature: 'limitCommands' },
//         { label: 'Disable Reports', feature: 'disableReports' },
//         { label: 'No Email Change', feature: 'noEmailChange' }
//       ].map(({ label, feature }) => (
//         <FormControlLabel
//           key={feature}
//           control={
//             <Checkbox
//               checked={permissions[feature]}
//               onChange={() => handlePermissionButtonClick(feature)}
//             />
//           }
//           label={label}
//         />
//       ))}
//     </FormGroup>
//   </Select>
// </FormControl>

//                 ) : col.accessor === 'attributes.file' && col.Header === 'File' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="file-select-label">
//                       File<span style={{ color: 'red' }}> *</span>
//                     </InputLabel>
//                     <Select
//                       labelId="file-select-label"
//                       label="File"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <label htmlFor="contained-button-file">
//                         <Button variant="contained" color="primary" component="span">
//                           Upload
//                         </Button>
//                       </label>
//                       <input accept="image/*" id="icon-button-file"
//                         type="file" style={{ display: 'none' }} />
//                       <label htmlFor="icon-button-file">
//                         <IconButton color="primary" aria-label="upload picture"
//                           component="span">
//                         </IconButton>
//                       </label>

//                     </Select>
//                   </FormControl>

//                 ) : col.accessor === 'attributes.attri' && col.Header === 'All Attri' ? (
//                   <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
//                     <InputLabel id="all-attri-select-label">
//                       All Attributes<span style={{ color: 'red' }}> *</span>
//                     </InputLabel>
//                     <Select
//                       labelId="all-attri-select-label"
//                       label="All Attributes"
//                       name={col.accessor}
//                       value={formData[col.accessor] || ''}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <MenuItem value={"Attribute1"}>
//                         Logo Image
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Attribute2"}>
//                         Color Primary
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Attribute3"}>
//                         Location IQ Token
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Attribute4"}>
//                         Color Secondary
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Attribute4"}>
//                         Show Direction
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>
//                       <MenuItem value={"Attribute4"}>
//                         Sound Events
//                         <div>
//                           <TextField
//                             placeholder="Enter details"
//                             size="small"
//                             variant="outlined"
//                             style={{ marginLeft: '10px' }}
//                           />
//                         </div>
//                       </MenuItem>

//                       <FormGroup sx={{ marginTop: '10px' }}>
//       <FormControlLabel
//         control={
//           <Checkbox
//             name="showMapOnSelection"
//             checked={checkboxState.showMapOnSelection}
//             onChange={handleCheckboxChange}
//           />
//         }
//         label="Show Map on Selection"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             name="showGeofences"
//             checked={checkboxState.showGeofences}
//             onChange={handleCheckboxChange}
//           />
//         }
//         label="Show Geofences"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             name="darkMode"
//             checked={checkboxState.darkMode}
//             onChange={handleCheckboxChange}
//           />
//         }
//         label="Dark Mode"
//       />
//     </FormGroup>

//                       <MenuItem value="">
//                         <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
//                           Add
//                         </Button>
//                       </MenuItem>
                    

//                     {isInputVisible && (
//                       <>
//                         <TextField
//                           id="contained-input-file"
//                           variant="outlined"
//                           placeholder="Enter file path or name"
//                           value={inputValue}
//                           onChange={handleChange}
//                           fullWidth
//                           margin="normal"
//                         />
//                         <input
//                           accept="image/*"
//                           id="icon-button-file"
//                           type="file"
//                           style={{ display: 'none' }}
//                         />
//                         <label htmlFor="icon-button-file">
//                           <IconButton color="primary" aria-label="upload picture" component="span">
//                             {/* Optional icon inside the button */}
//                           </IconButton>
//                         </label>
//                         <Button variant="contained" color="secondary" onClick={handleSaveButtonClick}>
//                           Save
//                         </Button>
                        
//                       </>
//                     )}

//                     {savedValue && (
//                       <Box mt={2}>
//                         <strong>Saved Value:</strong> {savedValue}
//                       </Box>
//                     )}


//                   </Select>
//                   </FormControl>

//           ) : (
//           <TextField
//             key={col.accessor}
//             label={`${col.Header} *`}
//             variant="outlined"
//             name={col.accessor}
//             value={formData[col.accessor] || ""}
//             onChange={handleInputChange}
//             sx={{ marginBottom: "10px" }}
//             fullWidth
//             required
//           />
//           )
//               ))}

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddSubmit}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>

//       <Modal open={importModalOpen} onClose={() => setImportModalOpen(false)}>
//         <Box sx={style}>
//           <h2>Import Data</h2>
//           <input type="file" onChange={handleFileUpload} />
//           {importData.length > 0 && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() =>
//                 setFilteredRows([
//                   ...filteredRows,
//                   ...importData.map((row) => ({ ...row, isSelected: false })),
//                 ])
//               }
//               sx={{ marginTop: "10px" }}
//             >
//               Import
//             </Button>
//           )}
//         </Box>
//       </Modal>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity="warning">
//           Please select a row to edit!
//         </Alert>
//       </Snackbar>
//     </div >
//     </>
//   );
// }




//new code





//new updated code 
import React, { useState, useEffect, useContext, Component } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { COLUMNS } from "./columns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TotalResponsesContext } from "../../../../TotalResponsesContext";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { Select, MenuItem, TextField } from '@mui/material';

// import {Box, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';


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
  overflowY: "auto", // Enable vertical scrolling
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
};

export const Server = () => {
  const { setTotalResponses } = useContext(TotalResponsesContext); // Get the context value

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(COLUMNS().map((col) => [col.accessor, true]))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importData, setImportData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  // const [formData, setFormData] = useState({});
  const [formData, setFormData] = useState({
    attributes: {
      speedUnit: "km/h",
      timezone: "Asia/Kolkata",
      logo: "credenceLogo.png",
      colorPrimary: "yellow",
      locationIqKey: "",
      mapOnSelect: true,
      colorSecondary: "Blue",
      mapGeofences: true,
      mapDirection: "",
      soundEvents: "",
      darkMode: true,
      distanceUnit: "km",
      time: "Africa/Bissau",
      distance: "km",
      volumeUnit: "usGal",
      altitudeUnit: "ft",
      per: "Permission Details",
      attri: "Attribute Details",
      newatrri: "newone",
    },
  });
  const [loading, setLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleTextFieldChange = (event) => {
    setInputValue(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      attributes: {
        ...prevFormData.attributes,
        [selectedAttribute]: event.target.value,
      },
    }));
  };

  const handleAttributeChange = (event) => {
    const attribute = event.target.value;
    setSelectedAttribute(attribute);
    setInputValue(formData.attributes[attribute] || '');
  };
  


  const fetchData = async () => {
    console.log('Fetching data...');
    setLoading(true); // Set loading to true when starting fetch
    try {
      const username = "school";
      const password = "123456";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get("https://rocketsalestracker.com/api/server", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      console.log('fetch data', response.data);

      if (response.data && typeof response.data === 'object') {
        const wrappedData = [response.data];
        setFilteredRows(wrappedData.map(row => ({ ...row, isSelected: false })));
        setTotalResponses(wrappedData.length);
      } else {
        console.error('Expected an object but got:', response.data);
      }
    } catch (error) {
      console.error('Fetch data error:', error);
      alert('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData(filterText);
  }, [filterText]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);
  };


  const filterData = (text) => {
    // Apply text-based filtering
    if (text === "") {
      // If no text is provided, reset to original rows
      setFilteredRows(originalRows.map(row => ({ ...row, isSelected: false })));
    } else {
      // Filter based on text
      const filteredData = originalRows
        .filter((row) =>
          Object.values(row).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(text.toLowerCase())
          )
        )
        .map((row) => ({ ...row, isSelected: false }));

      setFilteredRows(filteredData);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
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

  const handleEditButtonClick = () => {
    const selected = filteredRows.find((row) => row.isSelected);
    if (selected) {
      setSelectedRow(selected);
      setFormData(selected);
      setEditModalOpen(true);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleDeleteSelected = async () => {
    // Log filteredRows to check its structure
    console.log("Filtered rows:", filteredRows);

    // Get selected row IDs
    const selectedIds = filteredRows
      .filter((row) => row.isSelected)
      .map((row) => {
        // Log each row to check its structure
        console.log("Processing row:", row);
        return row._id; // Ensure id exists and is not undefined
      });

    console.log("Selected IDs:", selectedIds);

    if (selectedIds.length === 0) {
      alert("No rows selected for deletion.");
      return;
    }
    const userConfirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} record(s)?`
    );

    if (!userConfirmed) {
      // If the user clicks "Cancel", exit the function
      return;
    }
    try {
      // Define the API endpoint and token
      const apiUrl =
        "https://schoolmanagement-4-pzsf.onrender.com/school/delete";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0"; // Replace with actual token

      // Send delete requests for each selected ID
      const deleteRequests = selectedIds.map((id) =>
        fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error deleting record with ID ${id}: ${response.statusText}`
            );
          }
          return response.json();
        })
      );

      // Wait for all delete requests to complete
      await Promise.all(deleteRequests);

      // Filter out deleted rows
      const newFilteredRows = filteredRows.filter((row) => !row.isSelected);

      // Update state
      setFilteredRows(newFilteredRows);
      setSelectAll(false);

      alert("Selected records deleted successfully.");
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Failed to delete selected records.");
    }
    fetchData();
  };

  const handleExport = () => {
    const dataToExport = filteredRows.map((row) => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Server.xlsx");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setImportData(parsedData);
      };
      reader.readAsArrayBuffer(file);
    }
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

  const handleAddButtonClick = () => {
    setFormData({});
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
    setFormData({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Check if the name contains nested keys (e.g., 'attributes.speedUnit')
    if (name.includes('.')) {
      // Split the name into keys for nested object handling
      const keys = name.split('.');
  
      setFormData((prevFormData) => {
        // Clone the previous formData to avoid mutation
        let updatedFormData = { ...prevFormData };
  
        // Handle nested keys by reducing them into the object
        keys.reduce((acc, key, index) => {
          if (index === keys.length - 1) {
            acc[key] = value; // Set the final key to the new value
          } else {
            acc[key] = acc[key] || {}; // Ensure intermediate objects are present
          }
          return acc[key];
        }, updatedFormData);
  
        return updatedFormData;
      });
    } else {
      // Handle simple (non-nested) key-value pairs
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  

  // ALL ATTRIBUTES

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  const handleAddClick = () => {
    setIsInputVisible(true);
  };

  


  

  const handleEditSubmit = async () => {
    const apiUrl = `https://rocketsalestracker.com/api/server`;
    const username = "school";
    const password = "123456";
    const token = btoa(`${username}:${password}`);
  
    // Update only selected attributes or specific fields you want to modify.
    const updatedAttributes = {
      ...formData.attributes, // Keep existing attributes
      // Add or update specific attributes dynamically, e.g., speedUnit, timezone, etc.
    };
  
    // Prepare the payload to send in the request
    const updatedData = {
      ...formData,
      isSelected: false, // Ensure this field is properly handled
      attributes: updatedAttributes, // Updated attributes to be sent
    };
  
    try {
      console.log("Sending request to:", apiUrl);
      console.log("Request payload:", JSON.stringify(updatedData, null, 2));
  
      // Send the PUT request
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      // Log response for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
  
      if (!response.ok) {
        // If there's an error in the request, handle it appropriately
        const errorResult = await response.json();
        console.error("Error response:", errorResult);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResult.message}`);
      }
  
      // Parse the successful response
      const result = await response.json();
      console.log("Update successful:", result);
      alert("Updated successfully");
  
      // Update filteredRows to reflect changes in the UI
      const updatedRows = filteredRows.map((row) =>
        row.id === selectedRow.id
          ? { ...row, ...updatedData, isSelected: false }
          : row
      );
      setFilteredRows(updatedRows);
  
      // Close the modal and refresh the data
      handleModalClose();
      fetchData(); // Ensure the latest data is reflected in the UI
    } catch (error) {
      console.error("Error updating row:", error.message, error.stack);
      alert("Error updating data");
    }
  };
  







  



  const handleAddSubmit = async () => {
    try {
      // Define the API endpoint and credentials
      const apiUrl = "https://rocketsalestracker.com/api/devices"; // Replace with actual API endpoint
      const username = "school"; // Replace with your actual username
      const password = "123456"; // Replace with your actual password
      const token = btoa(`${username}:${password}`); // Encode credentials in Base64
  
      // Prepare the new row object based on the expected schema
      const newRow = {
      
       
        attributes: {
          speedUnit: formData.attributes?.speedUnit || '',
          custommap: formData.attributes?.custommap || '',
          customoverlay: formData.attributes?.customoverlay || '',
          defaultmap: formData.attributes?.defaultmap || '',
          coordinates: formData.attributes?.coordinates || '',
          speed: formData.attributes?.speed || '',
          distance: formData.attributes?.distance || '',
          altitude: formData.attributes?.altitude || '',
          volume: formData.attributes?.volume || '',
          time: formData.attributes?.time || '',
          poi: formData.attributes?.poi || '',
          announce: formData.attributes?.announce || '',
          loc: formData.attributes?.loc || '',
          per: formData.attributes?.per || '',
          attri: formData.attributes?.attri || '',
          file: formData.attributes?.file || '',
          logo: formData.attributes?.logo || '',
          colorPrimary: formData.attributes?.colorPrimary || '',
          locationIqKey: formData.attributes?.locationIqKey || '',
          mapOnSelect: formData.attributes?.mapOnSelect || false,
        },
        calendarId: formData.calendarId || '', // Ensure formData has 'calendarId'
        status: formData.status || '', // Ensure formData has 'status'
        phone: formData.phone || '', // Ensure formData has 'phone'
        model: formData.model || '', // Ensure formData has 'model'
        expirationTime: formData.expirationTime || '', // Ensure formData has 'expirationTime'
        contact: formData.contact || '', // Ensure formData has 'contact'
        category: formData.category || '', // Ensure formData has 'category'
        registration: formData.registration || false,
        readonly: formData.readonly || false,
        deviceReadonly: formData.deviceReadonly || false,
        map: formData.map || '',
        latitude: formData.latitude || 0,
        longitude: formData.longitude || 0,
        zoom: formData.zoom || 0,
        twelveHourFormat: formData.twelveHourFormat || false,
        forceSettings: formData.forceSettings || false,
        coordinateFormat: formData.coordinateFormat || '',
        limitCommands: formData.limitCommands || false,
        disableReports: formData.disableReports || false,
        fixedEmail: formData.fixedEmail || false,
        poiLayer: formData.poiLayer || '',
        announcement: formData.announcement || '',
        emailEnabled: formData.emailEnabled || false,
        geocoderEnabled: formData.geocoderEnabled || false,
        textEnabled: formData.textEnabled || false,
        storageSpace: formData.storageSpace || [],
        newServer: formData.newServer || false,
        openIdEnabled: formData.openIdEnabled || false,
        openIdForce: formData.openIdForce || false,
        version: formData.version || '',
      };
  
  
      // POST request to the server with Basic Auth
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${token}`, // Add Basic Auth header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });
  
      // Parse the JSON response
      const result = await response.json();
  
      if (response.ok) {
        // Update the state with the new row
        setFilteredRows([...filteredRows, result]);
  
        // Close the modal and refresh data
        handleModalClose();
        fetchData();
  
        console.log("Record created successfully:", result);
        alert("Record created successfully");
      } else {
        // Log and alert the specific server response in case of an error
        console.error("Server responded with:", result);
        alert(`Unable to create record: ${result.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
      alert("Unable to create record");
      // Handle the error appropriately (e.g., show a notification to the user)
    }
  };
 
  const [permissions, setPermissions] = useState({
    registration: false,
    readonly: false,
    deviceReadonly: false,
    limitCommands: false,
    disableReports: false,
    noEmailChange: false,
  });
  
  // Function to handle checkbox toggle
  const handlePermissionButtonClick = (feature) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [feature]: !prevPermissions[feature],
    }));
  };

 

  const [timezones, setTimezones] = useState([]);
 
  useEffect(() => {
    // Fetch timezones from the API with basic authentication
    const fetchTimezones = async () => {
      try {
        const response = await axios.get('https://rocketsalestracker.com/api/server/timezones', {
          auth: {
            username: 'school',
            password: '123456'
          }
        });
        setTimezones(response.data); // Assuming response.data is an array of timezones
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchTimezones();
  }, []);
  const [checkboxState, setCheckboxState] = useState({
    showMapOnSelection: false,
    showGeofences: false,
    darkMode: false,
  });

  // Handler to update the checkbox state
  const handleCheckboxChange = (event) => {
    setCheckboxState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };
  const [locationOpen, setLocationOpen] = useState(false);
  const [permissionOpen, setPermissionOpen] = useState(false);

  const [attributesOpen, setAttributesOpen] = useState(false); // Toggle state

const handleAttributesToggle = () => {
  setAttributesOpen(!attributesOpen);
};
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
    // Optionally, handle file upload or preview here
  }
};
const [newAttribute, setNewAttribute] = useState({
  key: '',
  type: 'string',
});



// const handleAddButtonClick12 = () => {
//   setShowAddForm(true);
// };

const handleNewAttributeChange = (e) => {
  const { name, value } = e.target;
  setNewAttribute((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleAddAttributeSubmit = () => {
  setFormData((prev) => ({
    ...prev,
    [`attributes.${newAttribute.key}`]: newAttribute.type === 'boolean' ? false : '',
  }));
  setShowAddForm(false);
};

const [showAddForm, setShowAddForm] = useState(false);

// const [inputValue, setInputValue] = useState(''); // for new attribute name
const [attributeType, setAttributeType] = useState(''); // for new attribute type (String, Boolean, etc.)
// const [savedValue, setSavedValue] = useState(''); // to track the saved value
// const [isInputVisible, setIsInputVisible] = useState(false); // toggle for input visibility

// Handle input change


// Handle the Add button click


// Handle saving new attribute
const handleSaveButtonClick = () => {
  if (inputValue && attributeType) {
    // Add the new attribute to the attributes object in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      attributes: {
        ...prevFormData.attributes,
        [inputValue]: attributeType === "Boolean" ? false : "", // Set default value for the type
      },
    }));
    setSavedValue(`${inputValue}: ${attributeType}`);
    setIsInputVisible(false); // Hide the input fields
    setInputValue(''); // Reset input values
    setAttributeType('');
  }
};

// Handle input change for new attribute name or type
const handleChange = (event) => {
  setInputValue(event.target.value);
};

// Handle type selection for the new attribute
const handleTypeChange = (event) => {
  setAttributeType(event.target.value);
};
const handleAddButtonClick12 = () => {
  setIsInputVisible(true); // Show the input fields to add new attributes
};
const attributes = formData.attributes || {}; 
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>
        Server
      </h1>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            sx={{ marginRight: "10px", width: "300px" }}
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
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: "rgb(85, 85, 85)",
              color: "white",
              fontWeight: "bold",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ImportExportIcon />
            Column Visibility
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            sx={{ marginRight: "10px" }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditButtonClick}
            sx={{ marginRight: "10px" }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddButtonClick}
            sx={{ marginRight: "10px" }}
            startIcon={<AddCircleIcon />}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => setImportModalOpen(true)}
            sx={{ backgroundColor: "rgb(255, 165, 0)", marginRight: "10px" }}
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export
          </Button>
        </div>
       

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 440,
                border: "1.5px solid black",
                borderRadius: "7px",
              }}
            >
            
              <Table
                stickyHeader
                aria-label="sticky table"
                style={{ border: "1px solid black" }}
              >
                <TableHead>
                  <TableRow
                    style={{
                      borderBottom: "1px solid black",
                      borderTop: "1px solid black",
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      style={{
                        borderRight: "1px solid #e0e0e0",
                        borderBottom: "2px solid black",
                      }}
                    >
                      <Switch
                        checked={selectAll}
                        onChange={handleSelectAll}
                        color="primary"
                      />
                    </TableCell>
                    {COLUMNS()
                      .filter((col) => columnVisibility[col.accessor])
                      .map((column) => (
                        <TableCell
                          key={column.accessor}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            cursor: "pointer",
                            borderRight: "1px solid #e0e0e0",
                            borderBottom: "2px solid black",
                            padding: "4px 4px",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                          onClick={() => requestSort(column.accessor)}
                        >
                          {column.Header}
                          {sortConfig.key === column.accessor ? (
                            sortConfig.direction === "ascending" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            )
                          ) : null}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={COLUMNS().filter((col) => columnVisibility[col.accessor]).length}
                        style={{
                          textAlign: 'center',
                          padding: '16px',
                          fontSize: '16px',
                          color: '#757575',
                        }}
                      >
                        <h4>No Data Available</h4>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          onClick={() =>
                            handleRowSelect(page * rowsPerPage + index)
                          }
                          selected={row.isSelected}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
                            borderBottom: "none",
                          }}
                        >
                          <TableCell
                            padding="checkbox"
                            style={{ borderRight: "1px solid #e0e0e0" }}
                          >
                            <Switch checked={row.isSelected} color="primary" />
                          </TableCell>
                          {COLUMNS()
                            .filter((col) => columnVisibility[col.accessor])
                            .map((column) => {
                              // Debug output
                              // console.log(`Row data: ${JSON.stringify(row)}, Column accessor: ${column.accessor}`);

                              // Access the correct value from the row
                              const value = column.accessor.split('.').reduce((acc, part) => acc && acc[part], row);

                              return (
                                <TableCell
                                  key={column.accessor}
                                  align={column.align}
                                  style={{
                                    borderRight: "1px solid #e0e0e0",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    borderBottom: "none",
                                    backgroundColor:
                                      index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
                                    fontSize: "smaller",
                                  }}
                                >
                                  {column.Cell ? column.Cell({ value }) : value}
                                </TableCell>
                              );
                            })}
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>

            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* //</></div> */}
          </>
        )}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={style}>
            <h2>Column Visibility</h2>
            {COLUMNS().map((col) => (
              <div key={col.accessor}>
                <Switch
                  checked={columnVisibility[col.accessor]}
                  onChange={() => handleColumnVisibilityChange(col.accessor)}
                  color="primary"
                />
                {col.Header}
              </div>
            ))}
          </Box>
        </Modal>
        {/* <Modal open={editModalOpen} onClose={handleModalClose}>
          <Box sx={style}>
            {/* <h2>Edit Row</h2> 
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ flexGrow: 1 }}>Edit Row</h2>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {COLUMNS()
              .slice(0, -1)
              .map((col) => (
                <TextField
                  key={col.accessor}
                  label={col.Header}
                  variant="outlined"
                  name={col.accessor}
                  value={formData[col.accessor] || ""}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
              ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSubmit}
            >
              Submit
            </Button>
          </Box>
        </Modal> */}
<Modal open={editModalOpen} onClose={handleModalClose}>
  <Box sx={style}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ flexGrow: 1 }}>Edit Row</h2>
      <IconButton onClick={handleModalClose}>
        <CloseIcon />
      </IconButton>
    </Box>

    {COLUMNS()
      .slice(0, -29)
      .map((col) => (
        col.accessor === 'map' && col.Header === 'Default Map' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="maps-select-label">Default Map</InputLabel>
            <Select
              labelId="maps-select-label"
              label="Default Map"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"LocationIQ Streets"}>LocationIQ Streets</MenuItem>
              <MenuItem value={"LocationIQ Dark"}>LocationIQ Dark</MenuItem>
              <MenuItem value={"OpenStreet Map"}>OpenStreet Map</MenuItem>
              <MenuItem value={"OpenTopoMap"}>OpenTopoMap</MenuItem>
              <MenuItem value={"Carto Basemaps"}>Carto Basemaps</MenuItem>
              <MenuItem value={"Google Road"}>Google Road</MenuItem>
              <MenuItem value={"Google Satellite"}>Google Satellite</MenuItem>
              <MenuItem value={"Google Hybrid"}>Google Hybrid</MenuItem>
              <MenuItem value={"Auto Navi"}>Auto Navi</MenuItem>
              <MenuItem value={"Ordnance Survey"}>Ordnance Survey</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'coordinateFormat' && col.Header === 'Coordinate Format' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="coordinates-select-label">Coordinate Format</InputLabel>
            <Select
              labelId="coordinates-select-label"
              label="Coordinate Format"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"dd"}>Decimal Degrees</MenuItem>
              <MenuItem value={"ddm"}>Degrees Decimal Minutes</MenuItem>
              <MenuItem value={"dms"}>Degrees Minutes Seconds</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'attributes.speedUnit' && col.Header === 'Speed Unit' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="speed-select-label">Speed Unit</InputLabel>
            <Select
              labelId="speed-select-label"
              label="Speed Unit"
              name="attributes.speedUnit" // directly access the attributes.speedUnit
              value={formData.attributes?.speedUnit || ''} // safely access nested value
              onChange={handleInputChange}
            >
              <MenuItem value={"kn"}>kn</MenuItem>
              <MenuItem value={"km/h"}>km/h</MenuItem>
              <MenuItem value={"mph"}>mph</MenuItem>
            </Select>
          </FormControl>
        ) 
         : col.accessor === 'attributes.distance' && col.Header === 'Distance' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="distance-select-label">Distance Unit</InputLabel>
            <Select
              labelId="distance-select-label"
              label="Distance Unit"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"km"}>km</MenuItem>
              <MenuItem value={"mi"}>mi</MenuItem>
              <MenuItem value={"nmi"}>nmi</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'attributes.altitudeUnit' && col.Header === 'Altitude' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="altitude-select-label">Altitude Unit</InputLabel>
            <Select
              labelId="altitude-select-label"
              label="Altitude Unit"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"m"}>m</MenuItem>
              <MenuItem value={"ft"}>ft</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'attributes.volumeUnit' && col.Header === 'Volume' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="volume-select-label">Volume Unit</InputLabel>
            <Select
              labelId="volume-select-label"
              label="Volume Unit"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"ltr"}>Liter</MenuItem>
              <MenuItem value={"usGal"}>U.S. Gallon</MenuItem>
              <MenuItem value={"impGal"}>Imp. Gallon</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'attributes.time' && col.Header === 'Time' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="timezone-select-label">Timezone</InputLabel>
            <Select
              labelId="timezone-select-label"
              label="Timezone"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              {timezones.map((timezone, index) => (
                <MenuItem key={index} value={timezone}>
                  {timezone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         ) : col.accessor === 'attributes.loc' && col.Header === 'Location' ? (
       

        <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
  <InputLabel id="location-select-label">Location</InputLabel>
  <Select
    labelId="location-select-label"
    label="Location"
    name={col.accessor}
    value={formData[col.accessor] || ''}
    onChange={handleInputChange}
    onClick={() => setLocationOpen(!locationOpen)} // toggle the state when clicked
  >
    <MenuItem value="Location Details">Location Details</MenuItem>
  </Select>

  {locationOpen && (
    <Box mt={2}>
      <TextField
        label="Latitude"
        variant="outlined"
        name="latitude"
        type="number" // Add number input type
        value={formData.latitude || 0} // Default to 0 if no value
        onChange={handleInputChange}
        inputProps={{ step: 1 }} // Increment/Decrement by 1
        sx={{ marginBottom: "10px" }}
        fullWidth
      />
      <TextField
        label="Longitude"
        variant="outlined"
        name="longitude"
        type="number" // Add number input type
        value={formData.longitude || 0} // Default to 0 if no value
        onChange={handleInputChange}
        inputProps={{ step: 1 }} // Increment/Decrement by 1
        sx={{ marginBottom: "10px" }}
        fullWidth
      />
      <TextField
        label="Zoom"
        variant="outlined"
        name="zoom"
        value={formData.zoom || ""}
        onChange={handleInputChange}
        sx={{ marginBottom: "10px" }}
        fullWidth
      />

      {/* Current Location Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Get the current location using the browser's Geolocation API
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setFormData((prevData) => ({
                  ...prevData,
                  latitude: latitude.toFixed(6),  // Set latitude to current location
                  longitude: longitude.toFixed(6), // Set longitude to current location
                }));
              },
              (error) => {
                console.error("Error getting the current location:", error);
                alert("Unable to retrieve current location.");
              }
            );
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        }}
        sx={{ marginTop: "10px" }}
      >
        Current Location
      </Button>
    </Box>
  )}
</FormControl>


 ):col.accessor === 'attributes.per' && col.Header === 'Permission' ? (
        <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
          <InputLabel id="permission-select-label">Permission</InputLabel>
          <Select
            labelId="permission-select-label"
            label="Permission"
            name={col.accessor}
            value={formData[col.accessor] || ''}
            onChange={handleInputChange}
            onClick={() => setPermissionOpen(!permissionOpen)} // Toggle visibility of text fields
          >
            <MenuItem value="Permission Details">Permission Details</MenuItem>
          </Select>
      
          {permissionOpen && (
            <Box mt={2}>
              {[
                { label: 'Registration', accessor: 'registration' },
                { label: 'Readonly', accessor: 'readonly' },
                { label: 'Device Readonly', accessor: 'deviceReadonly' },
                { label: 'Limit Commands', accessor: 'limitCommands' },
                { label: 'Disable Reports', accessor: 'disableReports' },
                { label: 'No Email Change', accessor: 'fixedEmail' }
              ].map(({ label, accessor }) => (
                <TextField
                  key={accessor}
                  label={label}
                  variant="outlined"
                  name={accessor}
                  value={formData[accessor] || ''}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
              ))}
            </Box>
          )}
        </FormControl>
        ) : col.accessor === 'attributes.file' && col.Header === 'File' ? (
  
<FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
  <InputLabel id="file-select-label">
    File<span style={{ color: 'red' }}> *</span>
  </InputLabel>
  <Select
    labelId="file-select-label"
    label="File"
    name={col.accessor}
    value={formData[col.accessor] || ''}
    onChange={handleInputChange}
    required
  >
    {/* Upload Button */}
    <MenuItem>
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
        >
          Upload
        </Button>
      </label>
    </MenuItem>

    {/* Hidden File Input */}
    <input
      accept="image/*"
      id="contained-button-file"
      type="file"
      style={{ display: 'none' }}
      onChange={handleFileChange} // Handle file selection
    />
  </Select>
</FormControl>
        ) : col.accessor === 'attributes.attri' && col.Header === 'All Attri' ? (

        //   <FormControl fullWidth sx={{ marginBottom: '10px' }} >
        //   <InputLabel id="all-attri-select-label">
        //     All Attributes<span style={{ color: 'red' }}> *</span>
        //   </InputLabel>
        //   <Select
        //     labelId="all-attri-select-label"
        //     label="All Attributes"
        //     name="attributes.attri"
        //     value={formData.attributes?.attri || ''}
        //     onChange={handleInputChange}
        //     required
        //   >
        //     {Object.keys(formData.attributes || {}).map((key) => (
        //       <MenuItem key={key} value={key}>
        //         {key}
        //         <div>
        //           <TextField
        //             placeholder={`Enter value for ${key}`}
        //             size="small"
        //             variant="outlined"
        //             style={{ marginLeft: '10px' }}
        //             value={formData.attributes[key]}
        //             onChange={(e) => {
        //               setFormData((prevFormData) => ({
        //                 ...prevFormData,
        //                 attributes: {
        //                   ...prevFormData.attributes,
        //                   [key]: e.target.value,
        //                 },
        //               }));
        //             }}
        //           />
        //         </div>
        //       </MenuItem>
        //     ))}
      
        //     {/* Add more attributes dynamically */}
        //     <MenuItem value="">
        //       <Button variant="contained" color="primary" onClick={handleAddButtonClick12}>
        //         Add New Attribute
        //       </Button>
        //     </MenuItem>
        //   </Select>
      
        //   {isInputVisible && (
        //     <>
        //       <TextField
        //         id="new-attribute-name"
        //         variant="outlined"
        //         placeholder="Enter attribute name"
        //         value={inputValue}
        //         onChange={handleChange}
        //         fullWidth
        //         margin="normal"
        //       />
        //       <Select
        //         id="new-attribute-type"
        //         value={attributeType}
        //         onChange={handleTypeChange}
        //         displayEmpty
        //         fullWidth
        //       >
        //         <MenuItem value="" disabled>Select Type</MenuItem>
        //         <MenuItem value="String">String</MenuItem>
        //         <MenuItem value="Boolean">Boolean</MenuItem>
        //         <MenuItem value="Number">Number</MenuItem>
        //       </Select>
      
        //       <Button variant="contained" color="secondary" onClick={handleSaveButtonClick}>
        //         Save
        //       </Button>
        //     </>
        //   )}
      
        //   {savedValue && (
        //     <Box mt={2}>
        //       <strong>Saved Attribute:</strong> {savedValue}
        //     </Box>
        //   )}
        // </FormControl>
        <FormControl fullWidth sx={{ marginBottom: '10px' }} >
        <InputLabel id="all-attri-select-label">
          All Attributes<span style={{ color: 'red' }}> *</span>
        </InputLabel>
        <Select
          labelId="all-attri-select-label"
          label="All Attributes"
          name="attributes.attri"
          value={selectedAttribute}
          onChange={handleAttributeChange}
          required
        >
          {Object.keys(formData.attributes || {}).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
              
            </MenuItem>
          ))}
    
          {/* Add more attributes dynamically */}
          <MenuItem value="">
            <Button variant="contained" color="primary" onClick={handleAddButtonClick12}>
              Add New Attribute
            </Button>
          </MenuItem>
        </Select>

        {selectedAttribute && (
        <TextField
          placeholder={`Enter value for ${selectedAttribute}`}
          size="small"
          variant="outlined"
          style={{ marginTop: '10px' }}
          value={inputValue}
          onChange={handleTextFieldChange}
        />
      )}
    
        {isInputVisible && (
          <>
            <TextField
              id="new-attribute-name"
              variant="outlined"
              placeholder="Enter attribute name"
              value={inputValue}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Select
              id="new-attribute-type"
              value={attributeType}
              onChange={handleTypeChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Select Type</MenuItem>
              <MenuItem value="String">String</MenuItem>
              <MenuItem value="Boolean">Boolean</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
            </Select>
    
            <Button variant="contained" color="secondary" onClick={handleSaveButtonClick}>
              Save
            </Button>
          </>
        )}
    
        {savedValue && (
          <Box mt={2}>
            <strong>Saved Attribute:</strong> {savedValue}
          </Box>
        )}
      </FormControl>
  ) : (
  <TextField
    key={col.accessor}
    label={`${col.Header} *`}
    variant="outlined"
    name={col.accessor}
    value={formData[col.accessor] || ""}
    onChange={handleInputChange}
    sx={{ marginBottom: "10px" }}
    fullWidth
    required
  />
  
  )
      ))}



   
      <Button
              variant="contained"
              color="primary"
              onClick={handleEditSubmit}
            >
              Submit
            </Button>
    </Box>
  
</Modal>

        
        <Modal open={addModalOpen} onClose={handleModalClose}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ flexGrow: 1 }}>Add Row</h2>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {COLUMNS()
              .slice(0, -1)
              .map((col) => (
                col.accessor === 'attributes.defaultmap' && col.Header === 'Default Map' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
                    <InputLabel id="maps-select-label">Default Map</InputLabel>
                    <Select
                      labelId="maps-select-label"
                      label="Default Map"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"LocationIQ Streets"}>LocationIQ Streets</MenuItem>
                      <MenuItem value={"LocationIQ Dark"}>LocationIQ Dark</MenuItem>
                      <MenuItem value={"OpenStreet Map"}>OpenStreet Map</MenuItem>
                      <MenuItem value={"OpenTopoMap"}>OpenTopoMap</MenuItem>
                      <MenuItem value={"Carto Basemaps"}>Carto Basemaps</MenuItem>
                      <MenuItem value={"Google Road"}>Google Road</MenuItem>
                      <MenuItem value={"Google Satellite"}>Google Satellite</MenuItem>
                      <MenuItem value={"Google Hybrid"}>Google Hybrid</MenuItem>
                      <MenuItem value={"Auto Navi"}>Auto Navi</MenuItem>
                      <MenuItem value={"Ordnance Survey"}>Ordnance Survey</MenuItem>
                    </Select>
                  </FormControl>
                ) : col.accessor === 'attributes.coordinates' && col.Header === 'Coordinate' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="coordinates-select-label">
                      Coordinate Format<span style={{ color: 'red' }}> </span>
                    </InputLabel>
                    <Select
                      labelId="coordinates-select-label"
                      label="Coordinate Format"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"Decimal Degrees"}>Decimal Degrees</MenuItem>
                      <MenuItem value={"Degrees Decimal Minutes"}>Degrees Decimal Minutes</MenuItem>
                      <MenuItem value={"Degrees Minutes Seconds"}>Degrees Minutes Seconds</MenuItem>
                    </Select>
                  </FormControl>
                ) : col.accessor === 'attributes.speed' && col.Header === 'Speed' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="speed-select-label">
                      Speed Unit<span style={{ color: 'red' }}> </span>
                    </InputLabel>
                    <Select
                      labelId="speed-select-label"
                      label="Speed Unit"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"kn"}>kn</MenuItem>
                      <MenuItem value={"km/h"}>km/h</MenuItem>
                      <MenuItem value={"mph"}>mph</MenuItem>
                    </Select>
                  </FormControl>
                ) : col.accessor === 'attributes.distance' && col.Header === 'Distance' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="distance-select-label">
                      Distance Unit<span style={{ color: 'red' }}> </span>
                    </InputLabel>
                    <Select
                      labelId="distance-select-label"
                      label="Distance Unit"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"km"}>km</MenuItem>
                      <MenuItem value={"mi"}>mi</MenuItem>
                      <MenuItem value={"nmi"}>nmi</MenuItem>
                    </Select>
                  </FormControl>
                ) : col.accessor === 'attributes.altitude' && col.Header === 'Altituted' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="altitude-select-label">
                      Altitude Unit<span style={{ color: 'red' }}> </span>
                    </InputLabel>
                    <Select
                      labelId="altitude-select-label"
                      label="Altitude Unit"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"m"}>m</MenuItem>
                      <MenuItem value={"ft"}>ft</MenuItem>
                    </Select>
                  </FormControl>
                ) : col.accessor === 'attributes.volume' && col.Header === 'Volume' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="volume-select-label">
                      Volume Unit<span style={{ color: 'red' }}> </span>
                    </InputLabel>
                    <Select
                      labelId="volume-select-label"
                      label="Volume Unit"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"Liter"}>Liter</MenuItem>
                      <MenuItem value={"U.S. Gallon"}>U.S. Gallon</MenuItem>
                      <MenuItem value={"Imp. Gallon"}>Imp. Gallon</MenuItem>
                    </Select>
                  </FormControl>
                ) : col.accessor === 'attributes.time' && col.Header === 'Time' ? (
                
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                  <InputLabel id="timezone-select-label">
                    Timezone<span style={{ color: 'red' }}> *</span>
                  </InputLabel>
                  <Select
                    labelId="timezone-select-label"
                    label="Timezone"
                    name={col.accessor}
                    value={formData[col.accessor] || ''}
                    onChange={handleInputChange}
                    required
                  >
                    {timezones.map((timezone, index) => (
                      <MenuItem key={index} value={timezone}>
                        {timezone}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                ) : col.accessor === 'attributes.loc' && col.Header === 'Location' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="location-select-label">
                      Location<span style={{ color: 'red' }}> *</span>
                    </InputLabel>
                    <Select
                      labelId="location-select-label"
                      label="Location"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"Location1"}>
                        Latitude
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Location2"}>
                        Longitude
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Location3"}>
                        Zoom
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      {/* Add more locations as needed */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSubmit}
                        sx={{ marginTop: '10px' }}
                      >
                        Current Location
                      </Button>
                    </Select>
                  </FormControl>

                ) : col.accessor === 'attributes.per' && col.Header === 'Permission' ? (
                 
<FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
  <InputLabel id="permission-select-label">
    Permission<span style={{ color: 'red' }}> *</span>
  </InputLabel>
  <Select
    labelId="permission-select-label"
    label="Permission"
    name={col.accessor}
    value={formData[col.accessor] || ''}
    onChange={handleInputChange}
    required
  >
    <FormGroup sx={{ marginTop: '10px' }}>
      {[
        { label: 'Registration', feature: 'registration' },
        { label: 'Readonly', feature: 'readonly' },
        { label: 'Device Readonly', feature: 'deviceReadonly' },
        { label: 'Limit Commands', feature: 'limitCommands' },
        { label: 'Disable Reports', feature: 'disableReports' },
        { label: 'No Email Change', feature: 'noEmailChange' }
      ].map(({ label, feature }) => (
        <FormControlLabel
          key={feature}
          control={
            <Checkbox
              checked={permissions[feature]}
              onChange={() => handlePermissionButtonClick(feature)}
            />
          }
          label={label}
        />
      ))}
    </FormGroup>
  </Select>
</FormControl>

                ) : col.accessor === 'attributes.file' && col.Header === 'File' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="file-select-label">
                      File<span style={{ color: 'red' }}> *</span>
                    </InputLabel>
                    <Select
                      labelId="file-select-label"
                      label="File"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                          Upload
                        </Button>
                      </label>
                      <input accept="image/*" id="icon-button-file"
                        type="file" style={{ display: 'none' }} />
                      <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture"
                          component="span">
                        </IconButton>
                      </label>

                    </Select>
                  </FormControl>

                ) : col.accessor === 'attributes.attri' && col.Header === 'All Attri' ? (
                  <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor} required>
                    <InputLabel id="all-attri-select-label">
                      All Attributes<span style={{ color: 'red' }}> *</span>
                    </InputLabel>
                    <Select
                      labelId="all-attri-select-label"
                      label="All Attributes"
                      name={col.accessor}
                      value={formData[col.accessor] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={"Attribute1"}>
                        Logo Image
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Attribute2"}>
                        Color Primary
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Attribute3"}>
                        Location IQ Token
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Attribute4"}>
                        Color Secondary
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Attribute4"}>
                        Show Direction
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Attribute4"}>
                        Sound Events
                        <div>
                          <TextField
                            placeholder="Enter details"
                            size="small"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      </MenuItem>

                      <FormGroup sx={{ marginTop: '10px' }}>
      <FormControlLabel
        control={
          <Checkbox
            name="showMapOnSelection"
            checked={checkboxState.showMapOnSelection}
            onChange={handleCheckboxChange}
          />
        }
        label="Show Map on Selection"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="showGeofences"
            checked={checkboxState.showGeofences}
            onChange={handleCheckboxChange}
          />
        }
        label="Show Geofences"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="darkMode"
            checked={checkboxState.darkMode}
            onChange={handleCheckboxChange}
          />
        }
        label="Dark Mode"
      />
    </FormGroup>

                      <MenuItem value="">
                        <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
                          Add
                        </Button>
                      </MenuItem>
                    

                    {isInputVisible && (
                      <>
                        <TextField
                          id="contained-input-file"
                          variant="outlined"
                          placeholder="Enter file path or name"
                          value={inputValue}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            {/* Optional icon inside the button */}
                          </IconButton>
                        </label>
                        <Button variant="contained" color="secondary" onClick={handleSaveButtonClick}>
                          Save
                        </Button>
                        
                      </>
                    )}

                    {savedValue && (
                      <Box mt={2}>
                        <strong>Saved Value:</strong> {savedValue}
                      </Box>
                    )}


                  </Select>
                  </FormControl>

          ) : (
          <TextField
            key={col.accessor}
            label={`${col.Header} *`}
            variant="outlined"
            name={col.accessor}
            value={formData[col.accessor] || ""}
            onChange={handleInputChange}
            sx={{ marginBottom: "10px" }}
            fullWidth
            required
          />
          )
              ))}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={importModalOpen} onClose={() => setImportModalOpen(false)}>
        <Box sx={style}>
          <h2>Import Data</h2>
          <input type="file" onChange={handleFileUpload} />
          {importData.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setFilteredRows([
                  ...filteredRows,
                  ...importData.map((row) => ({ ...row, isSelected: false })),
                ])
              }
              sx={{ marginTop: "10px" }}
            >
              Import
            </Button>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          Please select a row to edit!
        </Alert>
      </Snackbar>
    </div >
    </>
  );
}