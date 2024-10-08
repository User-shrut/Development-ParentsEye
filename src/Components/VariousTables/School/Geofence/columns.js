export const COLUMNS = () => [
  // {
  //   Header: 'Select',
  //   accessor: 'select',
  //   Cell: ({ row }) => (
  //     <input
  //       type="checkbox"
  //       checked={row.original.isSelected}
  //       onChange={() => row.original.handleRowSelect(row.index)}
  //     />
  //   ),
  // },
  {
    Header: 'Device ID',
    accessor: 'deviceId', // Each geofence is associated with a deviceId
  },
  {
    Header: 'Geofence Name',
    accessor: 'name', // The name of the geofence (e.g., "Krida Square")
  },
  {
    Header: 'Geofence Area',
    accessor: 'area', // Area in Circle or Polygon format
    Cell: ({ value }) => {
      // Display area differently based on if it's a circle or polygon
      if (value.startsWith('Circle')) {
        return `Circle - ${value}`;
      } else if (value.startsWith('Polygon')) {
        return `Polygon - ${value}`;
      } else {
        return value;
      }
    },
  },
  // {
  //   Header: 'Crossed',
  //   accessor: 'isCrossed', // Whether the geofence has been crossed
  //   Cell: ({ value }) => (value ? 'Yes' : 'No'),
  // },
  {
    Header: 'Geofence ID',
    accessor: '_id', // Unique ID of the geofence
  },
 
];
