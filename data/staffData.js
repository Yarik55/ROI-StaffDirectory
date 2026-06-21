// data/staffData.js
// Local data source — ROI sample data from client brief Tables 1 & 2.
// In production this syncs with a remote Supabase database.

export const DEPARTMENTS = [
  { id: 0, name: 'General' },
  { id: 1, name: 'Information Communications Technology' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Human Resources' },
];

export const INITIAL_STAFF = [
  { id: 1, firstName: 'John', lastName: 'Smith', name: 'John Smith',
    phone: '02 9988 2211', email: 'john.smith@roi.com.au', departmentId: 1,
    address: { street: '1 Code Lane', city: 'Javaville', state: 'NSW', zip: '0100', country: 'Australia' } },
  { id: 2, firstName: 'Sue', lastName: 'White', name: 'Sue White',
    phone: '03 8899 2255', email: 'sue.white@roi.com.au', departmentId: 2,
    address: { street: '16 Bit Way', city: 'Byte Cove', state: 'QLD', zip: '1101', country: 'Australia' } },
  { id: 3, firstName: 'Bob', lastName: "O'Bits", name: "Bob O'Bits",
    phone: '05 7788 2255', email: 'bob.obits@roi.com.au', departmentId: 3,
    address: { street: '8 Silicon Road', city: 'Cloud Hills', state: 'VIC', zip: '1001', country: 'Australia' } },
  { id: 4, firstName: 'Mary', lastName: 'Blue', name: 'Mary Blue',
    phone: '06 4455 9988', email: 'mary.blue@roi.com.au', departmentId: 2,
    address: { street: '4 Processor Boulevard', city: 'Appletson', state: 'NT', zip: '1010', country: 'Australia' } },
  { id: 5, firstName: 'Mick', lastName: 'Green', name: 'Mick Green',
    phone: '02 9988 1122', email: 'mick.green@roi.com.au', departmentId: 3,
    address: { street: '700 Bandwidth Street', city: 'Bufferland', state: 'NSW', zip: '0110', country: 'Australia' } },
];

export const getDepartmentName = (id) => {
  const d = DEPARTMENTS.find((d) => d.id === id);
  return d ? d.name : 'Unknown Department';
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
};
