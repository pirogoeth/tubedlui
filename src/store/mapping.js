import keys from 'lodash/keys';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

export const mapFields = (fields = null) => {
  // If `keys` is `null`, will map all fields in the store.
  if ( !fields ) {
    fields = keys(this.$store.state);
  }

  const mapping = {};
  pick(this.$store.state, fields).forEach(({ key, value }) => {
    mapping[key] = function stateMap() {
      return this.$store.state[key];
    };
  });

  return mapping;
};

export default {
  mapFields,
};