export function double ( x ) {
  return x * 2;
}

export function doubleXTimes ( x, num ) {
  let result = x;

  // i++ === i = i + 1
  // what is the difference between using let and var?
  for ( let i = 0; i < num; i++ ) {
    // result = result * 2;
    result = double( result ); // internal implementation detail
  }

  return result;
}

export const doubleEach = arr => arr.map( x => double( x ) );

// export function doubleEach ( arr ) {
//   // let result = [];

//   return arr.map( x => double( x ) );
//   // return arr.map( function ( x ) {
//   //   return double ( x );
//   // });

//   // arr.forEach( x => result.push( double( x ) ) );
//   // arr.forEach( function ( x, i ) {
//   //   // result.push( double( x ) );
//   //   result.push( double( arr[ i ] ) );
//   // });

//   // for ( let i = 0; i < arr.length; i++ ) {
//   //   // result.push( arr[i] * 2 );
//   //   result.push( double( arr[i] ) );
//   // }

//   // return result;
// }

