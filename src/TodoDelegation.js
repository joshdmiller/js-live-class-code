import shortid from 'shortid';

const TodoPrototype = {
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

function Todo ( todo ) {
  if ( ! this ) {
    // What the `new` keyword is doing:
    // todo = Object.create( Todo.prototype );
    // Todo.call( todo, testTodo );

    return new Todo( todo );
  }

  if ( typeof todo !== 'object' ) {
    this.id = shortid.generate();
    this.title = todo;
    this.complete = false;
  } else {
    this.id = todo.id;
    this.title = todo.title;
    this.complete = todo.complete;
  }
};

Todo.prototype = TodoPrototype;

export default Todo;

