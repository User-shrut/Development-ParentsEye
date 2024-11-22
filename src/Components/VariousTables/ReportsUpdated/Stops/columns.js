


export const COLUMNS = () => [
  {
    Header: 'Device ID',
    accessor: 'deviceId',
  },
  {
    Header: 'Device Name',
    accessor: 'deviceName',
  },
  // {
  //   Header: 'Distance (mi)',
  //   accessor: 'distance',
  // },
//   {
//     Header: 'Average Speed (mph)',
//     // accessor: row => `${row.averageSpeed.toFixed(2)} mph`,
// accessor:'averageSpeed',
//   },
  // {
  //   Header: 'Max Speed (mph)',
  //   accessor:'averageSpeed',
  //   // accessor: row => `${row.maxSpeed.toFixed(2)} mph`,
  // },
  {
    Header: 'Spent Fuel (liters)',
    accessor: 'spentFuel',
  },
  {
    Header: 'Start Odometer (mi)',
    accessor: 'startOdometer',
  },
  {
    Header: 'End Odometer (mi)',
    accessor: 'endOdometer',
  },
  {
    Header: 'Start Time',
    accessor: 'startTime',
    Cell: ({ value }) => {
      if (!value) {
        return "N/A"; // Return a placeholder if value is null/undefined
      }
  
      // Try parsing the date in the format 'DD/MM/YYYY, HH:MM:SS AM/PM'
      const [datePart, timePart] = value.split(', '); // Split date and time
      const [day, month, year] = datePart.split('/'); // Split day, month, year
      const formattedDate = `${month}/${day}/${year} ${timePart}`; // Rearrange to MM/DD/YYYY format
  
      const date = new Date(formattedDate); // Convert the rearranged value to a Date object
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return "Invalid Date"; // Return a fallback if the date is invalid
      }
  
      date.setMinutes(date.getMinutes()); // Add 5 hours and 30 minutes (330 minutes)
      return date.toLocaleString('en-IN', { hour12: true }); // Format the date for Indian locale (12-hour format)
    },
  },
  
  {
    Header: 'End Time',
    accessor: 'endTime',
    Cell: ({ value }) => {
      if (!value) {
        return "N/A"; // Return a placeholder if value is null/undefined
      }
  
      // Try parsing the date in the format 'DD/MM/YYYY, HH:MM:SS AM/PM'
      const [datePart, timePart] = value.split(', '); // Split date and time
      const [day, month, year] = datePart.split('/'); // Split day, month, year
      const formattedDate = `${month}/${day}/${year} ${timePart}`; // Rearrange to MM/DD/YYYY format
  
      const date = new Date(formattedDate); // Convert the rearranged value to a Date object
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return "Invalid Date"; // Return a fallback if the date is invalid
      }
  
      date.setMinutes(date.getMinutes()); // Add 5 hours and 30 minutes (330 minutes)
      return date.toLocaleString('en-IN', { hour12: true }); // Format the date for Indian locale (12-hour format)
    },
  },
  // {
  //   Header: 'Position ID',
  //   accessor: 'positionId',
  // },
  {
    Header: 'Latitude',
    // accessor: row => row.latitude.toFixed(6),
    accessor:'latitude',
  },
  {
    Header: 'Longitude',
    // accessor: row => row.longitude.toFixed(6),
    accessor:'longitude',
  },
  // {
  //   Header: 'Address',
  //   accessor: 'address',
  // },
  {
    Header: 'Duration (ms)',
    accessor: 'duration',
  },
  // {
  //   Header: 'Engine Hours',
  //   accessor: 'engineHours',
  // },
  {
    Header: 'Engine Hours (Minutes)',
    accessor: 'engineHours',
    Cell: ({ value }) => (value / (1000 * 60)).toFixed(2), // Convert to minutes
  },
];
