// App.js
// Root component: manages global staff state and navigation stack.
// Three screens: StaffList -> StaffProfile -> AddEditStaff

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { INITIAL_STAFF } from './data/staffData';
import StaffListScreen    from './screens/StaffListScreen';
import StaffProfileScreen from './screens/StaffProfileScreen';
import AddEditStaffScreen from './screens/AddEditStaffScreen';

const Stack = createStackNavigator();

export default function App() {
  const [staffList, setStaffList] = useState(INITIAL_STAFF);

  const handleAdd    = (p)  => setStaffList((prev) => [...prev, p]);
  const handleUpdate = (p)  => setStaffList((prev) => prev.map((s) => s.id === p.id ? p : s));
  const handleDelete = (id) => setStaffList((prev) => prev.filter((s) => s.id !== id));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StaffList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StaffList">
          {(props) => <StaffListScreen {...props} staffList={staffList} />}
        </Stack.Screen>
        <Stack.Screen name="StaffProfile">
          {(props) => <StaffProfileScreen {...props} onDeleteStaff={handleDelete} />}
        </Stack.Screen>
        <Stack.Screen name="AddEditStaff">
          {(props) => (
            <AddEditStaffScreen {...props} onAddStaff={handleAdd} onUpdateStaff={handleUpdate} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
