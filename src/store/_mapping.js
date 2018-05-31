import difference from 'lodash/difference';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import transform from 'lodash/transform';

import { colors } from '@/store/plugins/logger';

export const mapFields = (store, fields = null) => {
  let log = store.hooks.logDefault;

  // If `keys` is `null`, will map all fields in the store.
  if ( !fields ) {
    fields = keys(store.state);
  } else {
    forEach(difference(fields, keys(store.state)), (field) => {
      log(
        `%cmapFields: %ccan not map field "%s": does not exist in store`,
        `color: ${colors.okay}`,
        `color: ${colors.warn}`,
        field,
      );
    });
  }

  return transform(pick(store.state, fields), (result, value, key) => {
    result[key] = function stateMapper() {
      return store.state[key];
    };
  });
};

export const mappersForStore = (store) => {
  return {
    mapFields: mapFields.bind(null, store),
  };
};

export default {
  mapFields,
};