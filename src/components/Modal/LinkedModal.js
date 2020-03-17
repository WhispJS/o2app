import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  linkElementToNote,
  unlinkElementToNote,
} from '../../store/note/note.actions';
import {
  linkElementToTask,
  unlinkElementToTask,
} from '../../store/task/task.actions';
import {
  linkElementToEvent,
  unlinkElementToEvent,
} from '../../store/event/event.actions';
import {getTasks, getCurrentTask} from '../../store/task/task.selectors';
import {getNotes, getCurrentNote} from '../../store/note/note.selectors';
import {getEvents, getCurrentEvent} from '../../store/event/event.selectors';
import BaseModal from './BaseModal';
import {themeFields, icons} from '../../config/style';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {Icon} from 'react-native-elements';

const ElementListItem = ({element, linkType, elementType}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentNote = useSelector(getCurrentNote);
  const currentTask = useSelector(getCurrentTask);
  const currentEvent = useSelector(getCurrentEvent);
  const currentElement = {
    [themeFields.items.note]: currentNote,
    [themeFields.items.task]: currentTask,
    [themeFields.items.event]: currentEvent,
  };
  const isSelected = currentElement[elementType].linked[linkType]
    .map(elem => elem.id)
    .includes(element.id);
  const dispatch = useDispatch();
  const handleLinkElement = () => {
    switch (elementType) {
      case themeFields.items.note:
        dispatch(
          isSelected
            ? unlinkElementToNote(
                currentElement[elementType],
                element,
                linkType,
              )
            : linkElementToNote(currentElement[elementType], element, linkType),
        );
        break;
      case themeFields.items.task:
        dispatch(
          isSelected
            ? unlinkElementToTask(
                currentElement[elementType],
                element,
                linkType,
              )
            : linkElementToTask(currentElement[elementType], element, linkType),
        );
        break;
      case themeFields.items.event:
        dispatch(
          isSelected
            ? unlinkElementToEvent(
                currentElement[elementType],
                element,
                linkType,
              )
            : linkElementToEvent(
                currentElement[elementType],
                element,
                linkType,
              ),
        );
        break;
    }
    //This is the link back
    switch (linkType) {
      case themeFields.items.note:
        dispatch(
          isSelected
            ? unlinkElementToNote(
                element,
                currentElement[elementType],
                elementType,
              )
            : linkElementToNote(
                element,
                currentElement[elementType],
                elementType,
              ),
        );
        break;
      case themeFields.items.task:
        dispatch(
          isSelected
            ? unlinkElementToTask(
                element,
                currentElement[elementType],
                elementType,
              )
            : linkElementToTask(
                element,
                currentElement[elementType],
                elementType,
              ),
        );
        break;
      case themeFields.items.event:
        dispatch(
          isSelected
            ? unlinkElementToEvent(
                element,
                currentElement[elementType],
                elementType,
              )
            : linkElementToEvent(
                element,
                currentElement[elementType],
                elementType,
              ),
        );
        break;
    }
  };
  return (
    <TouchableOpacity
      onPress={handleLinkElement}
      style={elementListItemStyle(currentTheme, linkType).container}>
      <Icon
        name={isSelected ? icons.checked : icons.unchecked}
        type={icons.type}
        size={20}
        color={currentTheme.colors[linkType][themeFields.styles.secondaryColor]}
      />
      <Text style={elementListItemStyle(currentTheme, linkType).titleText}>
        {element.title}
      </Text>
    </TouchableOpacity>
  );
};

const LinkedModal = ({linkType, elementType, visible, handleCloseModal}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const allTasks = useSelector(getTasks);
  const allNotes = useSelector(getNotes);
  const allEvents = useSelector(getEvents);
  const elements = {
    [themeFields.items.note]: allNotes,
    [themeFields.items.task]: allTasks,
    [themeFields.items.event]: allEvents,
  };
  const currentNote = useSelector(getCurrentNote);
  const currentTask = useSelector(getCurrentTask);
  const currentEvent = useSelector(getCurrentEvent);
  const currentElement = {
    [themeFields.items.note]: currentNote,
    [themeFields.items.task]: currentTask,
    [themeFields.items.event]: currentEvent,
  };
  return (
    <BaseModal
      title={linkType}
      type={linkType}
      visible={visible}
      handleCloseModal={handleCloseModal}>
      <View style={linkModalStyle(currentTheme, linkType).container}>
        {elements[linkType] &&
          elements[linkType]
            .filter(element => element.id !== currentElement[elementType].id)
            .map(element => (
              <ElementListItem
                element={element}
                elementType={elementType}
                linkType={linkType}
              />
            ))}
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
export const elementListItemStyle = (theme, type) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxHeight: 50,
      borderColor: theme.colors[type][themeFields.styles.secondaryColor],
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    titleText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
  });
};
export default LinkedModal;
