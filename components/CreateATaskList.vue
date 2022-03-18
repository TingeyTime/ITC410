<template>
  <v-container class="rounded-lg grey darken-4">
    <h2>Create a New Task List</h2>
    <v-form
      ref="form"
      @submit.prevent="createTaskList()"
    >
      <v-text-field
        v-model="taskList.title"
        label="Title"
        placeholder="Write a creative title here..."
        required
      >
      </v-text-field>
      <v-btn color="error" class="mt-4" @click="reset()"> Reset </v-btn>
      <v-btn color="primary" class="mt-4 mr-4" type="submit"> Create </v-btn>
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
  },
  methods: function () {
    return {
      reset() {
        this.$ref.form.reset()
      },
      createTaskList() {
        this.$state.taskList
          .dispatch("createTaskList", this.taskList)
          .then(() => {});
      },
    };
  },
};
</script>
