<template>
  <div class="page">
    <AppBar nav-title="tubedlui">
      <BarMenu position="start">
        <hr class="navbar-divider">
        <BarLink
          type="router"
          link="/destinations">
          Destinations
        </BarLink>
        <BarLink
          type="router"
          link="/jobs">
          Jobs
        </BarLink>
        <BarLink
          type="router"
          link="/profiles">
          Profiles
        </BarLink>
      </BarMenu>
      <BarMenu position="end">
        <EndpointSelector />
      </BarMenu>
    </AppBar>
    <AppSection :title="title">
      <div slot="content">
        <slot name="content" />
      </div>
    </AppSection>
  </div>
</template>

<script>
import AppBar from '@/components/common/bar/AppBar.vue';
import AppSection from '@/components/common/page/AppSection.vue';
import BarLink from '@/components/common/bar/BarLink.vue';
import BarMenu from '@/components/common/bar/BarMenu.vue';
import EndpointSelector from '@/components/common/EndpointSelector.vue';


export default {
  name: 'AppContainer',
  components: {
    AppBar,
    AppSection,
    BarLink,
    BarMenu,
    EndpointSelector,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>