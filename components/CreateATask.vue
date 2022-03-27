<template>
  <v-card>
    <v-card-title>Create a Task</v-card-title>
    <v-form>
      <v-container fluid>
        <v-text-field
          label="Title"
          placeholder="Do laundry..."
          v-model="newTask.title"
          required
        ></v-text-field>
        <v-textarea
          label="Description"
          placeholder="Who, what, when, where, why"
          v-model="newTask.description"
          required
        ></v-textarea>
        <v-text-field
          label="Duration"
          v-model="newTask.duration"
          single-line
          type="number"
        />
      </v-container>
      <v-btn color="error" @click.prevent="reset()">Reset</v-btn>
      <v-btn color="success" @click.prevent="createTask()">Create Task</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'CreateATask',
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
    async createTask() {
      // Add verification.
      const success = await this.$store.dispatch("tasks/createTask", {
        listId: this.currentList.list_id,
        title: this.newTask.title,
        description: this.newTask.description,
        duration: this.newTask.duration,
      });
      if (success === "success") {
        console.log("new Task Created!");
        this.newTask.title = "";
        this.newTask.description = "";
        this.newTask.duration = 0;
      } else {
        console.log("creation failed");
      }
    },
  },
};
</script>
