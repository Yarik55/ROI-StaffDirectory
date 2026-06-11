import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { STAFF } from './data/staffData';

import StaffListScreen    from './screens/StaffListScreen';
import StaffProfileScreen from './screens/StaffProfileScreen';
import AddEditStaffScreen from './screens/AddEditStaffScreen';

const Stack = createStackNavigator();

export default function App() {
  // Staff list lives HERE at the top level
  // All screens share this same list
  const [staffList, setStaffList] = useState(STAFF);

  const handleAddStaff = (newPerson) => {
    setStaffList((prev) => [...prev, newPerson]);
  };

  const handleUpdateStaff = (updatedPerson) => {
    setStaffList((prev) =>
      prev.map((s) => s.id === updatedPerson.id ? updatedPerson : s)
    );
  };

  const handleDeleteStaff = (personId) => {
    setStaffList((prev) => prev.filter((s) => s.id !== personId));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StaffList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="StaffList">
          {(props) => (
            <StaffListScreen
              {...props}
              staffList={staffList}
              onAddStaff={handleAddStaff}
            />
          )}
        </Stack.Screen>

<Stack.Screen name="StaffProfile">
          {(props) => (
            <StaffProfileScreen
              {...props}
              onUpdateStaff={handleUpdateStaff}
              onDeleteStaff={handleDeleteStaff}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddEditStaff">
          {(props) => (
            <AddEditStaffScreen
              {...props}
              onAddStaff={handleAddStaff}
              onUpdateStaff={handleUpdateStaff}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
