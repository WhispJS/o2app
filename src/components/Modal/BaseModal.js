import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Modal, Text, View, StyleSheet} from 'react-native';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {themeFields, icons} from '../../config/style';

const BaseModal = ({title, type, children, visible, handleCloseModal}) => {
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <Modal
      animationType="slides"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal}>
      <View style={modalStyle(currentTheme).container}>
        <View style={modalStyle(currentTheme, type).titleContainer}>
          <View style={modalStyle(currentTheme, type).mainTitle}>
            {type && (
              <Icon
                name={icons[type]}
                type={icons.type}
                size={20}
                color={
                  currentTheme.colors[type][themeFields.styles.secondaryColor]
                }
              />
            )}
            <Text style={modalStyle(currentTheme, type).titleText}>
              {title}
            </Text>
          </View>
          <TouchableOpacity onPress={handleCloseModal}>
            <Icon
              name={icons.close}
              type={icons.type}
              size={25}
              color={
                currentTheme.colors[type ? type : themeFields.items.other][
                  themeFields.styles.secondaryColor
                ]
              }
            />
          </TouchableOpacity>
        </View>
        <View style={modalStyle(currentTheme, type).contentContainer}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BaseModal;

const modalStyle = (theme, type) => {
  type = type ? type : themeFields.items.general;
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors[type][themeFields.styles.secondaryColor],
      borderColor: theme.colors[type][themeFields.styles.mainColor],
      flex: 1,
      margin: 30,
      marginTop: 100,
      borderWidth: 1,
      borderRadius: 8,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 8,
      paddingLeft: 10,
      paddingRight: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
    mainTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      paddingLeft: 10,
      fontSize: 24,
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    contentContainer: {
      flex: 11,
      padding: 10,
    },
  });
};
