import React from 'react';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );

    this.state = {
      newTodoText: '',
    };
  }

  submit ( event ) {
    event.preventDefault();
    debugger;
    this.props.addTodo( this.state.newTodoText );
    this.setState({ newTodoText: '' });
  }

  render () {
    const {
      todos,
      filtered,

      // callbacks
      toggleComplete,
      toggleFilter,
    } = this.props;

    const { newTodoText } = this.state;

    return (
      <div>
        <h1>The Todo App!</h1>
        
        <form onSubmit={::this.submit}>
          <label htmlFor="newTodoText">New Todo:</label>
          <input
            type="text"
            id="newTodoText"
            value={newTodoText}
            onChange={ev => this.setState({ newTodoText: ev.target.value })}
          />
          <button type="submit">Add Todo!</button>
        </form>
        
        <button onClick={toggleFilter}>Toggle Filter</button>
        
        <ul>
          { todos.map( t =>
            <li
              key={t.getId()}
              className={t.isComplete() ? 'todo--complete' : ''}
              onClick={() => toggleComplete( t.getId() )}
              >
              {t.getTitle()}
            </li>
          ) }
        </ul>
      </div>
    );
  }
}

