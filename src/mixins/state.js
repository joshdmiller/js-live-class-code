export default initialState => {
  let _state = initialState || {};

  return {
    getState () {
      return { ..._state };
    },

    setState ( newState ) {
      _state = {
        ..._state,
        ...newState,
      };
    },

    toJSON () {
      return this.getState();
    },
  };
};

