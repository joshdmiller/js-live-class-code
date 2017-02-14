import Todo from './Todo';
import compose from './compose';
import State from './mixins/state';
import notifyMixin from './mixins/notify';
import 'whatwg-fetch';

const initialState = {
  todos: [],
  filtered: false,
};

const API_URI = 'http://localhost:3000';

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

    addTodo ( title ) {
      const { todos } = this.getState();

      fetch( `${API_URI}/todos`, {
        method: 'POST',
        body: JSON.stringify({
          title,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then( res => res.json() )
      .then( todo => Todo( todo ) )
      .then( todo => this.setState({ todos: [ ...todos, todo ] }) )
      ;
    },

    rmTodo ( id ) {
      const { todos } = this.getState();
      fetch( `${API_URI}/todos/${id}`, {
        method: 'DELETE',
      })
      .then( () => this.setState({
        todos: todos.filter( t => t.getId() !== id ),
      }))
      ;
    },

    setTodos ( todos ) {
      this.setState({ todos });
    },

    toggleComplete ( id ) {
      const { todos } = this.getState();
      const todo = todos.find( t => t.getId() === id );

      fetch( `${API_URI}/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          complete: ! todo.isComplete(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then( res => res.json() )
      .then( todo => Todo ( todo ) )
      .then( todo => todos.map( t => {
        if ( t.getId() === id ) {
          return todo;
        }

        return t;
      }))
      .then( todos => this.setState({ todos }) )
      ;
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

  const app = compose(
    notifyMixin,
    stateMixin,
    TodoAppPrototype
  );

  // get the existing todos
  fetch( `${API_URI}/todos` )
    .then( response => response.json() )
    .then( todos => todos.map( t => Todo( t ) ) )
    .then( todos => app.setTodos( todos ) )
    ;

  return app;
};

