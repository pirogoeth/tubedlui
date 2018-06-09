import difference from 'lodash/difference';
import forEach from 'lodash/forEach';
import intersection from 'lodash/intersection';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import transform from 'lodash/transform';

import { colors } from '@/store/plugins/logger';

const validateFields = (store, fields = null) => {
  let log = store.hooks.logDefault;

  // If `fields` is `null`, will map all fields in the store.
  if ( !fields ) {
    fields = keys(store.state);
  } else {
    let hasInvalidFields = false;
    forEach(difference(fields, keys(store.state)), (field) => {
      hasInvalidFields = true;
      log(
        `%cvalidateFields: %cinvalid field "%s": does not exist in store`,
        `color: ${colors.okay}`,
        `color: ${colors.warn}`,
        field,
      );
    });

    // Recalculate the valid fields list if there were invalid fields
    if ( hasInvalidFields ) {
      fields = intersection(keys(store.state), fields);
    }
  }

  return fields;
}

export const mapFields = (store, fields = null) => {
  fields = validateFields(store, fields);

  return transform(pick(store.state, fields), (result, value, key) => {
    result[key] = (vm) => {
      return vm.$store.state[key];
    };
  });
};

export const test_mapFields = (store, fields = null) => {
  fields = validateFields(store, fields);

  return transform(pick(store.state, fields), (result, value, key) => {
    result[key] = function() {
      console.log(`getter for state "${key}" uses store:`, store);
      return store.state[key];
    };
    result[key].wtf = true;
    result[key].vuex = true;
  });
};

export const mapDataFields = (store, fields = null) => {
  fields = validateFields(store, fields);

  let val = transform(pick(store.state, fields), (result, value, key) => {
    Object.defineProperty(result, key, {
      configurable: false,
      enumerable: true,
      get() {
        console.log(`getter for state "${key}" uses store:`, store);
        return store.state[key];
      },
      set: undefined,
    });
  });
  console.log('mapping with', val);
  return val;
}

export const mappersForStore = (store) => {
  return {
    mapDataFields: mapDataFields.bind(null, store),
    mapFields: mapFields.bind(null, store),
    test_mapFields: test_mapFields.bind(null, store),
  };
};

export default {
  mapFields,
};