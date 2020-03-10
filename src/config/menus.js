const actions = (type, element) => {
  return [
    {key: 'share'},
    {
      key: 'edit',
      onPress: () => {
        dispatch(goTo(paths[type], {[type]: element, isEditing: true}));
      },
    },
    {
      key: 'delete',
      onPress: () => {
        switch (type) {
          case themeFields.items.note:
            dispatch(deleteNote(element));
            break;
          case themeFields.items.task:
            dispatch(deleteTask(element));
            break;
          case themeFields.items.event:
            break;
        }
      },
    },
    {
      key: 'add',
      onPress: () =>
        dispatch(
          goTo(paths[type], {
            [type]: emptyElement[type],
            isEditing: true,
          }),
        ),
    },
  ];
};
