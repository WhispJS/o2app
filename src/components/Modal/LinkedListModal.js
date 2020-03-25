import React from 'react';
import BaseModal from './BaseModal';
import {View} from 'react-native';
import {linkModalStyle} from './LinkedModal';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import ModalListItem from './ModalListItem';
import {emptyElement} from '../../store/element/element.reducer';
import {getElementsForType} from '../../store/element/element.selectors';
import {findById} from '../../store/element/element.service';
import {viewAction} from '../../utils/actions';
import {elementTypes} from '../../config/meta';

const LinkedListModal = ({
  type = elementTypes.note,
  element = emptyElement[elementTypes.note],
  visible = false,
  handleCloseModal,
}) => {
  // Selectors
  const currentTheme = useSelector(getCurrentTheme);
  const elements = useSelector(getElementsForType(type));
  const findElementById = findById(elements);

  //Actions
  const dispatch = useDispatch();

  return (
    <BaseModal
      title={type}
      type={type}
      visible={visible}
      handleCloseModal={handleCloseModal}>
      <View style={linkModalStyle(currentTheme, type).container}>
        {element &&
          element.linked &&
          element.linked[type].map(id => {
            const elem = findElementById(id).element;
            return (
              <ModalListItem
                type={type}
                text={elem && elem.title}
                onPress={viewAction(type, elem, dispatch).onPress}
              />
            );
          })}
      </View>
    </BaseModal>
  );
};

export default LinkedListModal;
