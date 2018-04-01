<template>
  <header
    class="navbar"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link
          class="navbar-item"
          to="/">
          {{ navTitle }}
        </router-link>
      </div>
      <div class="navbar-menu">
        <slot />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppBar',
  components: {
  },
  props: {
    navTitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
header.navbar {
  border-bottom: 1px #dedede dashed;

  div.container {
    div.navbar-brand {
      a {
        font-weight: 600;
      }
    }

    div.navbar-menu {
      align-items: center;
      font-weight: 200;
    }
  }
}
</style>