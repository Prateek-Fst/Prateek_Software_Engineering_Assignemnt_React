import { atom } from 'recoil';

export const tasksState = atom({
  key: 'tasksState',
  default: {
    'todo': [],
    'in-progress': [],
    'peer-review': [],
    'done': []
  }
});

export const searchState = atom({
  key: 'searchState',
  default: ''
});
