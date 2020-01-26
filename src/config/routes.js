import Main from "../pages/Main";
import SettingsPage from "../pages/SettingsPage";
import Profile from "../pages/Profile";
import TaskPage from "../pages/TaskPage";
import NotePage from "../pages/NotePage";
import EventPage from "../pages/EventPage";

export const paths = {
  home: "home",
  settings: "settings",
  profile: "profile",
  task: "task",
  note: "note",
  event: "event"
};

const routes = [
  { path: paths.home, component: Main },
  { path: paths.settings, component: SettingsPage },
  { path: paths.profile, component: Profile },
  { path: paths.task, component: TaskPage },
  { path: paths.note, component: NotePage },
  { path: paths.event, component: EventPage }
];

export default routes;
