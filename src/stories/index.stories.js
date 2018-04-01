/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import centered from '@storybook/addon-centered';

import AppBar from '@/components/common/bar/AppBar.vue';
import AppContainer from '@/components/common/page/AppContainer.vue';
import AppSection from '@/components/common/page/AppSection.vue';
import BarLink from '@/components/common/bar/BarLink.vue';
import BarMenu from '@/components/common/bar/BarMenu.vue';
import EndpointSelector from '@/components/common/EndpointSelector.vue';

/* eslint-enable react/react-in-jsx-scope */

storiesOf('AppSection', module)
  .addDecorator(centered)
  .add('has a title and content', () => ({
    components: { AppSection },
    render(h) {
      return (
        <AppSection title="Section Component">
          <div slot="content" class="section-child">
            <p>This is text as a child of a section.</p>
          </div>
        </AppSection>
      );
    },
  }));

storiesOf('AppBar', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('with branding title', () => ({
    components: { AppBar },
    render(h) {
      return (
        <AppBar nav-title={ text('AppBar Title', 'Storybook View') }>
        </AppBar>
      );
    },
  }))
  .add('with bar links', () => ({
    components: { AppBar, BarLink, BarMenu },
    render(h) {
      return (
        <AppBar nav-title={ text('AppBar Title', 'Storybook View') }>
          <BarMenu position="start">
            <BarLink type="anchor" link="#">{ text('BarItem Start', 'Left Item') }</BarLink>
          </BarMenu>
          <BarMenu position="end">
            <BarLink type="anchor" link="#">{ text('BarItem End', 'Right Item') }</BarLink>
          </BarMenu>
        </AppBar>
      );
    },
  }));

storiesOf('EndpointSelector', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { EndpointSelector },
    render(h) {
      return (
        <EndpointSelector />
      );
    },
  }));