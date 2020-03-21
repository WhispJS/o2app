import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {themeFields} from '../../config/style';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';

const ModalListItem = ({type, text, onPress, children}) => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={modalListItemStyle(currentTheme, type).container}>
      {children}
      <Text style={modalListItemStyle(currentTheme, type).titleText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const modalListItemStyle = (theme, type) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxHeight: 50,
      borderColor: theme.colors[type][themeFields.styles.secondaryColor],
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    titleText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
  });
};

export default ModalListItem;
