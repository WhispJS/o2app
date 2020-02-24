import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {textStyles, themeFields} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getTrashedElements} from '../store/task/trash.selectors';
import Card from '../components/Card/Card';
import {FlatList} from 'react-native';

const TrashPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const trashedElements = useSelector(getTrashedElements);

  const getSideMenu = type => {
    let sideMenu = [];
    switch (type) {
      case themeFields.items.note:
        sideMenu = [{key: 'attachment', onPress: () => {}}];
        break;
    }
    return sideMenu;
  };
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>Trash</Text>
      <FlatList
        keyExtractor={item => `${item.type}${item.element.id}`}
        data={trashedElements}
        contentContainerStyle={trashPageStyle(currentTheme).content}
        renderItem={({item}) => (
          <Card
            type={item.type}
            title={item.element.title}
            optionalSideMenu={getSideMenu(item.type)}
            element={item.element}>
            {item.element.content}
          </Card>
        )}
      />
    </Page>
  );
};

const trashPageStyle = theme => {
  return StyleSheet.create({
    content: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });
};

export default TrashPage;