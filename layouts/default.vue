<template>
  <v-app dark>
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
      <v-list
        v-if="user"
      >
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
      <v-list>
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon class="include" @click.stop="drawer = !drawer" />
      <router-link to='/' style="text-decoration: none; color: inherit;">
        <v-toolbar-title>
          <v-icon>mdi-calendar-month</v-icon>
          {{ title }}
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <span v-if="user !== null">
        <v-spacer />
        <span>
          <v-avatar color="primary">{{ user }}</v-avatar>
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
      info: [
        {
          icon: "mdi-information",
          title: "About",
          to: "/about",
        },
        {
          icon: "mdi-draw",
          title: "Temporary Journal",
          to: "/temporaryJournal"
        }
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
      title: "Simple Plan",
    };
  },

  methods: {
    Logout() {
      this.$store.dispatch("accounts/logout");
    },
    onClickOutsideStandard () {
        this.drawer = false
      },
      include () {
        return [document.querySelector('.include')]
      },
  },

  computed: {
    user() {
      return this.$store.state.accounts.user;
    },
  },
};
</script>
