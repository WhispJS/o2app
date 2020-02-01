import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native';
import {themeFields, textStyles} from '../../config/style';
import {Text} from 'react-native';
import {ColorPicker, toHsv} from 'react-native-color-picker';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';

const Themes = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const dispatch = useDispatch();
  const updateTheme = (field, value) => {
    const newTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [field.item]: {
          ...currentTheme.colors[field.item],
          [field.style]: fromHsv(value),
        },
      },
    };
    dispatch(saveTheme(newTheme));
  };
  return (
    <>
      {Object.keys(themeFields.items).map((item, itemIndex) => (
        <View key={itemIndex}>
          <Text style={textStyles(currentTheme).general}>
            {item.toUpperCase()}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            {Object.keys(themeFields.styles).map((style, styleIndex) => (
              <ColorPicker
                style={{flex: 1, height: 150}}
                key={itemIndex + styleIndex}
                onColorChange={color => updateTheme({item, style}, color)}
                color={toHsv(currentTheme.colors[item][style])}
              />
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

export default Themes;
