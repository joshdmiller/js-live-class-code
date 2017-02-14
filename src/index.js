import TodoApp from './TodoApp';

function onReady () {
  const app = TodoApp();

  const addTodoForm = document.getElementById( 'addTodoForm' );
  const todoList = document.getElementById( 'todoList' );
  const newTodoText = document.getElementById( 'newTodoText' );
  const toggleBtn = document.getElementById( 'toggleBtn' );

  addTodoForm.addEventListener( 'submit', event => {
    event.preventDefault();
    const title = newTodoText.value;

    app.addTodo( title );

    newTodoText.value = '';
  });

  toggleBtn.addEventListener( 'click', () => app.toggleFilter() );

  // ( state ) => ui
  const renderTheUi = ( todos ) => {
    // <ul></ul>
    todoList.textContent = '';

    todos.forEach( todo => {
      // add it to the list
      // create an li
      // <li>{title}</li>
      const newLi = document.createElement( 'li' );
      newLi.textContent = todo.getTitle(); // vs newLi.innerHTML

      if ( todo.isComplete() ) {
        newLi.classList.add( 'todo--complete' );
      }

      newLi.addEventListener( 'click', () => {
        app.toggleComplete( todo.getId() );
      });

      // put it in the ul
      todoList.appendChild( newLi );
    });
  };

  app.subscribe( () => renderTheUi( app.getTodos() ) );
  renderTheUi( app.getTodos() );
}

if ( document.readyState !== 'loading' ) {
  onReady();
} else {
  document.addEventListener( 'DOMContentLoaded', onReady );
}

