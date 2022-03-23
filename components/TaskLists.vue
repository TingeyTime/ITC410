<template>
  <v-container class="rounded-lg grey darken-4">
    <v-row>
      <h2 class="mx-4 ma-4"> Task Lists </h2>
      <v-spacer/>
      <span class="mx-4 ma-4">
          <v-btn color="secondaryLight">
            ◀
          </v-btn>
          <v-btn color="secondaryLight">
            ▶
          </v-btn>
          <v-btn color="caution">
            Delete
          </v-btn>
      </span>
    </v-row>
    <v-row>
    
    </v-row>
    <!-- <h2>Task Lists</h2>
    <div v-if="taskLists === []" >No Tasks... </div>
    <v-carousel>
    <v-carousel-item
      v-for="list in taskLists"
      :key="list.list_id"
      class="mx-2 ma-4"
    >
    <span>{{ list.title }}</span>
    <v-spacer />
    <v-btn color="caution" @click="deleteList(list.list_id)">Delete</v-btn>
    </v-carousel-item>
    </v-carousel> -->
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
