import forEach from 'lodash/forEach';

export class StateEmitter {

  constructor() {
    this.__before = {};
    this.__after = {};
    this.__before_any = [];
    this.__after_any = [];
  }

  before(name, fn) {
    if ( !(name in this.__before) ) {
      this.__before[name] = [];
    }

    this.__before[name].push(fn);
  }

  beforeAny(fn) {
    this.__before_any.push(fn);
  }

  after(name, fn) {
    if ( !(name in this.__after) ) {
      this.__after[name] = [];
    }

    this.__after[name].push(fn);
  }

  afterAny(fn) {
    this.__after_any.push(fn);
  }

  emitBefore(name, store, prevState) {
    this.__emit(this.__before[name], store, prevState);
    this.__emit(this.__before_any, store, prevState, {
      type: name,
    });
  }

  emitAfter(name, store, nextState) {
    this.__emit(this.__after[name], store, nextState);
    this.__emit(this.__after_any, store, nextState, {
      type: name,
    });
  }

  __emit(handles, store, state, metadata = {}) {
    forEach(handles, fn => {
      fn(store, state, metadata);
    });
  }

}