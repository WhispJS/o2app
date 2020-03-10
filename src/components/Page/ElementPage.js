import React, {useEffect, useState} from 'react';
import {Text, FlatList, ScrollView} from 'react-native';
import {textStyles, themeFields, icons, general} from '../../config/style';
import Page from './Page';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {
  setContextualMenu,
  goTo,
} from '../../store/navigation/navigation.actions';
import Card from '../Card/Card';
import {getPageParams} from '../../store/navigation/navigation.selectors';
import {paths} from '../../config/routes';
import {emptyNote} from '../../store/note/note.reducer';
import {emptyTask} from '../../store/task/task.reducer';
import {emptyEvent} from '../../store/event/event.reducer';
import {switchStateTask} from '../../store/task/task.actions';
import {elementPageActions} from '../../config/card-actions';

const ElementPage = ({elementType, elements, children}) => {
  const params = useSelector(getPageParams);
  const emptyElement = {
    [themeFields.items.note]: emptyNote,
    [themeFields.items.task]: emptyTask,
    [themeFields.items.event]: emptyEvent,
  };
  const currentTheme = useSelector(getCurrentTheme);
  const dispatch = useDispatch();

  const openIndividualElementPage = element => {
    dispatch(goTo(elementType, {[elementType]: element, isEditing: true}));
    dispatch(setContextualMenu(editingContextualMenu));
  };

  const closeIndividualElementPage = () => {
    dispatch(goTo(paths[elementType], {[elementType]: null, isEditing: false}));
  };

  const onPressAddElement = () => {
    openIndividualElementPage(emptyElement[elementType]);
  };

  const getSideMenu = type => {
    let sideMenu = [];
    switch (type) {
      case themeFields.items.note:
        sideMenu = [{key: 'attachment', onPress: () => {}}];
        break;
    }
    return sideMenu;
  };

  const getTitleActions = type => {
    let titleActions = [];
    switch (type) {
      case themeFields.items.task:
        titleActions = [
          {
            key: task => (task.done ? 'done' : 'undone'),
            onPress: task => dispatch(switchStateTask(task)),
          },
        ];
        break;
    }
    return titleActions;
  };

  const contextualMenu = [
    {
      key: 'add',
      theme: 'other',
      onPress: () => onPressAddElement(),
    },
  ];
  const editingContextualMenu = [
    {key: 'close', onPress: () => closeIndividualElementPage(), theme: 'other'},
    ...contextualMenu,
  ];

  useEffect(() => {}, [params]);
  dispatch(
    setContextualMenu(
      params.isEditing ? editingContextualMenu : contextualMenu,
    ),
  );

  return (
    <Page theme={currentTheme}>
      {params.isEditing ? (
        <ScrollView>
          <Text style={elementPageStyle(currentTheme).pageTitle}>
            {`Create ${elementType}`}
          </Text>
          {children}
        </ScrollView>
      ) : (
        <>
          <Text
            style={
              elementPageStyle(currentTheme).pageTitle
            }>{`${elementType}s`}</Text>
          <FlatList
            keyExtractor={item => `${item.id}`}
            data={elements}
            contentContainerStyle={elementPageStyle(currentTheme).content}
            renderItem={({item}) => (
              <Card
                type={elementType}
                title={item.title}
                actions={elementPageActions(elementType, item, dispatch)}
                optionalSideMenu={getSideMenu(elementType)}
                optionalTitleActions={getTitleActions(elementType)}
                element={item}>
                {item.content}
              </Card>
            )}
          />
        </>
      )}
    </Page>
  );
};

const elementPageStyle = theme => {
  const borderRadius = 8;
  return StyleSheet.create({
    content: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    pageTitle: {
      fontSize: 18,
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    horizontalInputContainer: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginBottom: 10,
    },
    verticalInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: 5,
      borderWidth: 1,
      borderRadius: borderRadius,
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
    contentInputView: {
      flexDirection: 'row',
    },
    contentInput: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
    attachmentButton: {
      width: 40,
      padding: 5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderLeftWidth: 0,
      backgroundColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderBottomRightRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
    attachmentText: {
      fontSize: 18,
      color:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
    },
  });
};
export default ElementPage;
