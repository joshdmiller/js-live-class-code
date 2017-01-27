import shortid from 'shortid';

const TodoPrototype = {
  complete: false,

  getTitle () {
    return this.title;
  },

  isComplete () {
    return this.complete === true;
  },

  toggleComplete () {
    this.complete = ! this.complete;
  },

  setTitle ( title ) {
    this.title = title;
  },

  getId () {
    return this.id;
  },
};

export default todo => {
  if ( typeof todo !== 'object' ) {
    return {
      id: shortid.generate(),
      title: todo,

      ...TodoPrototype,
    };
  }

  return {
    ...TodoPrototype,
    ...todo,
  };
};

