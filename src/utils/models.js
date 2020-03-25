import {elementTypes} from '../config/meta';

const noteModel = {
  version: '0.0',
  name: elementTypes.note,
  fields: [
    {name: 'title', required: true, default: ''},
    {name: 'content', required: false, default: ''},
    {name: 'attachments', required: true, default: []},
    {
      name: 'linked',
      required: true,
      fields: [
        {
          name: elementTypes.note,
          required: true,
          default: [],
        },
        {
          name: elementTypes.task,
          required: true,
          default: [],
        },
        {
          name: elementTypes.event,
          required: true,
          default: [],
        },
      ],
    },
  ],
};

const taskModel = {
  version: '0.0',
  name: elementTypes.task,
  fields: [
    {name: 'title', required: true, default: ''},
    {name: 'content', required: false, default: ''},
    {name: 'done', required: true, default: false},
    {
      name: 'linked',
      required: true,
      fields: [
        {
          name: elementTypes.note,
          required: true,
          default: [],
        },
        {
          name: elementTypes.task,
          required: true,
          default: [],
        },
        {
          name: elementTypes.event,
          required: true,
          default: [],
        },
      ],
    },
  ],
};

const eventModel = {
  version: '0.0',
  name: elementTypes.event,
  fields: [
    {name: 'title', required: true, default: ''},
    {
      name: 'linked',
      required: true,
      fields: [
        {
          name: elementTypes.note,
          required: true,
          default: [],
        },
        {
          name: elementTypes.task,
          required: true,
          default: [],
        },
        {
          name: elementTypes.event,
          required: true,
          default: [],
        },
      ],
    },
  ],
};

export const models = {
  [elementTypes.note]: noteModel,
  [elementTypes.task]: taskModel,
  [elementTypes.event]: eventModel,
};

export const createElementFromModel = model => {
  let element = {};

  model.fields.forEach(field => {
    if (!field.fields) {
      element = {
        ...element,
        [field.name]: field.default,
      };
    } else {
      field.fields.forEach(fieldField => {
        element = {
          ...element,
          [field.name]: {
            ...element[field.name],
            [fieldField.name]: fieldField.default,
          },
        };
      });
    }
  });
  return element;
};

export const updateElementToModel = (model, element) => {
  let updatedElement = {};

  model.fields.forEach(field => {
    if (!field.fields) {
      updatedElement = {
        ...updatedElement,
        [field.name]:
          element && element[field.name] ? element[field.name] : field.default,
      };
    } else {
      field.fields.forEach(fieldField => {
        updatedElement = {
          ...updatedElement,
          [field.name]: {
            ...updatedElement[field.name],
            [fieldField.name]:
              element &&
              element[field.name] &&
              element[field.name][fieldField.name]
                ? element[field.name][fieldField.name]
                : fieldField.default,
          },
        };
      });
    }
  });
  return updatedElement;
};
