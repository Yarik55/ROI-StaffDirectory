import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOW } from '../constants/theme';
import { DEPARTMENTS, STAFF, getNextId } from '../data/staffData';

const FormField = ({ label, value, onChangeText, placeholder, keyboardType, error }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.lightGrey}
      keyboardType={keyboardType || 'default'}
      autoCorrect={false}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const AddEditStaffScreen = ({ navigation, route, onAddStaff, onUpdateStaff }) => {
  const { mode, staff: existingStaff } = route.params;
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    firstName:    isEditMode ? existingStaff.firstName    : '',
    lastName:     isEditMode ? existingStaff.lastName     : '',
    phone:        isEditMode ? existingStaff.phone        : '',
    email:        isEditMode ? existingStaff.email        : '',
    departmentId: isEditMode ? existingStaff.departmentId : 0,
    address: {
      street:  isEditMode ? existingStaff.address.street  : '',
      city:    isEditMode ? existingStaff.address.city    : '',
      state:   isEditMode ? existingStaff.address.state   : '',
      zip:     isEditMode ? existingStaff.address.zip     : '',
      country: isEditMode ? existingStaff.address.country : 'Australia',
    },
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const updateAddress = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    if (errors[`address.${field}`]) {
      setErrors((prev) => ({ ...prev, [`address.${field}`]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim())
      newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim())
      newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone))
      newErrors.phone = 'Enter a valid phone number';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email address';
    if (!formData.address.street.trim())
      newErrors['address.street'] = 'Street address is required';
    if (!formData.address.city.trim())
      newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim())
      newErrors['address.state'] = 'State is required';
    if (!formData.address.zip.trim())
      newErrors['address.zip'] = 'Postcode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      Alert.alert(
        '⚠️ Please fix the errors',
        'Some required fields are missing or incorrect.',
        [{ text: 'OK' }]
      );
      return;
    }

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const savedPerson = {
      id:           isEditMode ? existingStaff.id : getNextId(STAFF),
      firstName:    formData.firstName.trim(),
      lastName:     formData.lastName.trim(),
      name:         fullName,
      phone:        formData.phone.trim(),
      email:        formData.email.trim(),
      departmentId: formData.departmentId,
      address: {
        street:  formData.address.street.trim(),
        city:    formData.address.city.trim(),
        state:   formData.address.state.trim(),
        zip:     formData.address.zip.trim(),
        country: formData.address.country.trim(),
      },
      avatar: isEditMode ? existingStaff.avatar : null,
    };

    if (isEditMode) {
      if (onUpdateStaff) onUpdateStaff(savedPerson);
      Alert.alert('✅ Updated', `${savedPerson.name}'s profile has been updated.`);
    } else {
      if (onAddStaff) onAddStaff(savedPerson);
      Alert.alert('✅ Added', `${savedPerson.name} has been added.`);
    }

    navigation.navigate('StaffList');
  };

  const handleCancel = () => {
    navigation.navigate('StaffList');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
          <Text style={styles.headerButtonText}>✕ Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditMode ? 'Edit Profile' : 'Add Staff Member'}
        </Text>
        <TouchableOpacity style={styles.saveHeaderButton} onPress={handleSave}>
          <Text style={styles.saveHeaderText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <FormField
            label="First Name *"
            value={formData.firstName}
            onChangeText={(v) => updateField('firstName', v)}
            placeholder="e.g. John"
            error={errors.firstName}
          />
          <FormField
            label="Last Name *"
            value={formData.lastName}
            onChangeText={(v) => updateField('lastName', v)}
            placeholder="e.g. Smith"
            error={errors.lastName}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <FormField
            label="Phone *"
            value={formData.phone}
            onChangeText={(v) => updateField('phone', v)}
            placeholder="e.g. 02 9988 2211"
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <FormField
            label="Email"
            value={formData.email}
            onChangeText={(v) => updateField('email', v)}
            placeholder="e.g. john.smith@roi.com.au"
            keyboardType="email-address"
            error={errors.email}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Department</Text>
          {DEPARTMENTS.map((dept) => (
            <TouchableOpacity
              key={dept.id}
              style={[
                styles.deptOption,
                formData.departmentId === dept.id && styles.deptOptionSelected,
              ]}
              onPress={() => updateField('departmentId', dept.id)}
            >
              <Text style={[
                styles.deptOptionText,
                formData.departmentId === dept.id && styles.deptOptionTextSelected,
              ]}>
                {dept.name}
              </Text>
              {formData.departmentId === dept.id && (
                <Text style={styles.deptTick}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address</Text>
          <FormField
            label="Street *"
            value={formData.address.street}
            onChangeText={(v) => updateAddress('street', v)}
            placeholder="e.g. 1 Code Lane"
            error={errors['address.street']}
          />
          <FormField
            label="City *"
            value={formData.address.city}
            onChangeText={(v) => updateAddress('city', v)}
            placeholder="e.g. Javaville"
            error={errors['address.city']}
          />
          <FormField
            label="State *"
            value={formData.address.state}
            onChangeText={(v) => updateAddress('state', v)}
            placeholder="e.g. NSW"
            error={errors['address.state']}
          />
          <FormField
            label="Postcode *"
            value={formData.address.zip}
            onChangeText={(v) => updateAddress('zip', v)}
            placeholder="e.g. 2000"
            keyboardType="numeric"
            error={errors['address.zip']}
          />
          <FormField
            label="Country"
            value={formData.address.country}
            onChangeText={(v) => updateAddress('country', v)}
            placeholder="e.g. Australia"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditMode ? '💾  Save Changes' : '➕  Add Staff Member'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.requiredNote}>* Required fields</Text>
        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </KeyboardAvoidingView>
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
    minWidth: 60,
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
  saveHeaderButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.medium,
  },
  saveHeaderText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONTS.sizes.body,
  },
  scroll: { flex: 1 },
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
  fieldContainer: { marginBottom: SPACING.sm },
  fieldLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.grey,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: BORDER_RADIUS.small,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.body,
    color: COLORS.charcoal,
    backgroundColor: COLORS.background,
  },
  inputError: { borderColor: COLORS.error },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    marginTop: 3,
  },
  deptOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.small,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.background,
  },
  deptOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  deptOptionText: {
    fontSize: FONTS.sizes.body,
    color: COLORS.charcoal,
  },
  deptOptionTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  deptTick: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONTS.sizes.body,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    ...SHADOW,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.subheading,
    fontWeight: 'bold',
  },
  requiredNote: {
    textAlign: 'center',
    color: COLORS.grey,
    fontSize: FONTS.sizes.small,
    marginTop: SPACING.sm,
  },
});

export default AddEditStaffScreen;
