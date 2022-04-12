<template>
  <v-container>
    <v-row class="mx-2 ma-2">
      <h2>{{ currentList.title }}</h2>
      <v-spacer></v-spacer>
      <v-checkbox
        :input-value="currentList.completed"
        @click="$emit('update-taskLists')"
      ></v-checkbox>
    </v-row>
    <v-row class="mx-2 ma-2" v-if="userTasks != []">
      <Tasks
        :tasks="userTasks"
        :listId="currentList.list_id"
        @toggle-completeTask="$emit('toggle-completeTask', $event)"
        @delete-task="$emit('delete-task', $event)"
      ></Tasks>
    </v-row>
    <v-row>
      <span v-if="!createNewTask"
        ><v-btn @click="toggleNewTask()">New Task</v-btn></span
      >
      <CreateATask
        @create-task="$emit('create-task', $event); createNewTask = false;"
        v-if="createNewTask"
        :currentList="currentList"
      ></CreateATask>
    </v-row>
  </v-container>
</template>

<script>
import CreateATask from "@/components/CreateATask";
import Tasks from "@/components/Tasks";

export default {
  name: "SingleTaskList",
  async middleware({ store }) {
    await store.dispatch("tasks/load", this.currentList);
    console.log("loaded Tasks");
  },
  components: {
    CreateATask,
    Tasks,
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
    userTasks: {
      type: Array,
    },
  },
  methods: {
    toggleNewTask() {
      this.createNewTask = !this.createNewTask;
    },
  },
};
</script>
