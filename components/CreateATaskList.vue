<template>
  <v-container class="rounded-lg grey darken-4">
    <h2>Create a New Task List</h2>
    <v-form ref="form" @submit.prevent="$emit('create-taskList', taskList); taskList.title = '';">
      <v-text-field
        v-model="taskList.title"
        label="Title"
        placeholder="Write a creative title here..."
        required
      >
      </v-text-field>
      <v-btn color="secondaryDark" class="mt-4" @click="taskList.title = ''">
        Reset
      </v-btn>
      <v-btn color="secondaryDark" class="mt-4 mr-4" type="submit"> Create </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  Name: "CreateATaskList",
  data: function () {
    return {
      valid: true,
      taskList: {
        title: "",
      },
    };
  }
};
</script>
