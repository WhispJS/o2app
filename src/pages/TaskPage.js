import React from 'react';
import {Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {View} from 'react-native';
import LinkedElements from '../components/LinkedElements/LinkedElements';
import ElementPage from '../components/Page/ElementPage';
import {getCurrentElement} from '../store/element/element.selectors';
import {createOrUpdateElement} from '../store/element/element.actions';
import {themeFields} from '../config/style';
import {elementTypes} from '../config/meta';

const TaskPage = () => {
  // Selectors
  const currentTheme = useSelector(getCurrentTheme);
  const currentTask = useSelector(getCurrentElement);

  // Actions
  const dispatch = useDispatch();

  const onChangeTitle = ({nativeEvent}) => {
    dispatch(
      createOrUpdateElement(
        {...currentTask, title: nativeEvent.text},
        elementTypes.task,
      ),
    );
  };

  const onChangeContent = ({nativeEvent}) => {
    dispatch(
      createOrUpdateElement(
        {...currentTask, content: nativeEvent.text},
        elementTypes.task,
      ),
    );
  };

  return (
    <ElementPage type={elementTypes.task}>
      <View style={taskPageStyle(currentTheme).verticalInputContainer}>
        <Text style={taskPageStyle(currentTheme).inputLabel}>Task title</Text>
        <TextInput
          value={currentTask ? currentTask.title : ''}
          onChange={onChangeTitle}
          style={[taskPageStyle(currentTheme).input, {flex: 5}]}
        />
      </View>
      <View style={taskPageStyle(currentTheme).horizontalInputContainer}>
        <Text style={taskPageStyle(currentTheme).inputLabel}>Content</Text>
        <View style={taskPageStyle(currentTheme).contentInputView}>
          <TextInput
            value={currentTask ? currentTask.content : ''}
            multiline
            onChange={onChangeContent}
            style={[
              taskPageStyle(currentTheme).input,
              taskPageStyle(currentTheme).contentInput,
            ]}
          />
        </View>
      </View>
      <LinkedElements linked={currentTask ? currentTask.linked : []} />
    </ElementPage>
  );
};

const taskPageStyle = theme => {
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
  });
};
export default TaskPage;
