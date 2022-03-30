<template>
  <span>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      v-click-outside="{
        handler: onClickOutsideStandard,
        include: include,
      }"
    >
      <span v-if="$auth.user && $auth.user.admin">
        Admin Pages
        <v-list-item
          v-for="(adminPage, i) in adminPages"
          :key="i"
          :to="adminPage.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ adminPage.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="adminPage.title" />
          </v-list-item-content>
        </v-list-item>
      </span>
      <span v-if="$auth.loggedIn">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </span>
      <span>
        <v-list-item
          v-for="(info, i) in info"
          :key="i"
          :to="info.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ info.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="info.title" />
          </v-list-item-content>
        </v-list-item>
      </span>
    </v-navigation-drawer>
    <v-app-bar color="Primary" clipped-left fixed app>
      <v-app-bar-nav-icon class="include" @click.stop="drawer = !drawer" />
      <router-link to="/" style="text-decoration: none; color: inherit">
        <v-toolbar-title>
          <v-icon>mdi-calendar-month</v-icon>
          {{ title }}
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <span v-if="$auth.loggedIn">
        <v-btn @click="Logout"> Log out </v-btn>
      </span>
      <span v-else>
        <v-btn href="/Login"> Log In </v-btn>
        <v-btn href="/SignUp"> Sign Up </v-btn>
      </span>
    </v-app-bar>
  </span>
</template>

<script>

export default {
  name: "StandardAppBar",
  data() {
    return {
      drawer: false,
      info: [
        {
          icon: "mdi-information",
          title: "About",
          to: "/about",
        },
        {
          icon: "mdi-draw",
          title: "Journal",
          to: "/Journal",
        },
      ],
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-cog",
          title: "Settings",
          to: "/settings",
        },
      ],
      adminPages: [
        {
          icon: "",
          title: "Admin Options",
          to: "/admin",
        },
      ],
      title: "Simple Plan",
    };
  },

  methods: {
    Logout() {
      this.$auth.logout();
    },
    onClickOutsideStandard() {
      this.drawer = false;
    },
    include() {
      return [document.querySelector(".include")];
    },
  },

  computed: {
    user() {
      return this.$store.state.accounts.user;
    },
  },
}
</script>
