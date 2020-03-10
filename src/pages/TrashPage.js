import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {textStyles, themeFields} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getTrashedElements} from '../store/trash/trash.selectors';
import Card from '../components/Card/Card';
import {FlatList} from 'react-native';
import {trashActions} from '../config/card-actions';
import {setContextualMenu} from '../store/navigation/navigation.actions';
import {emptyTrash, restoreElement} from '../store/trash/trash.actions';

const TrashPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const trashedElements = useSelector(getTrashedElements);
  const dispatch = useDispatch();

  const handleEmptyTrash = () => {
    dispatch(emptyTrash());
  };

  const contextMenu = [
    {key: 'delete', theme: 'other', onPress: () => handleEmptyTrash()},
  ];

  const getSideMenu = type => {
    let sideMenu = [];
    switch (type) {
      case themeFields.items.note:
        sideMenu = [{key: 'attachment', onPress: () => {}}];
        break;
    }
    return sideMenu;
  };

  useEffect(() => {
    dispatch(setContextualMenu(contextMenu));
  }, []);

  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>Trash</Text>
      <FlatList
        keyExtractor={item => `${item.type}${item.element.id}`}
        data={trashedElements}
        contentContainerStyle={trashPageStyle(currentTheme).content}
        renderItem={({item}) => (
          <Card
            type={item.type ? item.type : 'note'}
            title={item.element.title}
            actions={trashActions(item.type, item.element, dispatch)}
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
