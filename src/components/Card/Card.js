import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import {StyleSheet} from 'react-native';
import {themeFields, icons, general} from '../../config/style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import Color from 'color';
import {reorderData} from '../../utils/reorder';
import LinkedListModal from '../Modal/LinkedListModal';
import {elementTypes} from '../../config/meta';

const Card = ({
  type,
  title,
  actions,
  children,
  multiple,
  optionalSideMenu = [],
  optionalTitleActions = [],
  element,
}) => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [linkedElementType, setLinkedElementType] = useState(elementTypes.note);

  // Selectors
  const currentSettings = useSelector(getCurrentSettings);

  // Actions
  const handleOpenLinkedElementsModal = modalType => {
    setShowModal(true);
    setLinkedElementType(modalType);
  };

  const handleCloseLinkedElementsModal = () => {
    setShowModal(false);
  };

  const sideMenu = multiple
    ? optionalSideMenu
    : reorderData(
        currentSettings.cardOrder,
        [
          {
            key: elementTypes.note,
            onPress: () => handleOpenLinkedElementsModal(elementTypes.note),
          },
          {
            key: elementTypes.task,
            onPress: () => handleOpenLinkedElementsModal(elementTypes.task),
          },
          {
            key: elementTypes.event,
            onPress: () => handleOpenLinkedElementsModal(elementTypes.event),
          },
          ...optionalSideMenu,
        ].map(menuItem => ({
          ...menuItem,
          text: `${
            element.linked[menuItem.key]
              ? element.linked[menuItem.key].length
              : 0
          }`,
        })),
      );
  const titleActions = [...optionalTitleActions];
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <View style={cardStyle(currentTheme, type).container}>
      <LinkedListModal
        visible={showModal}
        element={element}
        type={linkedElementType}
        handleCloseModal={handleCloseLinkedElementsModal}
      />
      <View style={cardStyle(currentTheme, type).main}>
        <View style={cardStyle(currentTheme, type).titleContainer}>
          <View style={cardStyle(currentTheme, type).title}>
            <Icon
              name={icons[type]}
              type={icons.type}
              size={15}
              color={
                currentTheme.colors[type][themeFields.styles.secondaryColor]
              }
            />
            <Text style={cardStyle(currentTheme, type).titleText}>
              {' ' + title}
            </Text>
          </View>
          {!multiple && (
            <View style={cardStyle(currentTheme, type).titleActionContainer}>
              {titleActions.map(action => (
                <TouchableOpacity
                  key={action.key}
                  onPress={() => action.onPress(element)}
                  style={cardStyle(currentTheme, type).titleAction}>
                  <Icon
                    name={icons[action.key(element)]}
                    type={icons.type}
                    size={20}
                    color={
                      currentTheme.colors[type][
                        themeFields.styles.secondaryColor
                      ]
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={cardStyle(currentTheme, type).content}>
          <Text style={cardStyle(currentTheme, type).contentText}>
            {children}
          </Text>
        </View>
        <View style={cardStyle(currentTheme, type).actions}>
          <FlatList
            horizontal
            data={actions}
            contentContainerStyle={cardStyle(currentTheme, type).actionList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[cardStyle(currentTheme, type).action]}
                disabled={
                  (item.key === 'delete' || item.key === 'edit') && !element
                }
                onPress={item.onPress}>
                {item.text ? (
                  <Text>{item.text}</Text>
                ) : (
                  <Icon
                    name={icons[item.key]}
                    type={icons.type}
                    size={general.cardIconSize}
                    color={
                      currentTheme.colors[type][
                        themeFields.styles.secondaryColor
                      ]
                    }
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={cardStyle(currentTheme, type).sideMenu}>
        <FlatList
          data={[...sideMenu]}
          contentContainerStyle={cardStyle(currentTheme, type).sideMenuList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[cardStyle(currentTheme, type).sideMenuAction]}
              onPress={item.onPress}>
              {item.text && (
                <Text style={cardStyle(currentTheme, type).sideMenuText}>
                  {item.text + ' '}
                </Text>
              )}
              <Icon
                name={icons[item.key]}
                type={icons.type}
                size={
                  item.text ? general.cardIconSize - 5 : general.cardIconSize
                }
                color={
                  currentTheme.colors[themeFields.items.general][
                    themeFields.styles.secondaryColor
                  ]
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const cardStyle = (theme, type) => {
  const borderRadius = 8;
  const outerMargin = 20;
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: outerMargin,
    },
    //Main content
    main: {
      flex: 6,
      flexDirection: 'column',
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 5,
      borderTopLeftRadius: borderRadius,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
    title: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    titleActionContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    titleAction: {
      padding: 5,
    },
    titleText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    contentText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    content: {
      flex: 6,
      padding: 5,
      backgroundColor: Color(
        theme.colors[type][themeFields.styles.mainColor],
      ).lighten(0.2),
    },
    actions: {
      padding: 5,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
      borderBottomLeftRadius: borderRadius,
    },
    actionList: {
      flex: 1,
      justifyContent: 'space-around',
    },
    action: {},
    // sideMenu content
    sideMenu: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
    sideMenuAction: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
    },
    sideMenuText: {
      color:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
    },
  });
};
export default Card;
