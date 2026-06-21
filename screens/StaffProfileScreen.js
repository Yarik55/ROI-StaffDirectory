// screens/StaffProfileScreen.js
// Displays full contact details for a single staff member.
// Provides Edit (navigate to AddEditStaff) and Delete (with confirmation alert) actions.

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOW } from '../constants/theme';
import { getDepartmentName, getInitials } from '../data/staffData';

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  </View>
);

const StaffProfileScreen = ({ navigation, route, onDeleteStaff }) => {
  if (!route.params || !route.params.staff) {
    return (
      <View style={styles.errBox}>
        <Text>Staff not found.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StaffList')}>
          <Text style={{ color: COLORS.primary, marginTop: 8 }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { staff } = route.params;
  const dept      = getDepartmentName(staff.departmentId);
  const initials  = getInitials(staff.name);

  const handleEdit   = () => navigation.navigate('AddEditStaff', { mode: 'edit', staff });
  const handleDelete = () => {
    Alert.alert(
      'Delete Staff Member',
      `Delete ${staff.name}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          if (onDeleteStaff) onDeleteStaff(staff.id);
          navigation.navigate('StaffList');
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('StaffList')}>
          <Text style={styles.headerBtn}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Staff Profile</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.headerBtn}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
          <Text style={styles.name}>{staff.name}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>{dept}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Contact Information</Text>
          <InfoRow icon="📞" label="Phone" value={staff.phone} />
          <InfoRow icon="✉️"  label="Email" value={staff.email} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Address</Text>
          <InfoRow icon="🏠" label="Street"       value={staff.address.street} />
          <InfoRow icon="📍" label="City / State" value={`${staff.address.city}, ${staff.address.state}`} />
          <InfoRow icon="🗺️"  label="Postcode"     value={staff.address.zip} />
          <InfoRow icon="🌏" label="Country"       value={staff.address.country} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Department</Text>
          <InfoRow icon="🏢" label="Department" value={dept} />
        </View>

        <TouchableOpacity style={styles.editBtn}   onPress={handleEdit}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Delete Staff Member</Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: COLORS.background },
  errBox:        { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header:        { backgroundColor: COLORS.primary, paddingTop: SPACING.xl, paddingBottom: SPACING.md,
                   paddingHorizontal: SPACING.md, flexDirection: 'row',
                   justifyContent: 'space-between', alignItems: 'center' },
  headerBtn:     { color: COLORS.white, fontSize: FONTS.sizes.body, fontWeight: 'bold', minWidth: 50 },
  headerTitle:   { color: COLORS.white, fontSize: FONTS.sizes.subheading, fontWeight: 'bold' },
  banner:        { backgroundColor: COLORS.primary, alignItems: 'center',
                   paddingBottom: SPACING.xl, paddingTop: SPACING.sm },
  avatar:        { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.white,
                   justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm,
                   borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  avatarText:    { fontSize: FONTS.sizes.title, fontWeight: 'bold', color: COLORS.primary },
  name:          { fontSize: FONTS.sizes.heading1, fontWeight: 'bold', color: COLORS.white, marginBottom: SPACING.sm },
  badge:         { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.md,
                   paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.round },
  badgeText:     { color: COLORS.white, fontSize: FONTS.sizes.small },
  card:          { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.medium,
                   padding: SPACING.md, marginHorizontal: SPACING.md, marginTop: SPACING.md,
                   ...SHADOW },
  section:       { fontSize: FONTS.sizes.small, fontWeight: 'bold', color: COLORS.primary,
                   marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoRow:       { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: SPACING.sm,
                   borderBottomWidth: 1, borderBottomColor: COLORS.background },
  infoIcon:      { fontSize: 16, width: 28, paddingTop: 1 },
  infoLabel:     { fontSize: FONTS.sizes.small, color: COLORS.grey, marginBottom: 2 },
  infoValue:     { fontSize: FONTS.sizes.body, color: COLORS.charcoal },
  editBtn:       { backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center',
                   marginHorizontal: SPACING.md, marginTop: SPACING.lg, paddingVertical: SPACING.md,
                   borderRadius: BORDER_RADIUS.medium, ...SHADOW },
  editBtnText:   { color: COLORS.white, fontSize: FONTS.sizes.subheading, fontWeight: 'bold' },
  deleteBtn:     { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center',
                   marginHorizontal: SPACING.md, marginTop: SPACING.sm, paddingVertical: SPACING.md,
                   borderRadius: BORDER_RADIUS.medium, borderWidth: 1.5, borderColor: COLORS.error },
  deleteBtnText: { color: COLORS.error, fontSize: FONTS.sizes.subheading, fontWeight: 'bold' },
});

export default StaffProfileScreen;
