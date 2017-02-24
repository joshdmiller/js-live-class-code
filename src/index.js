import angular from 'angular';

import TodoApp from './TodoApp';

// ( state ) => ui
// const renderTheUi = ( todos ) => {
// };

class TodoController {
  constructor ( app ) {
    this.app = app;

    app.subscribe( () => this.renderTheUi( app.getTodos() ) );
    this.renderTheUi( app.getTodos() );
  }

  renderTheUi ( todos ) {
    this.state = {
      todos,
    };
  }

  addTodo () {
    this.app.addTodo( this.newTodoText );

    this.newTodoText = '';
  }

  toggleFilter () {
    this.app.toggleFilter();
  }

  toggleComplete ( todo ) {
    this.app.toggleComplete( todo.getId() );
  }
}

angular.module( 'todoApp', [] )
  .controller( 'TodoController', TodoController )
  .service( 'app', TodoApp ) // singletons
;

