import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BaseModal from './BaseModal';
import {themeFields, icons} from '../../config/style';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {Icon} from 'react-native-elements';
import ModalListItem from './ModalListItem';
import {
  unlinkElements,
  linkElements,
} from '../../store/element/element.actions';
import {
  getCurrentElement,
  getCurrentType,
  getElementsForType,
} from '../../store/element/element.selectors';
import {addAction} from '../../utils/actions';

const ElementListItem = ({element, type}) => {
  // Selectors
  const currentTheme = useSelector(getCurrentTheme);
  const currentElement = useSelector(getCurrentElement);
  const currentType = useSelector(getCurrentType);

  // Misc
  const isSelected = currentElement.linked[type]
    .map(id => id)
    .includes(element.id);

  // Actions
  const dispatch = useDispatch();

  const handleLinkElement = () => {
    dispatch(
      isSelected
        ? unlinkElements(currentElement, currentType, element, type)
        : linkElements(currentElement, currentType, element, type),
    );
  };

  return (
    <ModalListItem type={type} text={element.title} onPress={handleLinkElement}>
      <Icon
        name={isSelected ? icons.checked : icons.unchecked}
        type={icons.type}
        size={20}
        color={currentTheme.colors[type][themeFields.styles.secondaryColor]}
      />
    </ModalListItem>
  );
};

const LinkedModal = ({type, visible, handleCloseModal}) => {
  // Selectors
  const currentTheme = useSelector(getCurrentTheme);
  const currentElement = useSelector(getCurrentElement);
  const currentType = useSelector(getCurrentType);
  const elements = useSelector(getElementsForType(type));

  const dispatch = useDispatch();
  return (
    <BaseModal
      title={type}
      type={type}
      visible={visible}
      handleCloseModal={handleCloseModal}>
      <View style={linkModalStyle(currentTheme, type).container}>
        {elements &&
          elements
            .filter(element => element.id !== currentElement.id)
            .map(element => <ElementListItem element={element} type={type} />)}
        <ModalListItem
          type={type}
          text={`New ${type}`}
          onPress={() =>
            addAction(type, dispatch, {
              linkedId: currentElement.id,
              linkedType: currentType,
            }).onPress()
          }
        />
      </View>
    </BaseModal>
  );
};

export const linkModalStyle = (theme, type) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
  });
};

export default LinkedModal;
