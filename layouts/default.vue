<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon v-if="user" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-icon>mdi-calendar-month</v-icon>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
        <span v-if="user !== null">
          <v-spacer/>
          <span>
            <v-avatar color="primary">{{user}}</v-avatar>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
          <v-btn @click="Logout"> Log out </v-btn>
        </span>
        <span v-else>
          <v-btn href="/Login"> Log In </v-btn>
          <v-btn href="/SignUp"> Sign Up </v-btn>
        </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-cog",
          title: "Settings",
          to: "/settings",
        },
      ],
      title: "Simple Plan",
      loggedIn: false,
    };
  },

  methods: {
    Logout() {
      this.$store.dispatch('accounts/logout')
    }
  },

  computed: {
    user() {
      return this.$store.state.accounts.user;
    }
  },
};
</script>
