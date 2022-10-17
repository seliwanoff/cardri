<script>
import appConfig from "@src/app.config";
import { mapActions } from "vuex";

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} ` : appConfig.title;
    },
  },
  data: function () {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      logoutTimer: null,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
  },

  methods: {
    ...mapActions({
      signOutAction: "signOut",
    }),
    setTimers: function () {
      this.logoutTimer = setTimeout(this.signOut, 1200000);
    },

    signOut() {
      this.signOutAction();
      this.$router.push("/");
    },

    resetTimer: function () {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
};
</script>

<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Design variables and utilities from src/design.
@import "@design";
</style>
