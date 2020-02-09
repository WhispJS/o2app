import React, {useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {textStyles, themeFields} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getNotes} from '../store/note/note.selectors';
import Card from '../components/Card/Card';
import {StyleSheet} from 'react-native';
import {setContextualMenu} from '../store/navigation/navigation.actions';
import {emptyNote} from '../store/note/note.reducer';
import {TextInput} from 'react-native';
import {View} from 'react-native';
import OrderCardList from '../components/OrderedCardList/OrderedCardList';
import {getTasks} from '../store/task/task.selectors';
import {getEvents} from '../store/event/event.selectors';
import Color from 'color';

const NotePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const currentTheme = useSelector(getCurrentTheme);
  const notes = useSelector(getNotes);
  const tasks = useSelector(getTasks);
  const events = useSelector(getEvents);
  const [currentNote, setCurrentNote] = useState(emptyNote);
  const dispatch = useDispatch();
  const openIndividualNotePage = () => {
    setIsEditing(true);
    dispatch(
      setContextualMenu([
        {key: 'close', onPress: () => closeIndividualNotePage()},
        ...contextualMenu,
      ]),
    );
  };
  const closeIndividualNotePage = () => {
    setIsEditing(false);
    dispatch(setContextualMenu(contextualMenu));
  };
  const onPressAddNote = () => {
    openIndividualNotePage();
    setCurrentNote(emptyNote);
  };
  const onPressEditNote = note => {
    openIndividualNotePage();
    setCurrentNote(note);
  };

  const onChangeTitle = ({nativeEvent}) => {
    const updatedNote = {...currentNote, title: nativeEvent.text};
    setCurrentNote(updatedNote);
  };
  const onChangeContent = ({nativeEvent}) => {
    const updatedNote = {...currentNote, content: nativeEvent.text};
    setCurrentNote(updatedNote);
  };
  const contextualMenu = [
    {
      key: 'add',
      onPress: () => onPressAddNote(),
    },
  ];
  useEffect(() => {
    dispatch(setContextualMenu(contextualMenu));
  }, []);
  return (
    <Page theme={currentTheme}>
      {isEditing ? (
        <>
          <Text style={textStyles(currentTheme).general}>Note creation</Text>
          <View
            style={
              notePageStyle(currentTheme, themeFields.items.general)
                .verticalInputContainer
            }>
            <Text
              style={
                notePageStyle(currentTheme, themeFields.items.general)
                  .inputLabel
              }>
              Titre
            </Text>
            <TextInput
              value={currentNote.title}
              onChange={onChangeTitle}
              style={
                notePageStyle(currentTheme, themeFields.items.general).input
              }
            />
          </View>
          <View style={notePageStyle(currentTheme).horizontalInputContainer}>
            <Text style={notePageStyle(currentTheme).inputLabel}>Contenu</Text>
            <TextInput
              value={currentNote.content}
              onChange={onChangeContent}
              style={
                notePageStyle(currentTheme, themeFields.items.general).input
              }
            />
          </View>
          {currentNote.linked.map(elem => (
            <View
              style={
                notePageStyle(currentTheme, elem.key).linkedElementContainer
              }>
              <Text
                style={
                  notePageStyle(currentTheme, elem.key).linkedElementTitle
                }>
                {elem.key}
              </Text>
              <View
                style={notePageStyle(currentTheme, elem.key).linkedElementList}>
                {elem.data.map(element => (
                  <Text
                    style={notePageStyle(currentTheme, elem.key).linkedElement}>
                    {element.title}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={textStyles(currentTheme).general}>Notes</Text>
          <FlatList
            data={notes}
            contentContainerStyle={notePageStyle.content}
            renderItem={({item}) => (
              <Card type={themeFields.items.note} title={item.title}>
                {item.content}
              </Card>
            )}
          />
        </>
      )}
    </Page>
  );
};

const notePageStyle = (theme, type) => {
  const borderRadius = 8;
  return StyleSheet.create({
    content: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    horizontalInputContainer: {
      flexDirection: 'column',
      alignItems: 'stretch',
      flex: 2,
      marginBottom: 10,
    },
    verticalInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 6,
      padding: 5,
      borderWidth: 1,
      borderRadius: 8,
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
    linkedElementList: {
      padding: 5,
      flex: 5,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      backgroundColor: Color(
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      ).lighten(0.6),
    },
    linkedElementTitle: {
      flex: 1,
      padding: 5,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      backgroundColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    linkedElementContainer: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 10,
    },
    linkedElement: {},
  });
};
export default NotePage;
