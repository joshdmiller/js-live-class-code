export default {
  _subscribers: [],

  subscribe ( fn ) {
    this._subscribers.push( fn );

    return () => this.unsubscribe( fn );
  },

  unsubscribe ( fn ) {
    this._subscribers = this._subscribers.filter( f => f !== fn );
  },

  notify () {
    this._subscribers.forEach( fn => fn() );
  },
};

