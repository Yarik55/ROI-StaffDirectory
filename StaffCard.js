// A reusable card that displays one staff member in the list.
// We define it once here and use <StaffCard /> anywhere in the app.

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOW } from '../constants/theme';
import { getDepartmentName, getInitials } from '../data/staffData';

const StaffCard = ({ staff, onPress }) => {
  const departmentName = getDepartmentName(staff.departmentId);
  const initials = getInitials(staff.name);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Avatar circle with initials */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      {/* Name, department, phone */}
      <View style={styles.info}>
        <Text style={styles.name}>{staff.name}</Text>
        <Text style={styles.department} numberOfLines={1}>
          {departmentName}
        </Text>
        <Text style={styles.phone}>{staff.phone}</Text>
      </View>

      {/* Arrow hint */}
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    ...SHADOW,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.subheading,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.sizes.subheading,
    fontWeight: 'bold',
    color: COLORS.charcoal,
    marginBottom: 2,
  },
  department: {
    fontSize: FONTS.sizes.small,
    color: COLORS.grey,
    marginBottom: 4,
  },
  phone: {
    fontSize: FONTS.sizes.small,
    color: COLORS.grey,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.lightGrey,
  },
});

export default StaffCard;
