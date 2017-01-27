import shortid from 'shortid';

export default t => {
  let todo = t;

  if ( typeof t !== 'object' ) {
    todo = {
      id: shortid.generate(),
      title: t,
      complete: false,
    };
  }

  return {
    getTitle () {
      return todo.title;
    },

    isComplete () {
      return todo.complete === true;
    },

    toggleComplete () {
      todo.complete = ! todo.complete;
    },

    setTitle ( title ) {
      todo.title = title;
    },

    getId () {
      return todo.id;
    },
  };
};

