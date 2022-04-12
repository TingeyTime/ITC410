<template>
  <v-container class="rounded-lg grey darken-4">
    <v-row justify="space-around" class="ma-2">
      <h2>Create a Task</h2>
      <v-btn @click="toggleNewTask()">Close</v-btn>
    </v-row>
    <v-form>
      <div>Title</div>
      <v-text-field
        label="Title"
        placeholder="Do laundry..."
        v-model="newTask.title"
        solo
        required
      ></v-text-field>
      <div>Description</div>
      <v-textarea
        label="Description"
        placeholder="Who, what, when, where, why"
        v-model="newTask.description"
        solo
        required
      ></v-textarea>
      <div>Duration (in miuntes)</div>
      <v-text-field
        label="Duration (in minutes)"
        v-model="newTask.duration"
        solo
        type="number"
      />
      <v-btn color="error" @click.prevent="reset()">Reset</v-btn>
      <v-btn color="success" @click.prevent="createTask()">Create Task</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "CreateATask",
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        duration: 0,
      },
    };
  },
  props: {
    currentList: {
      type: Object,
      required: true,
      default: {
        list_id: "00000",
        title: "Create a List!",
        completed: null,
      },
    },
  },
  methods: {
    reset() {
      this.newTask.title = "";
      this.newTask.description = "";
      this.newTask.duration = 0;
    },
    toggleNewTask() {
      this.reset();
      this.$emit("toggle-newTask", false);
    },
    async createTask() {
      this.$emit("create-task",
      {
        listId: this.currentList.list_id,
        title: this.newTask.title,
        description: this.newTask.description,
        duration: this.newTask.duration,
      })
      // const success = await this.$store.dispatch("tasks/createTask", {
      //   listId: this.currentList.list_id,
      //   title: this.newTask.title,
      //   description: this.newTask.description,
      //   duration: this.newTask.duration,
      // });
      // if (success === "success") {
      //   console.log("new Task Created!");
      //   this.newTask.title = "";
      //   this.newTask.description = "";
      //   this.newTask.duration = 0;
      //   this.$emit("toggle-newTask", false);
      // } else {
      //   console.log("creation failed");
      // }
    },
  },
};
</script>
