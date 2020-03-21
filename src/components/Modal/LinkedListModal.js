import React from 'react';
import BaseModal from './BaseModal';
import {View, TouchableOpacity} from 'react-native';
import {linkModalStyle, elementListItemStyle} from './LinkedModal';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {getCurrentNote} from '../../store/note/note.selectors';
import {getCurrentTask} from '../../store/task/task.selectors';
import {getCurrentEvent} from '../../store/event/event.selectors';
import {themeFields} from '../../config/style';
import {Text} from 'react-native';
import {goTo} from '../../store/navigation/navigation.actions';
import {paths} from '../../config/routes';
import {emptyNote} from '../../store/note/note.reducer';
import ModalListItem from './ModalListItem';

const LinkedListModal = ({
  linkType = themeFields.items.note,
  element = emptyNote,
  visible = false,
  handleCloseModal,
}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const dispatch = useDispatch();

  const handleOpenElement = elem => {
    dispatch(goTo(paths[linkType], {[linkType]: elem, isEditing: true}));
  };
  return (
    <BaseModal
      title={linkType}
      type={linkType}
      visible={visible}
      handleCloseModal={handleCloseModal}>
      <View style={linkModalStyle(currentTheme, linkType).container}>
        {element &&
          element.linked &&
          element.linked[linkType].map(elem => (
            <ModalListItem
              type={linkType}
              text={elem.title}
              onPress={() => handleOpenElement(elem)}
            />
          ))}
      </View>
    </BaseModal>
  );
};

export default LinkedListModal;
