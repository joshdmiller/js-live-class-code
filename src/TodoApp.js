import Todo from './Todo';

const TodoAppPrototype = {
  isFiltered () {
    return this.filtered === true;
  },

  toggleFilter () {
    this.filtered = ! this.filtered;
  },

  getTodos () {
    if ( this.isFiltered() ) {
      return this.todos.filter( t => ! t.isComplete() );
    }

    return this.todos;
  },

  addTodo ( todo ) {
    this.todos.push( Todo( todo ) );
  },

  rmTodo ( id ) {
    this.todos = this.todos.filter( t => t.getId() !== id );
  },

  setTodos ( todos ) {
    this.todos = todos;
  },

  toggleComplete ( id ) {
    this.todos.find( t => t.getId() === id ).toggleComplete();
  },

  setTitle ( id, title ) {
    this.todos.find( t => t.getId() === id ).setTitle( title );
  },
};

export default () => {
  return {
    todos: [],
    filtered: false,

    ...TodoAppPrototype,
  };
};


