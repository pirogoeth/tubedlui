import { cloneState } from './index';
import { StateEmitter } from './emitter';
import { calculateNextState } from './utils';

import { loggerStubsPlugin } from './plugins/logger';

export class StoreProxy {

  constructor(actions, store, emitter) {
    this.actions = actions;
    this.__emitter = new StateEmitter();
    this.__hooks = {};
    this.__store = { ...store };
    this.__storeHistory = [];
    this.__plugins = [];

    this.__storeHistory.push({ ...this.__store });

    for ( var name in this.actions ) {
      this[name] = this.performAction.bind(this, this.actions[name]);
    }

    this.use(loggerStubsPlugin);
  }

  get emitter() {
    return this.__emitter;
  }

  get hooks() {
    return new Proxy(this.__hooks, {
      get: (target, name) => {
        if ( target[name] === undefined ) {
          return () => null;
        }

        return target[name];
      },
      // set: (target, name, value) => {
      //   target[name] = value;
      //   return true;
      // },
    });
  }

  get state() {
    return new Proxy(this.__store, {
      get: (target, name) => {
        return target[name];
      },
      set: (target, name, value) => {
        throw new Error('Can not mutate state values');
      },
    });
  }

  __makeProxyContext(updateState) {
    let context = {
      prev: cloneState(this.__store),
      next: updateState,
    };

    let proxyState = new Proxy(context, {
      get: (target, prop, receiver) => {
        // Return previousState value
        return target.prev[prop];
      },
      set: (target, prop, value) => {
        console.log('updating updateState', prop, value);
        target.next[prop] = value;
        return true;
      },
    });

    return [ proxyState, context ];
  }

  use(plugin) {
    this.hooks.logPluginUse(plugin);

    this.__plugins.push(plugin);
    plugin.install(this);
  }

  mutate(targetState, trigger = 'mutation') {
    let previousState = Object.assign({}, this.state);
    let nextState = Object.assign({}, previousState, targetState);

    this.hooks.logStateChange(trigger, previousState, nextState);

    this.__store = nextState;
    this.__storeHistory.push(this.__store);
  }

  performAction(fn, ...args) {
    if ( !fn in this.actions ) {
      this.hooks.logActionError(fn, 'not an action');
    }

    // Emit events and catch mutations from reactors
    this.emitter.emitBefore(fn.name, this, cloneState(this.state));

    let previousState = cloneState(this.state);
    let updateState = Object.create(null);
    let proxyState = this.__makeProxyContext(updateState);

    let retVal = fn.apply(proxyState, args);

    this.emitter.emitAfter(fn.name, this, updateState);

    this.hooks.logStateChange(fn, previousState, updateState, true);

    this.__store = calculateNextState(previousState, updateState);
    this.__storeHistory.push(this.__store);
    
    return retVal;
  }
}