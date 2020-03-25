import Main from '../pages/Main';
import SettingsPage from '../pages/SettingsPage';
import Profile from '../pages/Profile';
import TaskPage from '../pages/TaskPage';
import NotePage from '../pages/NotePage';
import EventPage from '../pages/EventPage';
import TrashPage from '../pages/TrashPage';
import {elementTypes} from './meta';

export const paths = {
  home: 'home',
  settings: 'settings',
  profile: 'profile',
  [elementTypes.task]: elementTypes.task,
  [elementTypes.note]: elementTypes.note,
  [elementTypes.event]: elementTypes.event,
  trash: 'trash',
};

const routes = [
  {path: paths.home, component: Main},
  {path: paths.settings, component: SettingsPage},
  {path: paths.profile, component: Profile},
  {path: paths.task, component: TaskPage},
  {path: paths.note, component: NotePage},
  {path: paths.event, component: EventPage},
  {path: paths.trash, component: TrashPage},
];

export default routes;
