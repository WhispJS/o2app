import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {themeFields, icons} from '../config/style';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getNotes, getCurrentNote} from '../store/note/note.selectors';
import {StyleSheet} from 'react-native';
import {emptyNote} from '../store/note/note.reducer';
import {TextInput} from 'react-native';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import LinkedElements from '../components/LinkedElements/LinkedElements';
import ElementPage from '../components/Page/ElementPage';
import {createOrUpdateNote} from '../store/note/note.actions';

const NotePage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentNote = useSelector(getCurrentNote);
  const notes = useSelector(getNotes);
  const dispatch = useDispatch();

  const onChangeTitle = ({nativeEvent}) => {
    dispatch(createOrUpdateNote({...currentNote, title: nativeEvent.text}));
  };

  const onChangeContent = ({nativeEvent}) => {
    dispatch(createOrUpdateNote({...currentNote, content: nativeEvent.text}));
  };

  const onChangeLinked = value => {};
  return (
    <ElementPage
      elementType={themeFields.items.note}
      emptyElement={emptyNote}
      elements={notes}>
      <View style={notePageStyle(currentTheme).verticalInputContainer}>
        <Text style={notePageStyle(currentTheme).inputLabel}>Note title</Text>
        <TextInput
          value={currentNote ? currentNote.title : ''}
          onChange={onChangeTitle}
          style={[notePageStyle(currentTheme).input, {flex: 5}]}
        />
      </View>
      <View style={notePageStyle(currentTheme).horizontalInputContainer}>
        <Text style={notePageStyle(currentTheme).inputLabel}>Content</Text>
        <View style={notePageStyle(currentTheme).contentInputView}>
          <TextInput
            value={currentNote ? currentNote.content : ''}
            multiline
            onChange={onChangeContent}
            style={[
              notePageStyle(currentTheme).input,
              notePageStyle(currentTheme).contentInput,
            ]}
          />
          <TouchableOpacity
            style={notePageStyle(currentTheme).attachmentButton}>
            <Text style={notePageStyle(currentTheme).attachmentText}>
              {(currentNote ? currentNote.attachments : []).length}
            </Text>
            <Icon
              name={icons.attachment}
              type={icons.type}
              size={25}
              color={
                currentTheme.colors[themeFields.items.general][
                  themeFields.styles.secondaryColor
                ]
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <LinkedElements
        linked={currentNote ? currentNote.linked : []}
        elementType={themeFields.items.note}
        onChangeLinked={onChangeLinked}
      />
    </ElementPage>
  );
};

const notePageStyle = theme => {
  const borderRadius = 8;
  return StyleSheet.create({
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
export default NotePage;
