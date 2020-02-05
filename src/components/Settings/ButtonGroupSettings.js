import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getCurrentSettings} from '../../store/themes/themes.selectors';

const ButtonGroupSettings = ({
  data,
  settingsField,
  updateSettings,
  header,
  buttonStyle,
  textStyle,
  selectedButtonStyle,
  selectedTextStyle,
  containerStyle,
}) => {
  const currentSettings = useSelector(getCurrentSettings);
  return (
    <View style={buttonGroupStyle.container}>
      {header}
      <ButtonGroup
        selectedIndex={data
          .map(elem => elem.key)
          .indexOf(currentSettings[settingsField])}
        onPress={selectedIndex =>
          updateSettings(settingsField, data[selectedIndex].key)
        }
        buttons={data.map(position => position.text)}
        containerStyle={[buttonGroupStyle.group, containerStyle]}
        innerBorderStyle={{color: containerStyle.borderColor}}
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        selectedButtonStyle={selectedButtonStyle}
        selectedTextStyle={selectedTextStyle}
      />
    </View>
  );
};

const buttonGroupStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
  },
});

export default ButtonGroupSettings;
