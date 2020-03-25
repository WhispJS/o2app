import React, {useEffect} from 'react';
import {Text, FlatList, ScrollView} from 'react-native';
import {themeFields} from '../../config/style';
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
import {elementPageActions} from '../../config/card-actions';
import {getElementsForType} from '../../store/element/element.selectors';
import {addAction} from '../../utils/actions';
import {task_switchState} from '../../store/element/element.actions';
import {elementTypes} from '../../config/meta';

const ElementPage = ({type, children}) => {
  // Selectors
  const params = useSelector(getPageParams);
  const elements = useSelector(getElementsForType(type));
  const currentTheme = useSelector(getCurrentTheme);

  // Misc
  const getSideMenu = () => {
    let sideMenu = [];
    switch (type) {
      case elementTypes.note:
        sideMenu = [{key: 'attachment', onPress: () => {}}];
        break;
    }
    return sideMenu;
  };

  const getTitleActions = () => {
    let titleActions = [];
    switch (type) {
      case elementTypes.task:
        titleActions = [
          {
            key: task => (task.done ? 'done' : 'undone'),
            onPress: task => dispatch(task_switchState(task)),
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
      onPress: () => addAction(type, dispatch).onPress(),
    },
  ];

  const editingContextualMenu = [
    {key: 'close', onPress: () => closeIndividualElementPage(), theme: 'other'},
    ...contextualMenu,
  ];

  // Effects
  useEffect(() => {
    dispatch(
      setContextualMenu(
        params.isEditing ? editingContextualMenu : contextualMenu,
      ),
    );
  }, [params]);

  // Actions
  const dispatch = useDispatch();

  const closeIndividualElementPage = () => {
    dispatch(goTo(paths[type], {isEditing: false}));
  };

  return (
    <Page>
      {params.isEditing ? (
        <ScrollView>
          <Text style={elementPageStyle(currentTheme).pageTitle}>
            {`Create ${type}`}
          </Text>
          {children}
        </ScrollView>
      ) : (
        <>
          <Text
            style={elementPageStyle(currentTheme).pageTitle}>{`${type}s`}</Text>
          <FlatList
            keyExtractor={item => `${item.id}`}
            data={elements}
            contentContainerStyle={elementPageStyle(currentTheme).content}
            renderItem={({item}) => (
              <Card
                type={type}
                title={item.title}
                actions={elementPageActions(type, item, dispatch)}
                optionalSideMenu={getSideMenu(type)}
                optionalTitleActions={getTitleActions(type)}
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
