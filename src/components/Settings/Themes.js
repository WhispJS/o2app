import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Button} from 'react-native';
import {themeFields, textStyles} from '../../config/style';
import {Text} from 'react-native';
import {ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {saveTheme} from '../../store/themes/themes.actions';
import {TouchableOpacity} from 'react-native';
import Color from 'color';
import {Slider} from 'react-native-elements';

const Themes = () => {
  const elements = Object.values(themeFields.items).map(element => ({
    key: element,
  }));
  const categories = Object.values(themeFields.styles).map(category => ({
    key: category,
  }));
  const general = themeFields.items.general;
  const currentTheme = useSelector(getCurrentTheme);
  const [selectedElement, setSelectedElement] = useState(
    themeFields.items.note,
  );
  const [selectedCategory, setSelectedCategory] = useState(
    themeFields.styles.mainColor,
  );
  const dispatch = useDispatch();

  const onPressElement = element => {
    setSelectedElement(element);
  };

  const onPressCategory = category => {
    setSelectedCategory(category);
  };

  const updateTheme = (field, value) => {
    const newTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [field.element]: {
          ...currentTheme.colors[field.element],
          [field.category]: fromHsv(value),
        },
      },
    };
    dispatch(saveTheme(newTheme));
  };

  return (
    <View
      style={themesStyle(currentTheme, themeFields.items.general).container}>
      <FlatList
        data={elements}
        renderItem={({item}) => (
          <TouchableOpacity
            style={themesStyle(currentTheme, item.key).element}
            onPress={() => onPressElement(item.key)}>
            <Text style={themesStyle(currentTheme, item.key).elementText}>
              {item.key}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={themesStyle(currentTheme, themeFields.items.general).colorView}>
        <FlatList
          horizontal
          data={categories}
          contentContainerStyle={
            themesStyle(currentTheme, general).categoryList
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={
                selectedCategory === item.key
                  ? themesStyle(currentTheme, selectedElement, item.key)
                      .categorySelected
                  : themesStyle(currentTheme, selectedElement, item.key)
                      .category
              }
              onPress={() => onPressCategory(item.key)}>
              <Text
                style={
                  selectedCategory === item.key
                    ? themesStyle(
                        currentTheme,
                        selectedElement,
                        selectedCategory,
                      ).categoryText
                    : themesStyle(
                        currentTheme,
                        general,
                        themeFields.styles.mainColor,
                      ).categoryText
                }>
                {index + 1}
              </Text>
            </TouchableOpacity>
          )}
        />
        <ColorPicker
          style={{height: 200}}
          onColorChange={color =>
            updateTheme(
              {element: selectedElement, category: selectedCategory},
              color,
            )
          }
          color={toHsv(currentTheme.colors[selectedElement][selectedCategory])}
          sliderComponent={Slider}
        />
        <Text>{currentTheme.colors[selectedElement][selectedCategory]}</Text>
      </View>
    </View>
  );
};

const themesStyle = (theme, element, category) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
      flexDirection: 'row',
    },
    colorView: {
      flex: 3,
      marginLeft: 10,
    },
    element: {
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      backgroundColor: theme.colors[element][themeFields.styles.mainColor],
    },
    elementText: {
      color: theme.colors[element][themeFields.styles.secondaryColor],
    },
    categoryList: {
      alignSelf: 'center',
    },
    category: {
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      marginRight: 10,
      borderRadius: 100,
      borderWidth: 1,
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    categorySelected: {
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      marginRight: 10,
      borderRadius: 100,
      borderWidth: 1,
      borderColor:
        element === themeFields.items.general
          ? Color(theme.colors[element][category]).lighten(0.8)
          : theme.colors[element][category],
    },
    categoryText: {
      color:
        element === themeFields.items.general
          ? Color(theme.colors[element][category]).lighten(0.8)
          : theme.colors[element][category],
    },
  });
export default Themes;
