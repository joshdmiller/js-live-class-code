import shortid from 'shortid';

export default {
  _todos: [
    {
      id: '1',
      title: 'First todo',
      complete: false,
    },
    {
      id: '2',
      title: 'Second todo',
      complete: true,
    },
    {
      id: '3',
      title: 'Third todo',
      complete: false,
    },
  ],

  get () {
    return new Promise( ( resolve, reject ) => {
      // TODO: flesh me out
    });
  },

  create ( title ) {
    return new Promise( ( resolve, reject ) => {
      // TODO: flesh me out
    });
  },

  getOne ( id ) {
    return new Promise( ( resolve, reject ) => {
      // TODO: flesh me out
    });
  },

  update ( id, props ) {
    return new Promise( ( resolve, reject ) => {
      // TODO: flesh me out
    });
  },

  remove ( id ) {
    return new Promise( ( resolve, reject ) => {
      // TODO: flesh me out
    });
  },
};

