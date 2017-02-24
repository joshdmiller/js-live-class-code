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

export default ( $http ) => {
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

      $http.post( `${API_URI}/todos`, {
        title,
      })
      .then( res => res.data )
      .then( todo => Todo( todo ) )
      .then( todo => this.setState({ todos: [ ...todos, todo ] }) )
      ;
    },

    rmTodo ( id ) {
      const { todos } = this.getState();
      $http.delete( `${API_URI}/todos/${id}` )
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

      $http.put( `${API_URI}/todos/${id}`, {
        complete: ! todo.isComplete(),
      })
      .then( res => res.data )
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

    // FIXME: update for $http
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
  $http.get( `${API_URI}/todos` )
    .then( response => response.data )
    .then( todos => todos.map( t => Todo( t ) ) )
    .then( todos => app.setTodos( todos ) )
    ;

  return app;
};

