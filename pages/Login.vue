<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="5">
        <v-card-title class="justify-center">
          <h1>Log In</h1>
        </v-card-title>
        <v-card-text class="justify-center">
          <form>
            <v-text-field
              v-model="form.username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn class="mr-4" @click="Login"> submit </v-btn>
          </form>
        </v-card-text>
        <v-card-text>
          <h2>Not Registered?</h2>
          <br/>
          <p>Sign up to use this application now!</p>
          <nuxt-link to="/SignUp">Sign up now</nuxt-link>
          <br/>
          <nuxt-link to="/">Back to homepage</nuxt-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "plain",
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "Test",
        password: "test"
      },
      status: "nothing"
    }
  },
  methods: {
    Login() {
      this.$store.dispatch('accounts/login', {
        username: this.form.username,
        password: this.form.password
      })
      this.$router.push('/')
    },
  },
};
</script>