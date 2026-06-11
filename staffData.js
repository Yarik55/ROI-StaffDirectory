// Sample data matching the client brief's test data (Table 1 & 2)
// In Phase 1 we use this directly.
// In Phase 2 this gets replaced by live PostgreSQL data via API.

// DEPARTMENTS (from Table 2 in the brief)
export const DEPARTMENTS = [
  { id: 0, name: 'General' },
  { id: 1, name: 'Information Communications Technology' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Human Resources' },
];

// STAFF (from Table 1 in the brief)
export const STAFF = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    name: 'John Smith',
    phone: '02 9988 2211',
    departmentId: 1,
    address: {
      street: '1 Code Lane',
      city: 'Javaville',
      state: 'NSW',
      zip: '0100',
      country: 'Australia',
    },
    email: 'john.smith@redinnovations.com.au',
    avatar: null,
  },
  {
    id: 2,
    firstName: 'Sue',
    lastName: 'White',
    name: 'Sue White',
    phone: '03 8899 2255',
    departmentId: 2,
    address: {
      street: '16 Bit Way',
      city: 'Byte Cove',
      state: 'QLD',
      zip: '1101',
      country: 'Australia',
    },
    email: 'sue.white@redinnovations.com.au',
    avatar: null,
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: "O'Bits",
    name: "Bob O'Bits",
    phone: '05 7788 2255',
    departmentId: 3,
    address: {
      street: '8 Silicon Road',
      city: 'Cloud Hills',
      state: 'VIC',
      zip: '1001',
      country: 'Australia',
    },
    email: 'bob.obits@redinnovations.com.au',
    avatar: null,
  },
  {
    id: 4,
    firstName: 'Mary',
    lastName: 'Blue',
    name: 'Mary Blue',
    phone: '06 4455 9988',
    departmentId: 2,
    address: {
      street: '4 Processor Boulevard',
      city: 'Appletson',
      state: 'NT',
      zip: '1010',
      country: 'Australia',
    },
    email: 'mary.blue@redinnovations.com.au',
    avatar: null,
  },
  {
    id: 5,
    firstName: 'Mick',
    lastName: 'Green',
    name: 'Mick Green',
    phone: '02 9988 1122',
    departmentId: 3,
    address: {
      street: '700 Bandwidth Street',
      city: 'Bufferland',
      state: 'NSW',
      zip: '0110',
      country: 'Australia',
    },
    email: 'mick.green@redinnovations.com.au',
    avatar: null,
  },
];

// HELPER FUNCTIONS

// Get department name from its ID
// Example: getDepartmentName(1) returns 'Information Communications Technology'
export const getDepartmentName = (departmentId) => {
  const dept = DEPARTMENTS.find((d) => d.id === departmentId);
  return dept ? dept.name : 'Unknown Department';
};

// Get initials from a name for the avatar placeholder
// Example: getInitials('John Smith') returns 'JS'
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Get the next available ID when adding a new staff member
export const getNextId = (staffArray) => {
  if (staffArray.length === 0) return 1;
  return Math.max(...staffArray.map((s) => s.id)) + 1;
};
