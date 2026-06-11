import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOW } from '../constants/theme';
import { getDepartmentName, getInitials } from '../data/staffData';

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  </View>
);

const StaffProfileScreen = ({ navigation, route, onUpdateStaff, onDeleteStaff }) => {
  const { staff: initialStaff } = route.params;
  const [staff, setStaff] = useState(initialStaff);

  const departmentName = getDepartmentName(staff.departmentId);
  const initials = getInitials(staff.name);

  const handleEdit = () => {
    navigation.navigate('AddEditStaff', {
      mode: 'edit',
      staff: staff,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Delete Staff Member',
      `Are you sure you want to delete ${staff.name}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDeleteStaff) onDeleteStaff(staff.id);
            navigation.navigate('StaffList');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('StaffList')}
        >
          <Text style={styles.headerButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Staff Profile</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleEdit}>
          <Text style={styles.headerButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileBanner}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{staff.name}</Text>
          <View style={styles.deptBadge}>
            <Text style={styles.deptBadgeText}>{departmentName}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <InfoRow icon="📞" label="Phone" value={staff.phone} />
          <InfoRow icon="✉️" label="Email" value={staff.email} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address</Text>
          <InfoRow icon="🏠" label="Street" value={staff.address.street} />
          <InfoRow icon="📍" label="City / State" value={`${staff.address.city}, ${staff.address.state}`} />
          <InfoRow icon="🗺️" label="Postcode" value={staff.address.zip} />
          <InfoRow icon="🌏" label="Country" value={staff.address.country} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Department</Text>
          <InfoRow icon="🏢" label="Department" value={departmentName} />
        </View>

        {/* Edit button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>✏️  Edit Profile</Text>
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>🗑️  Delete Staff Member</Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
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
  headerButton: {
    padding: SPACING.xs,
    minWidth: 50,
  },
  headerButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.body,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: FONTS.sizes.subheading,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  profileBanner: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  name: {
    fontSize: FONTS.sizes.heading1,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  deptBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  deptBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    ...SHADOW,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.small,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  infoIcon: {
    fontSize: 16,
    width: 28,
    paddingTop: 1,
  },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.grey,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONTS.sizes.body,
    color: COLORS.charcoal,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    ...SHADOW,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.subheading,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.error,
    ...SHADOW,
  },
  deleteButtonText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.subheading,
    fontWeight: 'bold',
  },
});

export default StaffProfileScreen;
