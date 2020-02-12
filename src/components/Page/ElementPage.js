import React, {useEffect, useState} from 'react';
import {Text, FlatList, ScrollView} from 'react-native';
import {textStyles, themeFields, icons, general} from '../../config/style';
import Page from './Page';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {setContextualMenu} from '../../store/navigation/navigation.actions';
import Card from '../Card/Card';

const ElementPage = ({
  elementType,
  emptyElement,
  elementEdited,
  elements,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const currentTheme = useSelector(getCurrentTheme);
  const [currentElement, setCurrentElement] = useState(
    elementEdited ? elementEdited : emptyElement,
  );
  const dispatch = useDispatch();

  const openIndividualElementPage = () => {
    setIsEditing(true);
    dispatch(setContextualMenu(editingContextualMenu));
  };

  const closeIndividualElementPage = () => {
    setIsEditing(false);
  };

  const onPressAddElement = () => {
    openIndividualElementPage();
    setCurrentElement(emptyElement);
  };

  const onPressDeleteElement = () => {
    closeIndividualElementPage();
  };

  const onPressEditElement = element => {
    openIndividualElementPage();
    setCurrentElement(element);
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
        titleActions = [{key: 'complete', onPress: () => {}}];
        break;
    }
    return titleActions;
  };

  const contextualMenu = [
    {
      key: 'add',
      onPress: () => onPressAddElement(),
    },
  ];
  const editingContextualMenu = [
    {key: 'close', onPress: () => closeIndividualElementPage()},
    ...contextualMenu,
    {key: 'delete', onPress: () => onPressDeleteElement()},
  ];

  useEffect(() => {
    dispatch(
      setContextualMenu(isEditing ? editingContextualMenu : contextualMenu),
    );
  }, [isEditing]);

  return (
    <Page theme={currentTheme}>
      {isEditing ? (
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
