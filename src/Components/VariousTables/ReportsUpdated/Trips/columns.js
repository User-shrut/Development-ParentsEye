// export const COLUMNS = () => [
//   {
//     Header: 'Device ID',
//     accessor: 'deviceId',
//   },
//   {
//     Header:'type',
    
//   }
// ];
// export const COLUMNS = () => [
//   {
//     Header: 'ID',
//     accessor: 'id',
//   },
//   {
//     Header: 'Device ID',
//     accessor: 'deviceId',
//   },
//   {
//     Header: 'Protocol',
//     accessor: 'protocol',
//   },
//   {
//     Header: 'Server Time',
//     accessor: 'serverTime',
//   },
//   {
//     Header: 'Device Time',
//     accessor: 'deviceTime',
//   },
//   {
//     Header: 'Fix Time',
//     accessor: 'fixTime',
//   },
//   {
//     Header: 'Outdated',
//     accessor: 'outdated',
//   },
//   {
//     Header: 'Valid',
//     accessor: 'valid',
//   },
//   {
//     Header: 'Latitude',
//     accessor: 'latitude',
//   },
//   {
//     Header: 'Longitude',
//     accessor: 'longitude',
//   },
//   {
//     Header: 'Altitude',
//     accessor: 'altitude',
//   },
//   {
//     Header: 'Speed',
//     accessor: 'speed',
//   },
//   {
//     Header: 'Course',
//     accessor: 'course',
//   },
//   {
//     Header: 'Address',
//     accessor: 'address',
//   },
//   {
//     Header: 'Accuracy',
//     accessor: 'accuracy',
//   },
//   {
//     Header: 'Network Radio Type',
//     accessor: row => row.network.radioType,
//   },
//   {
//     Header: 'Network Consider IP',
//     accessor: row => row.network.considerIp,
//   },
//   {
//     Header: 'Geofence IDs',
//     accessor: row => row.geofenceIds.join(', '),
//   },
//   {
//     Header: 'Satellite',
//     accessor: 'attributes.sat',
//   },
//   {
//     Header: 'Ignition',
//     accessor: 'attributes.ignition',
//   },
//   {
//     Header: 'Event',
//     accessor: 'attributes.event',
//   },
//   {
//     Header: 'Archive',
//     accessor: 'attributes.archive',
//   },
//   {
//     Header: 'Odometer',
//     accessor: 'attributes.odometer',
//   },
//   {
//     Header: 'Distance',
//     accessor: 'attributes.distance',
//   },
//   {
//     Header: 'Total Distance',
//     accessor: 'attributes.totalDistance',
//   },
//   {
//     Header: 'Motion',
//     accessor: 'attributes.motion',
//   },
//   {
//     Header: 'Charge',
//     accessor: 'attributes.charge',
//   },
//   {
//     Header: 'Hours',
//     accessor: 'attributes.hours',
//   },
// ];


export const COLUMNS = () => [
  {
    Header: 'Device ID',
    accessor: 'deviceId',
  },
  {
    Header: 'Device Name',
    accessor: 'deviceName',
  },
  {
    Header: 'Distance (km)',
    accessor: 'distance',
    Cell: ({ value }) => {
      const distanceInKm = value / 1000;
      // return distanceInKm > 500 ? 0 : distanceInKm.toFixed(2);
      return distanceInKm.toFixed(2);
    },
  },
  // {
  //   Header: 'Average Speed (mph)',
  //   accessor: row => `${row.averageSpeed.toFixed(2)} mph`,
  // },
  // {
  //   Header: 'Max Speed (mph)',
  //   accessor: row => `${row.maxSpeed.toFixed(2)} mph`,
  // },
  // {
  //   Header: 'Spent Fuel (liters)',
  //   accessor: 'spentFuel',
  // },
  // {
  //   Header: 'Start Odometer (mi)',
  //   accessor: row => `${row.startOdometer.toFixed(2)} mi`,
  // },
  // {
  //   Header: 'End Odometer (mi)',
  //   accessor: row => `${row.endOdometer.toFixed(2)} mi`,
  // },
  // {
  //   Header: 'Start Time',
  //   accessor: row => new Date(row.startTime).toLocaleString(),
  // },
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
  // {
  //   Header: 'End Time',
  //   accessor: row => new Date(row.endTime).toLocaleString(),
  // },
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
  {
    Header: 'Start Position ID',
    accessor: 'startPositionId',
  },
  {
    Header: 'End Position ID',
    accessor: 'endPositionId',
  },
  // {
  //   Header: 'Start Latitude',
  //   accessor: row => row.startLat.toFixed(6),
  // },
  // {
  //   Header: 'Start Longitude',
  //   accessor: row => row.startLon.toFixed(6),
  // },
  // {
  //   Header: 'End Latitude',
  //   accessor: row => row.endLat.toFixed(6),
  // },
  // {
  //   Header: 'End Longitude',
  //   accessor: row => row.endLon.toFixed(6),
  // },
  // {
  //   Header: 'Start Address',
  //   accessor: 'startAddress',
  // },
  // {
  //   Header: 'End Address',
  //   accessor: 'endAddress',
  // },
  {
    Header: 'Duration (ms)',
    accessor: 'duration',
  },
  // {
  //   Header: 'Driver Unique ID',
  //   accessor: 'driverUniqueId',
  // },
  // {
  //   Header: 'Driver Name',
  //   accessor: 'driverName',
  // },
];
