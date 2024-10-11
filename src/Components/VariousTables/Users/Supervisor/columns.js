
export const COLUMNS = () => [
 
  
  {
    Header: 'Supervisor Name',
    accessor: 'supervisorName',
  },
  
  {
    Header: 'Phone Number',
    accessor: 'phone_no',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'password',
    accessor: 'password',
  },
  {
    Header: 'Device Id',
    accessor: 'deviceId',
  },
  {
    Header: 'Bus Name',
    accessor: 'deviceName',
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
    Header: 'Registration Date',
    accessor: 'formattedRegistrationDate',
    Cell: ({ value }) => {
      const [day, month, year] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY or your locale's format
    },
  },
]