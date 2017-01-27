import test from 'tape';
import State from './state';

test( 'State', t => {
  let state, actual, expected;

  state = State();
  actual = state.getState();
  expected = {};
  t.deepEqual( actual, expected, 'should default to an empty object' );

  const initialState = { one: 1 };
  state = State( initialState );

  actual = state.getState();
  expected = initialState;
  t.deepEqual( actual, expected, 'should use provided state' );

  actual = JSON.stringify( state.getState() );
  expected = '{"one":1}';
  t.equal( actual, expected, 'should serialize only state to JSON' );

  t.end();
});

test( 'State::setState()', t => {
  let state, actual, expected;

  const initialState = { one: 1 };
  state = State( initialState );

  state.setState({ two: 2 });
  actual = state.getState();
  expected = { one: 1, two: 2 };
  t.deepEqual( actual, expected, 'should merge new state with old' );

  t.end();
});

