import { cloneState } from './index';
import { StateEmitter } from './emitter';

export class StoreProxy {

  constructor(actions, store, emitter) {
    this.actions = actions;
    this.__emitter = new StateEmitter();
    this.__store = { ...store };
    this.__storeHistory = [];

    this.__storeHistory.push(Object.assign({}, this.__store));

    for ( var name in this.actions ) {
      this[name] = this.performAction.bind(this, this.actions[name]);
    }
  }

  get emitter() {
    return this.__emitter;
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

  logActionError(fn, msg) {
    if ( !this.state.debug ) {
      return;
    }

    if ( this.state.noDebugColor ) {
      console.log(
        `could not run action function ${fn}: ${msg}`,
      );
    } else {
      console.log(
        `%ccould not run action function ${fn}: %c${msg}`,
        "color: #51e5ff",
        "color: #ec368d",
      );
    }
  }

  logStateChange(trigger, previousState, nextState) {
    if ( !this.state.debug ) {
      return;
    }

    let actionName = trigger;
    if ( trigger.name !== undefined ) {
      actionName = trigger.name;
    }

    if ( this.state.noDebugColor ) {
      console.log(
        `action: ${actionName}\n` +
        `prevState: ${JSON.stringify(previousState)}\n` +
        `nextState: ${JSON.stringify(nextState)}\n`,
      );
    } else {
      console.log(
        `%caction: %c${actionName}\n` +
        `%cprevState: %c${JSON.stringify(previousState)}\n` +
        `%cnextState: %c${JSON.stringify(nextState)}\n`,
        "color: #51e5ff",
        "color: #ffa5a5",
        "color: #ec368d",
        "color: #ffa5a5",
        "color: #b9d2b1",
        "color: #ffa5a5",
      );
    }
  }

  mutate(targetState, trigger = 'mutation') {
    let previousState = Object.assign({}, this.state);
    let nextState = Object.assign({}, previousState, targetState);

    this.logStateChange(trigger, previousState, nextState);

    this.__store = nextState;
    this.__storeHistory.push(nextState);
  }

  performAction(fn, ...args) {
    if ( !fn in this.actions ) {
      this.logActionError(fn, 'not an action');
    }

    // Emit events and catch mutations from reactors
    this.emitter.emitBefore(fn.name, this, cloneState(this.state));
    let previousState = cloneState(this.state);

    let nextState = Object.assign({}, previousState);
    let retVal = fn.apply(nextState, args);

    this.emitter.emitAfter(fn.name, this, nextState);

    this.logStateChange(fn, previousState, nextState);

    this.__store = nextState;
    this.__storeHistory.push(nextState);
    
    return retVal;
  }
}