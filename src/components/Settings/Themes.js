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
import {Slider, Input} from 'react-native-elements';
import {TextInput} from 'react-native';

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
  const [currentColorCode, setCurrentColorCode] = useState(
    currentTheme.colors[selectedElement][selectedCategory],
  );
  const dispatch = useDispatch();

  const onPressElement = element => {
    setSelectedElement(element);
    setCurrentColorCode(currentTheme.colors[element][selectedCategory]);
  };

  const onPressCategory = category => {
    setSelectedCategory(category);
    setCurrentColorCode(currentTheme.colors[selectedElement][category]);
  };

  const onChangeInputName = ({nativeEvent}) => {
    const updatedTheme = {...currentTheme, name: nativeEvent.text};
    dispatch(saveTheme(updatedTheme));
  };

  const onChangeColorCode = ({nativeEvent}) => {
    if (
      parseInt(nativeEvent.text.slice(1), 16).toString(16) !==
      nativeEvent.text.slice(1).toLowerCase()
    ) {
      return; // do nothing when input isn't correct hexadecimal
    }
    setCurrentColorCode(nativeEvent.text.toUpperCase());
    if (nativeEvent.text.length !== 7) {
      return;
    }
    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [selectedElement]: {
          ...currentTheme.colors[selectedElement],
          [selectedCategory]: nativeEvent.text,
        },
      },
    };
    dispatch(saveTheme(updatedTheme));
  };
  const updateTheme = (field, value) => {
    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [field.element]: {
          ...currentTheme.colors[field.element],
          [field.category]: fromHsv(value),
        },
      },
    };
    dispatch(saveTheme(updatedTheme));
  };

  return (
    <View
      style={themesStyle(currentTheme, themeFields.items.general).container}>
      <View
        style={
          themesStyle(currentTheme, themeFields.items.general).inputContainer
        }>
        <Text
          style={
            themesStyle(currentTheme, themeFields.items.general).inputLabel
          }>
          Theme name
        </Text>
        <TextInput
          value={currentTheme.name}
          onChange={onChangeInputName}
          style={themesStyle(currentTheme, themeFields.items.general).input}
        />
      </View>
      <View
        style={
          themesStyle(currentTheme, themeFields.items.general).colorContainer
        }>
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
          style={
            themesStyle(currentTheme, themeFields.items.general).colorView
          }>
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
                      ? themesStyle(currentTheme, selectedElement, item.key)
                          .categorySelectedText
                      : themesStyle(currentTheme, selectedElement, item.key)
                          .categoryText
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
            color={toHsv(
              currentTheme.colors[selectedElement][selectedCategory],
            )}
            sliderComponent={Slider}
          />
          <Input
            value={currentColorCode}
            autoCorrect={false}
            maxLength={7}
            onChange={onChangeColorCode}
            containerStyle={
              themesStyle(currentTheme, themeFields.items.general)
                .inputContainer
            }
            inputStyle={
              themesStyle(currentTheme, themeFields.items.general).input
            }
            labelStyle={
              themesStyle(currentTheme, themeFields.items.general).inputLabel
            }
          />
        </View>
      </View>
    </View>
  );
};

const themesStyle = (theme, element, category) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
    },
    colorContainer: {
      marginTop: 10,
      flexDirection: 'row',
    },
    colorView: {
      flex: 7,
      marginLeft: 10,
    },
    element: {
      borderRadius: 8,
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
        element === themeFields.items.general
          ? Color(theme.colors[element][category]).lighten(0.3)
          : theme.colors[element][category],
    },
    categorySelected: {
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      marginRight: 10,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.colors[element][category],
      backgroundColor:
        element === themeFields.items.general
          ? Color(theme.colors[element][category]).lighten(0.3)
          : theme.colors[element][category],
    },
    categoryText: {
      color: theme.colors[element][category],
    },
    categorySelectedText: {
      color: Color(theme.colors[element][category]).darken(0.5),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 6,
      padding: 5,
      borderWidth: 1,
      borderRadius: 8,
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    inputLabel: {
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      marginRight: 10,
    },
  });
export default Themes;
