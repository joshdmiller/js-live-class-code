import Vue from 'vue/dist/vue.esm.js';
import TodoApp from './TodoApp';

function onReady () {
  const app = TodoApp();

  const vueApp = new Vue({
    el: '#app',
    data: {
      newTodoText: '',
      todos: app.getTodos(),
    },
    methods: {
      toggleComplete ( todo ) {
        app.toggleComplete( todo.getId() );
      },

      toggleFilter () {
        app.toggleFilter();
      },

      addTodo () {
        app.addTodo( this.newTodoText );
        this.newTodoText = '';
      },
    },
  });

  // ( state ) => ui
  const renderTheUi = ( todos ) => {
    vueApp.todos = todos;
  };

  app.subscribe( () => renderTheUi( app.getTodos() ) );
}

if ( document.readyState !== 'loading' ) {
  onReady();
} else {
  document.addEventListener( 'DOMContentLoaded', onReady );
}

