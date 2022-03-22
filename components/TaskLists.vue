<template>
  <v-container class="rounded-lg grey darken-4">
    <h2>Task Lists</h2>
    <span v-if="taskLists === []">No Tasks... </span>
    <span v-for="(list, i) in taskLists" :key="i">
    <p>{{ list.title }}</p>
    </span>
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
  }
};
</script>
