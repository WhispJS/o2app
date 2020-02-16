import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {themeFields, icons} from '../config/style';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getTasks, getCurrentTask} from '../store/task/task.selectors';
import {StyleSheet} from 'react-native';
import {emptyTask} from '../store/task/task.reducer';
import {TextInput} from 'react-native';
import {View} from 'react-native';
import LinkedElements from '../components/LinkedElements/LinkedElements';
import ElementPage from '../components/Page/ElementPage';
import {createOrUpdateTask} from '../store/task/task.actions';

const TaskPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const tasks = useSelector(getTasks);
  const currentTask = useSelector(getCurrentTask);
  const dispatch = useDispatch();

  const onChangeTitle = ({nativeEvent}) => {
    dispatch(createOrUpdateTask({...currentTask, title: nativeEvent.text}));
  };

  const onChangeContent = ({nativeEvent}) => {
    dispatch(createOrUpdateTask({...currentTask, content: nativeEvent.text}));
  };

  return (
    <ElementPage
      elementType={themeFields.items.task}
      emptyElement={emptyTask}
      elements={tasks}>
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
