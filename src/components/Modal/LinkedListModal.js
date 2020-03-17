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

const ElementListItem = ({element, linkType}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const dispatch = useDispatch();

  const handleOpenElement = () => {
    dispatch(goTo(paths[linkType], {[linkType]: element, isEditing: true}));
  };

  return (
    <TouchableOpacity
      onPress={handleOpenElement}
      style={elementListItemStyle(currentTheme, linkType).container}>
      <Text style={elementListItemStyle(currentTheme, linkType).titleText}>
        {element.title}
      </Text>
    </TouchableOpacity>
  );
};

const LinkedListModal = ({linkType, element, visible, handleCloseModal}) => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <BaseModal
      title={linkType}
      type={linkType}
      visible={visible}
      handleCloseModal={handleCloseModal}>
      <View style={linkModalStyle(currentTheme, linkType).container}>
        {element &&
          element.linked[linkType].map(elem => (
            <ElementListItem element={elem} linkType={linkType} />
          ))}
      </View>
    </BaseModal>
  );
};

export default LinkedListModal;
