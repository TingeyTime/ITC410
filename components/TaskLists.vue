<template>
  <v-container class="rounded-lg grey darken-4">
    <h2>Task Lists</h2>
    <div v-if="taskLists === []" >No Tasks... </div>
    <div
      v-for="list in taskLists"
      :key="list.list_id"
      class="mx-2 ma-4"
    >
    <span>{{ list.title }}</span>
    <v-spacer />
    <v-btn color="caution" @click="deleteList(list.list_id)">Delete</v-btn>
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
    async deleteList(listId) {
      console.log ('deleting ' + listId)
      const success = await this.$store
        .dispatch('taskLists/delete', listId)
      if (success === 'success') {
        console.log('delete successful')
      } else {
        console.log('delete failed')
      }
    }
  }
};
</script>
