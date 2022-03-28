<template>
  <v-container>
    <v-row justify="space-around" class="mx-2 ma-2">
      <h2>{{ currentList.title }}</h2>
      <v-btn @click.prevent="getTasks()">Get Tasks</v-btn>
    </v-row>
    <v-row class="mx-2 ma-2">
      <div v-if="tasks">{{ tasks }}</div>
    </v-row>
    <v-row>
      <span v-if="!createNewTask"
        ><v-btn @click="toggleNewTask()">New Task</v-btn></span
      >
      <CreateATask
        @toggle-newTask="createNewTask = $event"
        v-if="createNewTask"
        :currentList="currentList"
      ></CreateATask>
    </v-row>
  </v-container>
</template>

<script>
import CreateATask from "@/components/CreateATask";

export default {
  name: "SingleTaskList",
  async middleware({ store }) {
    await store.dispatch("tasks/load", this.currentList);
    console.log("loaded Tasks");
  },
  components: {
    CreateATask,
  },
  data() {
    return {
      createNewTask: false,
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
  computed: {
    tasks() {
      return this.$store.state.tasks.tasks;
    },
  },
  methods: {
    toggleNewTask() {
      this.createNewTask = !this.createNewTask;
    },
    async getTasks() {
      console.log("Getting tasks for", this.currentList);
      const success = await this.$store.dispatch(
        "tasks/load",
        this.currentList
      );
      if (success === "success") {
        console.log("loaded Tasks");
      } else {
        console.log("load tasks failed");
      }
    },
  },
};
</script>
