import test from 'tape';
import { double, doubleXTimes, doubleEach } from './index';

test( 'double fn', function ( test ) {
  // GWT: Given-When-Then
  const actual = double( 2 );
  let expected = 4;

  test.equal( actual, expected, 'should double the number' );

  test.end();
});

test( 'doubleXTimes', function ( test ) {
  const actual = doubleXTimes( 2, 4 );
  const expected = 32;

  test.equal( actual, expected, 'should double the number four times' );

  test.end();
});

test( 'doubleEach', function ( test ) {
  const actual = doubleEach([ 0, 1, 2, 3, 4 ]);
  const expected = [ 0, 2, 4, 6, 8 ];

  // { one: 1 } !== { one: 1 }
  // { one: { two: 2 } } !== { one: { two: 2 } }
  // but they are deeply equal

  test.deepEqual( actual, expected, 'should double the number four times' );

  test.end();
});

