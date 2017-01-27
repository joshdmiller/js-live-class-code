import test from 'tape';
import TodoApp from './TodoApp';
import Todo from './Todo';

test( 'TodoApp', t => {
  let actual, expected, app;

  // app = TodoApp(); // use new if using a constructor

  actual = app.isFiltered();
  expected = false;
  t.deepEqual( actual, expected, 'should begin without a filter' );

  actual = app.getTodos();
  expected = [];
  t.deepEqual( actual, expected, 'should begin an empty set of todos' );

  app.addTodo( 'Test' );

  actual = app.getTodos().length;
  expected = 1;
  t.equal( actual, expected, 'addTodo should add a todo' );

  let [ todo ] = app.getTodos();
  actual = typeof todo.getTitle;
  actual = 'function';
  t.ok( actual, 'addTodo should add todos as Todo instances' );

  actual = todo.getTitle();
  expected = 'Test';
  t.equal( actual, expected, 'addTodo should set the title of the todo to that passed' );

  app.toggleFilter();
  todo.toggleComplete();
  actual = app.getTodos().length;
  expected = 0;
  t.equal( actual, expected, 'should use filter to hide todos' );

  app.toggleFilter();
  actual = app.getTodos().length;
  expected = 1;
  t.equal( actual, expected, 'should show all todos when filter removed' );

  app.rmTodo( todo.getId() );
  actual = app.getTodos().length;
  expected = 0;
  t.equal( actual, expected, 'rmTodo should remove a todo by its id' );

  app.setTodos([ Todo( '1' ), Todo( '2' ) ]); // use new if using a constructor
  actual = app.getTodos().length;
  expected = 2;
  t.equal( actual, expected, 'setTodos should replace all todos witht those provided' );

  app = TodoApp(); // use new if using a constructor
  app.addTodo({ id: '1', complete: false, title: 'One' });
  app.addTodo({ id: '2', complete: false, title: 'Two' });

  app.toggleComplete( '1' );
  let [ todo1, todo2 ] = app.getTodos();
  t.equal( todo1.isComplete(), true, 'toggleComplete should toggle the status of the todo' );
  t.equal( todo2.isComplete(), false, 'toggleComplete should not toggle other todos' );

  app.setTitle( '2', 'New' );
  [ todo1, todo2 ] = app.getTodos();
  t.equal( todo1.getTitle(), 'One', 'setTitle should not change other todos' );
  t.equal( todo2.getTitle(), 'New', 'setTitle should change the title of the todo' );

  t.end();
});

