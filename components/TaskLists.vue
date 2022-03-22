<template>
  <v-container class="rounded-lg grey darken-4">
    <h2>Task Lists</h2>
    <div v-if="taskLists === []" >No Tasks... </div>
    <div
      v-for="(list, i) in taskLists"
      :key="i"
      class="mx-2 ma-4"
    >
    <span>{{ list.title }}</span>
    <v-spacer />
    <v-btn color="error" @click="deleteList(list.id)">Delete</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  Name: "TaskLists",
  middleware: ['init.js'],
  computed: {
    taskLists() {
      return this.$store.state.taskLists.taskLists
    }
  },
  methods: {
    async deleteList() {
      //FIXME correct api to send tasklist ids
    }
  }
};
</script>
