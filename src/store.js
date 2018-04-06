let initialState = {
  debug: process.env.NODE_ENV === 'production' ? false : true,
  endpointClient: null,
};

var store = Object.assign({}, initialState);

let actions = {
  getEndpointClient() {
    return this.endpointClient;
  },
  setEndpointClient(client) {
    this.endpointClient = client;
  },
};

class StateProxy {
  storeProxy = {
    get: (target, name) => {
      return target[name];
    },
  };

  constructor(actions, store) {
    this.actions = actions;
    this.state = new Proxy(store, this.storeProxy);

    this.addActions();
  }

  performAction(fn, ...args) {
    let previousState = Object.assign({}, store);
    let nextState = Object.assign({}, previousState);
    let retVal = fn.apply(nextState, args);

    if ( store.debug ) {
      console.log(
        `%caction: %c${fn.name}\n` +
        `%cprevState: %c${JSON.stringify(previousState)}\n` +
        `%cnextState: %c${JSON.stringify(nextState)}`,
        "color: #51e5ff",
        "color: #ffa5a5",
        "color: #ec368d",
        "color: #ffa5a5",
        "color: #b9d2b1",
        "color: #ffa5a5",
      );
    }

    Object.assign(this.state, nextState);

    return retVal;
  }

  addActions() {
    for ( var name in this.actions ) {
      this[name] = this.performAction.bind(this, this.actions[name]);
    }
  }
}

export const state = new StateProxy(actions, store);
export default {
  install(Vue, options) {
    Vue.prototype.$store = state;
  },
}