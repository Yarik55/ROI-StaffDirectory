// A reusable search input bar used on the Staff List screen.
// The parent screen owns the data — this component just displays it.

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../constants/theme';

const SearchBar = ({ value, onChangeText, onClear, placeholder }) => {
  return (
    <View style={styles.container}>
      {/* Search icon */}
      <Text style={styles.searchIcon}>🔍</Text>

      {/* Text input */}
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

      {/* Clear button — only shows when there is text */}
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: FONTS.sizes.body,
    color: COLORS.charcoal,
    paddingVertical: 0,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  clearText: {
    fontSize: 12,
    color: COLORS.grey,
  },
});

export default SearchBar;
