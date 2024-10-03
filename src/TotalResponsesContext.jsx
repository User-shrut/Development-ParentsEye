// import React, { createContext, useState } from 'react';

// export const TotalResponsesContext = createContext();

// export const TotalResponsesProvider = ({ children }) => {
//   const [totalResponses, setTotalResponses] = useState(0);

//   return (
//     <TotalResponsesContext.Provider value={{ totalResponses, setTotalResponses }}>
//       {children}
//     </TotalResponsesContext.Provider>
//   );
// };


import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
export const TotalResponsesContext = createContext();

export const TotalResponsesProvider = ({ children }) => {
  const [totalResponses, setTotalResponses] = useState(0);
  const [totalLeaveRequest, settotalLeaveRequest] = useState(0); // Add this line
 const [TotalResponsesPresent,setTotalResponsesPresent]=useState(0);
 const [Drivers,setDrivers]=useState(0);
//  supervisorsdata

const [TotalResponsesSupervisor,setTotalResponsesSupervisor]=useState(0);
//  const[supervisorsdata,setsupervisorsdata]=useState(0);
//  setTotalResponsesLeave
 const [TotalResponsesDrivers,setTotalResponsesDrivers]=useState(0);
 const [TotalResponsesAbsent,setTotalResponsesAbsent]=useState(0);
  const [role , setRole] = useState(1);
 
 
  const fetchpresent = async (startDate = "", endDate = "") => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl =
        role == 1
          ? `${process.env.REACT_APP_SUPER_ADMIN_API}/present-children`
          : role == 2
          ? `${process.env.REACT_APP_SCHOOL_API}/present-children`
          : `${process.env.REACT_APP_BRANCH_API}/present-children`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("fetch data", response.data);

      if (response?.data) {
        const allData = response?.data.data.flatMap((school) =>
          school.branches.flatMap((branch) =>
            Array.isArray(branch.children) && branch.children.length > 0
              ? branch.children
              : []
          )
        );

        // Apply local date filtering if dates are provided
        // const filteredData =
        //   startDate || endDate
        //     ? allData.filter((row) => {
        //         const registrationDate = parseDate(row.formattedDate);
        //         const start = parseDate(startDate);
        //         const end = parseDate(endDate);

        //         return (
        //           (!startDate || registrationDate >= start) &&
        //           (!endDate || registrationDate <= end)
        //         );
        //       })
        //     : allData; // If no date range, use all data
        // const reversedData = filteredData.reverse();
        // // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);
        // setFilteredRows(
        //   reversedData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        setTotalResponsesPresent(allData.length);
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);

        // setFilteredRows(
        //   filteredData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // setTotalResponses(filteredData.length);
      } else {
        console.error("Expected an array but got:", response.data.children);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };


  const fetchDataDrivers = async (startDate = "", endDate = "") => {
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

       

        setTotalResponsesDrivers(allData.length);
       
      } else {
        console.error("Expected an array but got:", response.data.drivers);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataAbsent = async (startDate = "", endDate = "") => {
    // setLoading(true);
    try {
      let response;
      if (role == 1) {
        const token = localStorage.getItem("token");
        response = await axios.get(
          `${process.env.REACT_APP_SUPER_ADMIN_API}/read-children`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 2) {
        const token = localStorage.getItem("token");
        response = await axios.get(
          `${process.env.REACT_APP_SCHOOL_API}/read-children`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 3) {
        const token = localStorage.getItem("token");
        response = await axios.get(
          `${process.env.REACT_APP_BRANCH_API}/read-children`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("fetch data", response.data); // Log the entire response data
      // fetchgeofencepoint();
      if (response?.data) {
        const allData =
          role == 1
            ? response.data.data.flatMap((school) =>
                school.branches.flatMap((branch) =>
                  Array.isArray(branch.children) && branch.children.length > 0
                    ? branch.children.map((child) => ({
                        ...child, // Spread child object to retain all existing properties
                        schoolName: school.schoolName,
                        branchName: branch.branchName,
                      }))
                    : []
                )
              )
            : role == 2
            ? response?.data.branches.flatMap((branch) =>
                Array.isArray(branch.children) && branch.children.length > 0
                  ? branch.children
                  : []
              )
            : response?.data.data;

        console.log(allData);

       
        // const filteredData =
        //   startDate || endDate
        //     ? allData.filter((row) => {
        //         const registrationDate = parseDate(
        //           row.formattedRegistrationDate
        //         );
        //         const start = parseDate(startDate);
        //         const end = parseDate(endDate);

        //         return (
        //           (!startDate || registrationDate >= start) &&
        //           (!endDate || registrationDate <= end)
        //         );
        //       })
        //     : allData; // If no date range, use all data
        // const reversedData = filteredData.reverse();
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);
        // setFilteredRows(
        //   reversedData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        setTotalResponses(allData.length);
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);

        // setFilteredRows(
        //   filteredData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // setTotalResponses(filteredData.length);
      } else {
        console.error("Expected an array but got:", response.data.children);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };
  const fetchleaves = async (startDate = "", endDate = "") => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let response;

      if (role == 1) {
        response = await axios.get(
          `${process.env.REACT_APP_SUPER_ADMIN_API}/pending-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 2) {
        response = await axios.get(
          `${process.env.REACT_APP_SCHOOL_API}/pending-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else{
        response = await axios.get(
          `${process.env.REACT_APP_BRANCH_API}/pending-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("fetch data", response.data); // Log the entire response data

      if (response.data) {
        const allData =
          role === 1
            ? response?.data.data.flatMap((school) =>
                school.branches.flatMap((branch) =>
                  Array.isArray(branch.requests) && branch.requests.length > 0
                    ? branch.requests
                    : []
                )
              )
            : role === 2 ? response.data.branches.requests : response.data.requests;

        console.log(allData);

        // Apply local date filtering if dates are provided
        // const filteredData =
        //   startDate || endDate
        //     ? allData.filter((row) => {
        //         const registrationDate = parseDate(
        //           row.requestDate
        //         );
        //         const start = parseDate(startDate);
        //         const end = parseDate(endDate);

        //         return (
            //       (!startDate || registrationDate >= start) &&
            //       (!endDate || registrationDate <= end)
            //     );
            //   })
            // : allData; // If no date range, use all data
        // const reversedData = filteredData.reverse();
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);
        // setFilteredRows(
        //   reversedData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        settotalLeaveRequest(allData.length);
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);

        // setFilteredRows(filteredData.map((row) => ({ ...row, isSelected: false })));
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // settotalLeaveRequest(filteredData.length);
      } else {
        console.error("Expected an array but got:", response.data.children);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  const fetchData = async (startDate = "", endDate = "") => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl =
        role == 1
          ? `${process.env.REACT_APP_SUPER_ADMIN_API}/absent-children`
          : role == 2
          ? `${process.env.REACT_APP_SCHOOL_API}/absent-children`
          : `${process.env.REACT_APP_BRANCH_API}/absent-children`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("fetch data", response.data); // Log the entire response data

      if (response?.data) {
        const allData = response?.data.data.flatMap((school) =>
          school.branches.flatMap((branch) =>
            Array.isArray(branch.children) && branch.children.length > 0
              ? branch.children
              : []
          )
        );

        // Apply local date filtering if dates are provided
        // const filteredData =
        //   startDate || endDate
        //     ? allData.filter((row) => {
        //         const registrationDate = parseDate(row.formattedDate);
        //         const start = parseDate(startDate);
        //         const end = parseDate(endDate);

        //         return (
        //           (!startDate || registrationDate >= start) &&
        //           (!endDate || registrationDate <= end)
        //         );
        //       })
        //     : allData; // If no date range, use all data
        // const reversedData = filteredData.reverse();
        // // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);
        // setFilteredRows(
        //   reversedData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        setTotalResponsesAbsent(allData.length);
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);

        // setFilteredRows(
        //   filteredData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // setTotalResponses(filteredData.length);
      } else {
        console.error("Expected an array but got:", response.data.children);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };
  const fetchDataSupervisor = async (startDate = "", endDate = "") => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let response;

      if (role == 1) {
        response = await axios.get(
          `${process.env.REACT_APP_SUPER_ADMIN_API}/read-supervisors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 2) {
        response = await axios.get(
          `${process.env.REACT_APP_SCHOOL_API}/read-supervisors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 3) {
        response = await axios.get(
          `${process.env.REACT_APP_BRANCH_API}/read-supervisors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("fetch data", response.data); // Log the entire response data

      if (response?.data) {
        const allData =
          role == 1
            ? response?.data.data.flatMap((school) =>
                school.branches.flatMap((branch) =>
                  Array.isArray(branch.supervisors) &&
                  branch.supervisors.length > 0
                    ? branch.supervisors
                    : []
                )
              )
            : role == 2
            ? response?.data.branches.flatMap((branch) =>
                Array.isArray(branch.supervisors) &&
                branch.supervisors.length > 0
                  ? branch.supervisors
                  : []
              )
            : response.data.supervisors;

        console.log("supervisirs", allData);
        // Apply local date filtering if dates are provided
        // const filteredData =
        //   startDate || endDate
        //     ? allData.filter((row) => {
        //         const registrationDate = parseDate(
        //           row.formattedRegistrationDate
        //         );
        //         const start = parseDate(startDate);
        //         const end = parseDate(endDate);

        //         return (
        //           (!startDate || registrationDate >= start) &&
        //           (!endDate || registrationDate <= end)
        //         );
        //       })
        //     : allData; // If no date range, use all data
        // const reversedData = filteredData.reverse();
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);
        // setFilteredRows(
        //   reversedData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        setTotalResponsesSupervisor(allData.length);
      } else {
        console.error("Expected an array but got:", response.data.supervisors);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };
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

        setDrivers(allData.length);
        // console.log("hey drivers");
        // console.log("drivers : ", allData);

        // Apply local date filtering if dates are provided
        // const filteredData =
        //   startDate || endDate
        //     ? allData.filter((row) => {
        //         const registrationDate = parseDate(
        //           row.formattedRegistrationDate
        //         );
        //         const start = parseDate(startDate);
        //         const end = parseDate(endDate);

        //         return (
        //           (!startDate || registrationDate >= start) &&
        //           (!endDate || registrationDate <= end)
        //         );
        //       })
        //     : allData; // If no date range, use all data
        // const reversedData = filteredData.reverse();
        // Log the date range and filtered data
        // console.log(`Data fetched between ${startDate} and ${endDate}:`);
        // console.log(filteredData);
        // setFilteredRows(
        //   reversedData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // setTotalResponses(reversedData.length);
        // setFilteredRows(
        //   filteredData.map((row) => ({ ...row, isSelected: false }))
        // );
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // setTotalResponses(filteredData.length);
      } else {
        console.error("Expected an array but got:", response.data.drivers);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };
  useEffect(() => {
    fetchData();
    fetchleaves();
    fetchpresent();
    fetchDataAbsent();
    fetchDataDrivers();
    fetchDataSupervisor();
  }, []);
  return (
    <TotalResponsesContext.Provider value={{ totalResponses,TotalResponsesSupervisor,setTotalResponsesSupervisor, setTotalResponses, totalLeaveRequest, settotalLeaveRequest ,TotalResponsesDrivers,setTotalResponsesDrivers,Drivers,setDrivers,TotalResponsesAbsent,setTotalResponsesAbsent,role , setRole,TotalResponsesPresent,setTotalResponsesPresent }}>
      {children}
    </TotalResponsesContext.Provider>
  );
};
