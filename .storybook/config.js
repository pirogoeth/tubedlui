import { configure } from '@storybook/vue'

import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module)
