
export const COLUMNS = () => [
  {
    Header: '',
    accessor: 'select',
    Cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.original.isSelected}
        onChange={() => row.original.handleRowSelect(row.index)}
      />
    ),
  },
  
  {
    Header: 'Driver Name',
    accessor: 'driverName',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone_no',
  },
  {
    Header: 'password',
    accessor: 'password',
  },
 
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Licence Number',
    accessor: 'licenseNumber',
  },
  {
    Header: 'FCM Token',
    accessor: 'fcmToken',
  },
  {
    Header: 'School Name',
    accessor: 'schoolName',
  },
  {
    Header: 'Branch Name',
    accessor: 'branchName',
  },
  {
    Header: 'Bus Name',
    accessor: 'busName',
  },
  {
    Header: 'Device Id',
    accessor: 'deviceId',
  },
  {
    Header: 'Registration Date',
    accessor: 'formattedRegistrationDate',
    Cell: ({ value }) => {
      const [day, month, year] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY or your locale's format
    },
  },
]