import forEach from 'lodash/forEach';

export class StateEmitter {

  constructor() {
    this.__before = {};
    this.__after = {};
  }

  before(name, fn) {
    if ( !(name in this.__before) ) {
      this.__before[name] = [];
    }

    this.__before[name].push(fn);
  }

  after(name, fn) {
    if ( !(name in this.__after) ) {
      this.__after[name] = [];
    }

    this.__after[name].push(fn);
  }

  emitBefore(name, store, prevState) {
    this.__emit(this.__before, name, store, prevState);
  }

  emitAfter(name, store, nextState) {
    this.__emit(this.__after, name, store, nextState);
  }

  __emit(handles, name, store, state) {
    forEach(handles[name], fn => {
      fn(store, state);
    });
  }

}