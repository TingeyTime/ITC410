<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="5">
        <v-card-title class="justify-center">
          <h1>Sign Up</h1>
        </v-card-title>
        <v-card-text class="justify-center">
          <form>
            <v-text-field
              v-model="form.email"
              label="E-mail"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.name"
              label="Name"
              type="name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.username"
              label="Username"
              type="username"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn class="mr-4" @click="Register()"> submit </v-btn>
          </form>
        </v-card-text>
        <v-card-text>
          <h2>Already Registered?</h2>
          <br/>
          <p>Login to use this application now!</p>
          <nuxt-link to="/Login">Login now</nuxt-link>
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
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        name: "",
        username: "",
        password: ""
      },
      status: "nothing"
    }
  },
  methods: {
    Register () {
      this.$store.dispatch('accounts/createAccount', {
        email: this.form.email,
        name: this.form.name,
        username: this.form.username,
        password: this.form.password
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.accounts.user
    }
  }
};
</script>