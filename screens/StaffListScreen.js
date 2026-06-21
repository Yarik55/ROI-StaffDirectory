// screens/StaffListScreen.js
// Main screen: scrollable, searchable list of all ROI staff members.
// Uses useFocusEffect to refresh the filtered list every time
// the screen comes into focus (e.g. after adding or editing a member).

import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import StaffCard from '../components/StaffCard';
import SearchBar from '../components/SearchBar';

const StaffListScreen = ({ navigation, staffList }) => {
  const [searchText,    setSearchText]    = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);

  // Re-filter whenever the screen is focused or search text changes
  useFocusEffect(
    useCallback(() => {
      const list = staffList || [];
      if (!searchText.trim()) {
        setFilteredStaff(list);
      } else {
        const lower = searchText.toLowerCase();
        setFilteredStaff(
          list.filter(
            (p) =>
              (p.name  || '').toLowerCase().includes(lower) ||
              (p.phone || '').includes(lower)
          )
        );
      }
    }, [staffList, searchText])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Staff Directory</Text>
          <Text style={styles.subtitle}>
            {filteredStaff.length} of {(staffList || []).length} staff members
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddEditStaff', { mode: 'add', staff: null })}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onClear={() => setSearchText('')}
        placeholder="Search by name or phone..."
      />

      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StaffCard
            staff={item}
            onPress={() => navigation.navigate('StaffProfile', { staff: item })}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyText}>No staff found</Text>
            <Text style={styles.emptySub}>
              {searchText ? 'Try a different search' : 'Tap + to add staff'}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: SPACING.sm, paddingBottom: SPACING.xl, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: COLORS.background },
  header:     { backgroundColor: COLORS.primary, paddingTop: SPACING.xl, paddingBottom: SPACING.md,
                paddingHorizontal: SPACING.md, flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center' },
  title:      { fontSize: FONTS.sizes.heading1, fontWeight: 'bold', color: COLORS.white },
  subtitle:   { fontSize: FONTS.sizes.small, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  addBtn:     { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22,
                width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: COLORS.white, fontSize: 28, lineHeight: 32 },
  empty:      { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: SPACING.xxl },
  emptyIcon:  { fontSize: 48, marginBottom: SPACING.md },
  emptyText:  { fontSize: FONTS.sizes.heading2, fontWeight: 'bold', color: COLORS.charcoal },
  emptySub:   { fontSize: FONTS.sizes.body, color: COLORS.grey, marginTop: SPACING.xs },
});

export default StaffListScreen;
