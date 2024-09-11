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
    Header: 'Distance (mi)',
    accessor: 'distance',
  },
  {
    Header: 'Average Speed (mph)',
    // accessor: row => `${row.averageSpeed.toFixed(2)} mph`,
accessor:'averageSpeed',
  },
  {
    Header: 'Max Speed (mph)',
    accessor:'averageSpeed',
    // accessor: row => `${row.maxSpeed.toFixed(2)} mph`,
  },
  {
    Header: 'Spent Fuel (liters)',
    accessor: 'spentFuel',
  },
  {
    Header: 'Start Odometer (mi)',
    accessor: row => `${row.startOdometer.toFixed(2)} mi`,
  },
  {
    Header: 'End Odometer (mi)',
    accessor: row => `${row.endOdometer.toFixed(2)} mi`,
  },
  {
    Header: 'Start Time',
    accessor: row => new Date(row.startTime).toLocaleString(),
  },
  {
    Header: 'End Time',
    accessor: row => new Date(row.endTime).toLocaleString(),
  },
  {
    Header: 'Position ID',
    accessor: 'positionId',
  },
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
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Duration (ms)',
    accessor: 'duration',
  },
  {
    Header: 'Engine Hours',
    accessor: 'engineHours',
  },
];
