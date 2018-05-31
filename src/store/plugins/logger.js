import { calculateNextState } from '@/store/utils';

function installLogger(store, logDefault, actionError, pluginUse, stateChange, stateMutate, stateUpdate) {
  store.hooks.logDefault = logDefault;
  store.hooks.logActionError = actionError;
  store.hooks.logPluginUse = pluginUse;
  store.hooks.logStateChange = stateChange;
  store.hooks.logStateMutate = stateMutate;
  store.hooks.logStateUpdate = stateUpdate;
};

function uninstallLogger(store) {
  delete store.hooks.logDefault;
  delete store.hooks.logActionError;
  delete store.hooks.logPluginUse;
  delete store.hooks.logStateChange;
  delete store.hooks.logStateMutate;
  delete store.hooks.logStateUpdate;
};

export const colors = {
  okay: '#51e5ff',
  warn: '#ec368d',
  success: '#b9d2b1',
  info: '#9cafb7',
  notice: '#ffa5a5',
};

export const loggerStubsPlugin = {
  name: 'loggerStubs',
  install(store) {
    let logDefault = (...args) => {};
    let logActionError = (fn, msg) => {};
    let logPluginUse = (plugin) => {};
    let logStateChange = (trigger, previousState, updateState, isUpdate = false) => {};
    let logStateMutate = (trigger, previousState, nextState) => {};
    let logStateUpdate = (trigger, previousState, updateState) => {};

    installLogger(
      store,
      logDefault,
      logActionError,
      logPluginUse,
      logStateChange,
      logStateMutate,
      logStateUpdate,
    );
  },
  uninstall(store) {
    uninstallLogger(store);
  },
};

export const loggerPlugin = {
  name: 'consoleLogger',
  install(store) {
    uninstallLogger(store);

    let logDefault = (...args) => {
      if ( !store.state.debug ) {
        return;
      }

      console.log(...args);
    };

    let logActionError = (fn, msg) => {
      if ( !store.state.debug ) {
        return;
      }

      if ( store.state.noDebugColor ) {
        console.log(
          `could not run action function ${fn}: ${msg}`,
        );
      } else {
        console.log(
          `%ccould not run action function ${fn}: %c${msg}`,
          `color: ${colors.okay}`,
          `color: ${colors.warn}`,
        );
      }
    };

    let logPluginUse = (plugin) => {
      if ( !store.state.debug ) {
        return;
      }

      if ( store.state.noDebugColor ) {
        console.log(
          `store: now using plugin: ${plugin.name}`
        );
      } else {
        console.log(
          `%cstore: %cnow using plugin: %c${plugin.name}`,
          `color: ${colors.okay}`,
          `color: ${colors.notice}`,
          `color: ${colors.success}`,
        );
      }
    };

    let logStateMutate = (trigger, previousState, nextState) => {
      if ( store.state.noDebugColor ) {
        console.log(
          `mutation: ${trigger}\n` +
          `prevState: ${JSON.stringify(previousState)}\n` +
          `nextState: ${JSON.stringify(nextState)}\n`,
        );
      } else {
        console.log(
          `%cmutation: %c${trigger}\n` +
          `%cprevState: %c${JSON.stringify(previousState)}\n` +
          `%cnextState: %c${JSON.stringify(nextState)}\n`,
          `color: ${colors.okay}`,
          `color: ${colors.notice}`,
          `color: ${colors.warn}`,
          `color: ${colors.notice}`,
          `color: ${colors.success}`,
          `color: ${colors.notice}`,
        );
      }
    };

    let logStateUpdate = (trigger, previousState, updateState) => {
      let nextState = calculateNextState(previousState, updateState);

      if ( store.state.noDebugColor ) {
        console.log(
          `action: ${trigger}\n` +
          `prevState: ${JSON.stringify(previousState)}\n` +
          `update: ${JSON.stringify(updateState)}\n` +
          `nextState: ${JSON.stringify(nextState)}\n`,
        );
      } else {
        console.log(
          `%caction: %c${trigger}\n` +
          `%cprevState: %c${JSON.stringify(previousState)}\n` +
          `%cupdate: %c${JSON.stringify(updateState)}\n` +
          `%cnextState: %c${JSON.stringify(nextState)}\n`,
          `color: ${colors.okay}`,
          `color: ${colors.notice}`,
          `color: ${colors.warn}`,
          `color: ${colors.notice}`,
          `color: ${colors.info}`,
          `color: ${colors.notice}`,
          `color: ${colors.success}`,
          `color: ${colors.notice}`,
        );
      }
    };

    let logStateChange = (trigger, previousState, updateState, isUpdate = false) => {
      if ( !store.state.debug ) {
        return;
      }

      let actionName = trigger;
      if ( trigger.name !== undefined ) {
        actionName = trigger.name;
      }

      if ( isUpdate ) {
        logStateUpdate(actionName, previousState, updateState);
      } else {
        logStateMutate(actionName, previousState, updateState)
      }
    };

    installLogger(
      store,
      logDefault,
      logActionError,
      logPluginUse,
      logStateChange,
      logStateMutate,
      logStateUpdate,
    );
  },
  uninstall(store) {
    uninstallLogger(store);
  },
};