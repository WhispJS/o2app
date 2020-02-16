import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import Color from 'color';
import {themeFields, icons} from '../../config/style';
import {Icon} from 'react-native-elements';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {reorderData} from '../../utils/reorder';

const LinkedElements = ({linked}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  return (
    <View>
      <Text
        style={
          linkedElementStyle(currentTheme, themeFields.items.general)
            .componentTitle
        }>
        Linked elements
      </Text>
      {reorderData(currentSettings.cardOrder, linked).map(linkedList => (
        <View
          style={linkedElementStyle(currentTheme, linkedList.key).container}>
          <TouchableOpacity
            style={
              linkedElementStyle(currentTheme, linkedList.key).titleContainer
            }>
            <View
              style={linkedElementStyle(currentTheme, linkedList.key).title}>
              <Icon
                name={icons[linkedList.key]}
                type={icons.type}
                size={20}
                color={
                  currentTheme.colors[linkedList.key][
                    themeFields.styles.secondaryColor
                  ]
                }
              />
              <Text
                style={
                  linkedElementStyle(currentTheme, linkedList.key).titleText
                }>
                {`${
                  linkedList.data.length > 0 ? linkedList.data.length : ''
                } Linked ${linkedList.key}${
                  linkedList.data.length > 1 ? 's' : ''
                }`}
              </Text>
            </View>
            <View
              style={
                linkedElementStyle(currentTheme, linkedList.key).linkButton
              }>
              <Icon
                name={icons.add}
                type={icons.type}
                size={20}
                color={
                  currentTheme.colors[linkedList.key][
                    themeFields.styles.secondaryColor
                  ]
                }
              />
            </View>
          </TouchableOpacity>
          <View style={linkedElementStyle(currentTheme, linkedList.key).list}>
            {linkedList.data.length > 0 ? (
              linkedList.data.map(item => (
                <Text
                  style={
                    linkedElementStyle(currentTheme, linkedList.key).element
                  }>
                  {item}
                </Text>
              ))
            ) : (
              <Text
                style={
                  linkedElementStyle(currentTheme, linkedList.key).element
                }>
                {`No linked ${linkedList.key}`}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const linkedElementStyle = (theme, type) => {
  const borderRadius = 8;
  return StyleSheet.create({
    list: {
      padding: 5,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      backgroundColor: Color(
        theme.colors[type][themeFields.styles.mainColor],
      ).lighten(0.2),
    },
    componentTitle: {
      color: theme.colors[type][themeFields.styles.mainColor],
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
    title: {
      flexDirection: 'row',
      padding: 5,
    },
    titleText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    container: {
      flexDirection: 'column',
      marginBottom: 10,
    },
    element: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    linkButton: {
      padding: 10,
      width: 40,
    },
  });
};
export default LinkedElements;
