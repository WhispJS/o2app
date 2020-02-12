import React, {useEffect} from 'react';
import Page from '../components/Page/Page';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getNotes} from '../store/note/note.selectors';
import {getTasks} from '../store/task/task.selectors';
import {getEvents} from '../store/event/event.selectors';
import OrderCardList from '../components/OrderedCardList/OrderedCardList';
import {removeContextMenu} from '../store/navigation/navigation.actions';

const Main = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const notes = useSelector(getNotes);
  const tasks = useSelector(getTasks);
  const events = useSelector(getEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeContextMenu());
  }, []);

  return (
    <Page theme={currentTheme}>
      <OrderCardList
        data={[
          {key: 'task', data: [...tasks]},
          {key: 'note', data: [...notes]},
          {key: 'event', data: [...events]},
        ]}
      />
    </Page>
  );
};

export default Main;
