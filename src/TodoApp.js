import Todo from './Todo';
import compose from './compose';
import State from './mixins/state';
import notifyMixin from './mixins/notify';

const initialState = {
  todos: [],
  filtered: false,
};

export default () => {
  const stateMixin = State( initialState );

  const TodoAppPrototype = {
    isFiltered () {
      return this.getState().filtered === true;
    },

    toggleFilter () {
      const { filtered } = this.getState();
      this.setState({ filtered: ! filtered });
    },

    getTodos () {
      const { todos } = this.getState();

      if ( this.isFiltered() ) {
        return todos.filter( t => ! t.isComplete() );
      }

      return todos;
    },

    addTodo ( todo ) {
      const { todos } = this.getState();
      this.setState({ todos: [ ...todos, Todo( todo ) ] });
    },

    rmTodo ( id ) {
      const { todos } = this.getState();
      this.setState({
        todos: todos.filter( t => t.getId() !== id ),
      });
    },

    setTodos ( todos ) {
      this.setState({ todos });
    },

    toggleComplete ( id ) {
      const { todos } = this.getState();
      const todo = todos.find( t => t.getId() === id );
      todo.toggleComplete();

      this.setState({
        todos: todos.map( t => {
          if ( t.getId() === id ) {
            return todo;
          }

          return t;
        }),
      });
    },

    setTitle ( id, title ) {
      const { todos } = this.getState();
      const todo = todos.find( t => t.getId() === id );
      todo.setTitle( title );

      this.setState({
        todos: todos.map( t => {
          if ( t.getId() === id ) {
            return todo;
          }

          return t;
        }),
      });
    },

    setState ( newState ) {
      stateMixin.setState.call( this, newState );
      this.notify();
    }
  };

  return compose(
    notifyMixin,
    stateMixin,
    TodoAppPrototype
  );
};

