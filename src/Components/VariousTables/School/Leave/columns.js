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
    Header: 'Child Name',
    accessor: 'childName',
  },
  
  {
    Header: 'parent Name',
    accessor: 'parentName',
  },
  {
    Header: 'email',
    accessor: 'email',
  },
  {
    Header: 'vehicle Id',
    accessor: 'deviceId',
  },
  {
    Header: 'Request Type',
    accessor: 'requestType',
  },
  {
    Header: 'Leave from',
    accessor: 'startDate',
  },
  {
    Header: 'Leave To',
    accessor: 'endDate',
  },
  {
    Header: ' school Name',
    accessor: 'schoolName',
  },
  {
    Header: 'branch Name',
    accessor: 'branchName',
  },
  {
    Header: 'Request Date',
    accessor: 'requestDate',
  }
]