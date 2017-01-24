function onReady () {
  const addTodoForm = document.getElementById( 'addTodoForm' );
  const todoList = document.getElementById( 'todoList' );
  const newTodoText = document.getElementById( 'newTodoText' );

  // <ul></ul>
  todoList.textContent = '';

  addTodoForm.addEventListener( 'submit', event => {
    event.preventDefault();
    const title = newTodoText.value;

    // add it to the list
    // create an li
    // <li>{title}</li>
    const newLi = document.createElement( 'li' );
    newLi.textContent = title; // vs newLi.innerHTML

    newLi.addEventListener( 'click', () => {
      newLi.classList.toggle( 'todo--complete' );
    });

    // put it in the ul
    todoList.appendChild( newLi );

    newTodoText.value = '';
  });
}

if ( document.readyState !== 'loading' ) {
  onReady();
} else {
  document.addEventListener( 'DOMContentLoaded', onReady );
}

