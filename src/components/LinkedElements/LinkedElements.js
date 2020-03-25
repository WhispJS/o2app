import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import LinkedModal from '../Modal/LinkedModal';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import Color from 'color';
import {themeFields, icons} from '../../config/style';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {findById} from '../../store/element/element.service';
import {getElements} from '../../store/element/element.selectors';

const LinkedElements = ({linked}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const elements = useSelector(getElements);
  const [showModal, setShowModal] = useState(false);
  const [linkType, setLinkType] = useState();

  const handleOpenModal = type => {
    if (!type) {
      return;
    }
    setShowModal(!showModal);
    setLinkType(type);
  };

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };
  return (
    <View>
      <Text
        style={
          linkedElementStyle(currentTheme, themeFields.items.general)
            .componentTitle
        }>
        Linked elements
      </Text>
      <LinkedModal
        type={linkType}
        visible={showModal}
        handleCloseModal={handleCloseModal}
      />
      {currentSettings.cardOrder
        .map(type => ({key: type.key, data: linked[type.key]}))
        .map(linkedList => (
          <View
            style={linkedElementStyle(currentTheme, linkedList.key).container}>
            <TouchableOpacity
              style={
                linkedElementStyle(currentTheme, linkedList.key).titleContainer
              }
              onPress={() => handleOpenModal(linkedList.key)}>
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
                  {` ${
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
                linkedList.data.map(id => {
                  const element = findById(elements[linkedList.key])(id)
                    .element;
                  return (
                    <Text
                      style={
                        linkedElementStyle(currentTheme, linkedList.key).element
                      }>
                      {element.title}
                    </Text>
                  );
                })
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
