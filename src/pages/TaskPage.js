import React from 'react';
import {Text} from 'react-native';
import {textStyles, themeFields} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {FlatList} from 'react-native';
import Card from '../components/Card/Card';
import {StyleSheet} from 'react-native';
import {getTasks} from '../store/task/task.selectors';

const TaskPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const tasks = useSelector(getTasks);
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>Tasks</Text>
      <FlatList
        data={tasks}
        contentContainerStyle={taskPageStyle.content}
        renderItem={({item}) => (
          <Card type={themeFields.items.task} title={item.title}>
            {item.content}
          </Card>
        )}
      />
    </Page>
  );
};

const taskPageStyle = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
export default TaskPage;
