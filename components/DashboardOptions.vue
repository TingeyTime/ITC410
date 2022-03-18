<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          class="ml-0 mr-2"
          @click="displayLists"
          variant="info"
        >See Task Lists</v-btn>
        <v-btn
          @click="createNew"
          variant="info"
        >Create a New Task List</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  Name: "DashboardOptions",
  data: function () {
      return {
        displayLists: true,
        createNew: false
      }
  },
  methods: {
      display: function () {

      },
      create: function () {

      }
  }
};
</script>