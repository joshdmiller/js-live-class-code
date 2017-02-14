import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import db from './api';

const app = express();

app.use( bodyParser() );
app.use( cors() );

app.get( '/', ( req, res ) => {
  res.send( 'Hello there' );
});

app.get( '/todos', ( req, res ) => {
  db.get().then( todos => res.send( todos ) );
});

app.post( '/todos', ( req, res ) => {
  db.create( req.body.title ).then( todo => res.send( todo ) );
});

app.get( '/todos/:id', ( req, res ) => {
  db.getOne( req.params.id ).then( todo => res.send( todo ) );
});

app.put( '/todos/:id', ( req, res ) => {
  db.update( req.params.id, req.body ).then( todo => res.send( todo ) );
});

app.delete( '/todos/:id', ( req, res ) => {
  db.remove( req.params.id ).then( () => res.send({ status: 200, message: 'todo deleted' }) );
});

app.listen( 3000, () => console.log( `Server running on http://localhost:3000` ) );

