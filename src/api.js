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
      resolve( this._todos );
    });
  },

  create ( title ) {
    return new Promise( ( resolve, reject ) => {
      const todo = {
        title,
        complete: false,
        id: shortid.generate(),
      };

      this._todos.push( todo );

      resolve( todo );
    });
  },

  getOne ( id ) {
    return new Promise( ( resolve, reject ) => {
      const todo = this._todos.find( t => t.id === id );

      if ( todo ) {
        return resolve( todo );
      }

      return reject();
    });
  },

  update ( id, props ) {
    return new Promise( ( resolve, reject ) => {
      let todo;

      this._todos = this._todos.map( t => {
        if ( t.id !== id ) {
          return t;
        }

        todo = {
          ...t,
          ...props,
          id,
        };

        return todo;
      });

      resolve( todo );
    });
  },

  remove ( id ) {
    return new Promise( ( resolve, reject ) => {
      this._todos = this._todos.filter( t => t.id !== id );

      resolve();
    });
  },
};

