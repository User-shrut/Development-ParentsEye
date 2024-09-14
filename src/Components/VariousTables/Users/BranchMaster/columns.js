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
    Header: 'School Name',
    accessor: 'schoolName',
  },
  {
    Header: 'Branch Name',
    accessor: 'branchName',
  },
  {
    Header: 'User Name',
    accessor: 'username',
  },
  {
    Header: 'Phone',
    accessor: 'schoolMobile',
    Cell: ({ value }) => (value ? value.toString() : 'N/A'),
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Password',
    accessor: 'password',
  },
  {
    Header: 'Specific Header',
    accessor: 'specificAccessor',
  },
  
];
