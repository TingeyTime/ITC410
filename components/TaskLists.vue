<template>
  <v-container class="rounded-lg grey darken-4">
    <h2>Task Lists</h2>
    <span v-for="(list, i) in $store.state.taskLists.taskLists" :key="i">
    <p>{{ list.title }}</p>
    </span>
  </v-container>
</template>

<script>
export default {
  Name: "TaskLists",
  computed: {
   getTaskLists() {
      this.$store.dispatch('taskLists/getTaskLists').then(console.log('Manual Update')).catch(console.log('updateFailed'))
    }
  },
};
</script>
