// screens/AddEditStaffScreen.js
// Form screen for adding a new staff member or editing an existing one.
// Validates all required fields before saving and shows inline error messages.
// Uses KeyboardAvoidingView so fields remain visible when the keyboard is open.

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity,
         StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOW } from '../constants/theme';
import { DEPARTMENTS } from '../data/staffData';

const Field = ({ label, value, onChangeText, placeholder, keyboardType, error }) => (
  <View style={{ marginBottom: SPACING.sm }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, error && { borderColor: COLORS.error }]}
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
  const { mode, staff: existing } = route.params;
  const isEdit = mode === 'edit';

  const [form, setForm] = useState({
    firstName:    isEdit ? existing.firstName    : '',
    lastName:     isEdit ? existing.lastName     : '',
    phone:        isEdit ? existing.phone        : '',
    email:        isEdit ? existing.email        : '',
    departmentId: isEdit ? existing.departmentId : 0,
    street:  isEdit ? existing.address.street  : '',
    city:    isEdit ? existing.address.city    : '',
    state:   isEdit ? existing.address.state   : '',
    zip:     isEdit ? existing.address.zip     : '',
    country: isEdit ? existing.address.country : 'Australia',
  });

  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required';
    if (!form.phone.trim())     e.phone     = 'Phone is required';
    if (!form.street.trim())    e.street    = 'Street is required';
    if (!form.city.trim())      e.city      = 'City is required';
    if (!form.state.trim())     e.state     = 'State is required';
    if (!form.zip.trim())       e.zip       = 'Postcode is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      Alert.alert('Fix errors', 'Please fill in all required fields.');
      return;
    }
    const person = {
      id:           isEdit ? existing.id : Date.now(),
      firstName:    form.firstName.trim(),
      lastName:     form.lastName.trim(),
      name:         `${form.firstName.trim()} ${form.lastName.trim()}`,
      phone:        form.phone.trim(),
      email:        form.email.trim(),
      departmentId: form.departmentId,
      address: {
        street:  form.street.trim(),
        city:    form.city.trim(),
        state:   form.state.trim(),
        zip:     form.zip.trim(),
        country: form.country.trim() || 'Australia',
      },
    };
    if (isEdit) {
      if (onUpdateStaff) onUpdateStaff(person);
      Alert.alert('Updated', `${person.name} has been updated.`,
        [{ text: 'OK', onPress: () => navigation.navigate('StaffList') }]);
    } else {
      if (onAddStaff) onAddStaff(person);
      Alert.alert('Added', `${person.name} has been added.`,
        [{ text: 'OK', onPress: () => navigation.navigate('StaffList') }]);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('StaffList')}>
          <Text style={styles.headerBtn}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEdit ? 'Edit Profile' : 'Add Staff Member'}</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.section}>Personal Details</Text>
          <Field label="First Name *" value={form.firstName} onChangeText={(v) => set('firstName', v)}
                 placeholder="e.g. John"  error={errors.firstName} />
          <Field label="Last Name *"  value={form.lastName}  onChangeText={(v) => set('lastName',  v)}
                 placeholder="e.g. Smith" error={errors.lastName} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Contact</Text>
          <Field label="Phone *" value={form.phone} onChangeText={(v) => set('phone', v)}
                 placeholder="e.g. 02 9988 2211" keyboardType="phone-pad" error={errors.phone} />
          <Field label="Email"   value={form.email} onChangeText={(v) => set('email', v)}
                 placeholder="e.g. john@roi.com.au" keyboardType="email-address" />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Department</Text>
          {DEPARTMENTS.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={[styles.deptRow, form.departmentId === d.id && styles.deptRowActive]}
              onPress={() => set('departmentId', d.id)}
            >
              <Text style={[styles.deptText, form.departmentId === d.id && { color: COLORS.white, fontWeight: 'bold' }]}>
                {d.name}
              </Text>
              {form.departmentId === d.id && <Text style={{ color: COLORS.white }}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Address</Text>
          <Field label="Street *"   value={form.street}  onChangeText={(v) => set('street',  v)}
                 placeholder="e.g. 1 Code Lane" error={errors.street} />
          <Field label="City *"     value={form.city}    onChangeText={(v) => set('city',    v)}
                 placeholder="e.g. Javaville"   error={errors.city} />
          <Field label="State *"    value={form.state}   onChangeText={(v) => set('state',   v)}
                 placeholder="e.g. NSW"          error={errors.state} />
          <Field label="Postcode *" value={form.zip}     onChangeText={(v) => set('zip',     v)}
                 placeholder="e.g. 2000" keyboardType="numeric" error={errors.zip} />
          <Field label="Country"    value={form.country} onChangeText={(v) => set('country', v)}
                 placeholder="e.g. Australia" />
        </View>

        <TouchableOpacity style={styles.bigSaveBtn} onPress={handleSave}>
          <Text style={styles.bigSaveBtnText}>{isEdit ? 'Save Changes' : 'Add Staff Member'}</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', color: COLORS.grey, fontSize: FONTS.sizes.small, marginVertical: SPACING.sm }}>
          * Required fields
        </Text>
        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header:         { backgroundColor: COLORS.primary, paddingTop: SPACING.xl, paddingBottom: SPACING.md,
                    paddingHorizontal: SPACING.md, flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center' },
  headerBtn:      { color: COLORS.white, fontSize: FONTS.sizes.body, fontWeight: 'bold', minWidth: 60 },
  headerTitle:    { color: COLORS.white, fontSize: FONTS.sizes.subheading, fontWeight: 'bold' },
  saveBtn:        { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.md,
                    paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.medium },
  saveBtnText:    { color: COLORS.white, fontWeight: 'bold' },
  card:           { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.medium,
                    padding: SPACING.md, marginHorizontal: SPACING.md, marginTop: SPACING.md, ...SHADOW },
  section:        { fontSize: FONTS.sizes.small, fontWeight: 'bold', color: COLORS.primary,
                    marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  fieldLabel:     { fontSize: FONTS.sizes.small, color: COLORS.grey, marginBottom: 4, fontWeight: '600' },
  input:          { borderWidth: 1, borderColor: COLORS.lightGrey, borderRadius: BORDER_RADIUS.small,
                    paddingHorizontal: SPACING.sm, paddingVertical: SPACING.sm,
                    fontSize: FONTS.sizes.body, color: COLORS.charcoal, backgroundColor: COLORS.background },
  errorText:      { color: COLORS.error, fontSize: FONTS.sizes.small, marginTop: 3 },
  deptRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    padding: SPACING.sm, borderRadius: BORDER_RADIUS.small, marginBottom: 4,
                    borderWidth: 1, borderColor: COLORS.lightGrey, backgroundColor: COLORS.background },
  deptRowActive:  { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  deptText:       { fontSize: FONTS.sizes.body, color: COLORS.charcoal },
  bigSaveBtn:     { backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center',
                    marginHorizontal: SPACING.md, marginTop: SPACING.lg, paddingVertical: SPACING.md,
                    borderRadius: BORDER_RADIUS.medium, ...SHADOW },
  bigSaveBtnText: { color: COLORS.white, fontSize: FONTS.sizes.subheading, fontWeight: 'bold' },
});

export default AddEditStaffScreen;
