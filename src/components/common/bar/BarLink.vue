<template>
  <a
    v-if="type === 'anchor'"
    :href="link"
    class="navbar-item">
    <slot />
  </a>
  <router-link
    v-else-if="type === 'router'"
    :to="link"
    class="navbar-item">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'BarLink',
  components: {
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['router', 'anchor'].indexOf(value) !== -1;
      },
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/module.scss";

a {
  &.router-link-active {
    border-bottom: 2px solid $twitter;
  }
}
</style>