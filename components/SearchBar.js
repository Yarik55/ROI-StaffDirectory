// components/SearchBar.js
// Reusable search input extracted into its own component (refactored from StaffListScreen).
// Controlled component: parent owns the value, this component only handles appearance.
// Bug fix: search bar is now fixed above the FlatList so it stays visible while scrolling.

import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../constants/theme';

const SearchBar = ({ value, onChangeText, onClear, placeholder }) => (
  <View style={styles.container}>
    <Text style={styles.icon}>🔍</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || 'Search staff...'}
      placeholderTextColor={COLORS.lightGrey}
      returnKeyType="search"
      autoCorrect={false}
      autoCapitalize="none"
    />
    {(value || '').length > 0 && (
      <TouchableOpacity onPress={onClear} style={styles.clear}>
        <Text style={styles.clearText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1, borderColor: COLORS.lightGrey,
    marginHorizontal: SPACING.md, marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm, height: 44,
  },
  icon:      { fontSize: 14, marginRight: SPACING.xs },
  input:     { flex: 1, fontSize: FONTS.sizes.body, color: COLORS.charcoal, paddingVertical: 0 },
  clear:     { padding: SPACING.xs },
  clearText: { fontSize: 12, color: COLORS.grey },
});

export default SearchBar;
