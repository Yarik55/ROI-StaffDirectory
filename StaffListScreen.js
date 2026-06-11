import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import StaffCard from '../components/StaffCard';
import SearchBar from '../components/SearchBar';

const StaffListScreen = ({ navigation, staffList, onAddStaff }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredStaff, setFilteredStaff] = useState(staffList);

  // Update filtered list when staffList or search changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredStaff(staffList);
    } else {
      const lower = searchText.toLowerCase();
      setFilteredStaff(
        staffList.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.phone.includes(lower)
        )
      );
    }
  }, [searchText, staffList]);

  const handleSelectStaff = (person) => {
    navigation.navigate('StaffProfile', { staff: person });
  };

  const handleAddStaff = () => {
    navigation.navigate('AddEditStaff', {
      mode: 'add',
      onSave: (newPerson) => {
        onAddStaff(newPerson);
        Alert.alert('✅ Success', `${newPerson.name} has been added.`);
      },
    });
  };

  const renderItem = ({ item }) => (
    <StaffCard
      staff={item}
      onPress={() => handleSelectStaff(item)}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>👥</Text>
      <Text style={styles.emptyText}>No staff found</Text>
      <Text style={styles.emptySubtext}>Try a different search term</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Staff Directory</Text>
          <Text style={styles.headerSubtitle}>
            {filteredStaff.length} of {staffList.length} staff members
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
          <Text style={styles.addButtonText}>+</Text>
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
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONTS.sizes.heading1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.small,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 28,
    lineHeight: 32,
  },
  listContent: {
    paddingVertical: SPACING.sm,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONTS.sizes.heading2,
    fontWeight: 'bold',
    color: COLORS.charcoal,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.body,
    color: COLORS.grey,
    marginTop: SPACING.xs,
  },
});

export default StaffListScreen;
