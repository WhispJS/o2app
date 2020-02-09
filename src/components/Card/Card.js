import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {StyleSheet} from 'react-native';
import {themeFields, icons, general} from '../../config/style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import Color from 'color';

const Card = ({
  type,
  title,
  optionalActions,
  children,
  navigation,
  onForwardPress,
  onBackPress,
}) => {
  const actions = [{key: 'share'}, {key: 'copy'}, {key: 'edit'}];
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <View style={cardStyle(currentTheme, type).container}>
      <View style={cardStyle(currentTheme, type).main}>
        <View style={cardStyle(currentTheme, type).title}>
          <Text style={cardStyle(currentTheme, type).titleText}>{title}</Text>
        </View>
        <View style={cardStyle(currentTheme, type).content}>
          <Text style={cardStyle(currentTheme, type).contentText}>
            {children}
          </Text>
        </View>
        <View style={cardStyle(currentTheme, type).actions}>
          <FlatList
            horizontal
            data={optionalActions ? [...actions, ...optionalActions] : actions}
            contentContainerStyle={cardStyle(currentTheme, type).actionList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  cardStyle(currentTheme, type).action,
                  {borderLeftWidth: index !== 0 ? 1 : 0},
                ]}>
                <Icon
                  name={icons[item.key]}
                  type={icons.type}
                  size={general.cardIconSize}
                  color={
                    currentTheme.colors[type][themeFields.styles.secondaryColor]
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {navigation && (
        <View style={cardStyle(currentTheme, type).navigation}>
          <FlatList
            data={[
              {key: 'back', onPress: () => onBackPress()},
              {key: 'forward', onPress: () => onForwardPress()},
            ]}
            contentContainerStyle={cardStyle(currentTheme, type).navigationList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  cardStyle(currentTheme, type).navigationAction,
                  {borderTopWidth: index !== 0 ? 1 : 0},
                ]}
                onPress={item.onPress}>
                <Icon
                  name={icons[item.key]}
                  type={icons.type}
                  size={general.cardIconSize}
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
      )}
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
    title: {
      flex: 1,
      padding: 5,
      borderTopLeftRadius: borderRadius,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
    titleText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    contentText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
    content: {
      padding: 5,
      backgroundColor: Color(
        theme.colors[type][themeFields.styles.mainColor],
      ).lighten(0.6),
      height: 90,
    },
    actions: {
      padding: 2,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
      borderBottomLeftRadius: borderRadius,
    },
    actionList: {
      flex: 1,
      justifyContent: 'space-around',
    },
    action: {
      flex: 1,
      padding: 8,
      paddingLeft: 30,
      paddingRight: 30,
      borderColor: theme.colors[type][themeFields.styles.secondaryColor],
    },
    // Navigation content
    navigation: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
    navigationList: {
      flex: 1,
    },
    navigationAction: {
      paddingTop: 30,
      paddingBottom: 30,
    },
  });
};
export default Card;
