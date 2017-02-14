import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import App from './components/app';

const app = TodoApp();

// addTodoForm.addEventListener( 'submit', event => {
//   event.preventDefault();
//   const title = newTodoText.value;

//   app.addTodo( title );

//   newTodoText.value = '';
// });

// toggleBtn.addEventListener( 'click', () => app.toggleFilter() );

// ( state ) => ui
const renderTheUi = todos => ReactDOM.render(
  <App
    todos={todos}
    filtered={app.isFiltered()}
    toggleComplete={id => app.toggleComplete( id )}
    addTodo={title => app.addTodo( title )}
    toggleFilter={() => app.toggleFilter()}
  />
, document.getElementById( 'app' ) );

app.subscribe( () => renderTheUi( app.getTodos() ) );
renderTheUi( app.getTodos() );

