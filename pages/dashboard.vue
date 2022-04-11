<template>
  <v-parallax
    dark
    class="rounded-lg"
    height="100%"
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  >
    <v-row>
      <v-col class="mx-auto">
        <UserCalendar />
      </v-col>
      <v-col class="mr-auto">
        <DashboardOptions
          @update-options="createActive = $event"
        ></DashboardOptions>
        <CreateATaskList
          @update-options="createActive = $event"
          @create-taskList="createTaskList($event)"
          v-if="createActive"
        ></CreateATaskList>

        <span v-if="!createActive">
          <v-container class="rounded-lg grey darken-4" v-if="loading != true">
            <v-row justify="space-around" class="ma-2">
              <h2>Task Lists</h2>
              <span>
                <v-menu transition="slide-y-transition" bottom :offset-x="true">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                      List of Lists
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(list, i) in userTaskLists" :key="i">
                      <v-list-item-action>
                        <span>
                          <v-btn
                            text
                            color="caution"
                            @click="deleteList(list.list_id)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                          <v-btn text @click="changeList(list)">
                            {{ list.title }}
                          </v-btn>
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </span>
            </v-row>
            <v-row justify="space-around" class="ma-2">
              <SingleTaskList
                v-if="currentList != null"
                :currentList="currentList"
                :userTasks="userTasks"
                @toggle-completeTask="toggleCompleteTask($event)"
                @delete-task="deleteTask($event)"
              ></SingleTaskList>
              <div v-if="currentList == null">
                <h3>Please choose a list...</h3>
              </div>
            </v-row>
          </v-container>
        </span>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
import CreateATaskList from "@/components/CreateATaskList";
import DashboardOptions from "@/components/DashboardOptions";
import UserCalendar from "@/components/UserCalendar";
import SingleTaskList from "@/components/SingleTaskList";

export default {
  middleware: ["auth", "init"],
  components: {
    CreateATaskList,
    UserCalendar,
    DashboardOptions,
    SingleTaskList,
  },
  data: function () {
    return {
      createActive: false,
      currentList: null,
      userTasks: [],
      userTaskLists: [],
      loading: true,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.tasks;
    },
    taskLists() {
      return this.$store.state.taskLists.taskLists;
    },
  },
  fetch() {
    this.$store.dispatch("taskLists/load");
    this.userTaskLists = this.taskLists;
    this.loading = false;
    return;
  },
  methods: {
    async createTaskList(newList) {
      console.log("Attempt to create: ", newList.title);
      const success = await this.$store.dispatch(
        "taskLists/createTaskList",
        newList
      );
      if (success === "success") {
        this.$emit("update-options", false);
        window.location.reload();
      }
    },

    async toggleCompleteList(list) {
      console.log("attempt to update: ", list.title);
      let currentTime = "";
      if (list.completed == null) {
        currentTime = new Date().toISOString();
      } else {
        currentTime = null;
      }
      const success = await this.$store.dispatch(
        "taskLists/updateList",
        {
          list_id: list.list_id,
          title: list.title, 
          completed: currentTime
        }
      );
      if (success === "success") {
        this.$emit("update-taskLists");
        this.userTaskLists = this.taskLists
      }
    },

    async deleteList(listId) {
      console.log("deleting " + listId);
      const success = await this.$store.dispatch("taskLists/delete", listId);
      if (success === "success") {
        console.log("delete successful");
        window.location.reload();
      } else {
        console.log("delete failed");
      }
    },
    async changeList(list) {
      this.loading = true;
      console.log("change list...");
      this.currentList = list;
      await this.$store.dispatch("tasks/load", this.currentList);
      this.userTasks = this.tasks;
      this.loading = false;
    },
    toggleNewTask() {
      this.createNewTask = !this.createNewTask;
    },
    async toggleCompleteTask(task) {
      console.log("toggle complete", task);
      let currentTime = "";
      if (task.complete == null) {
        currentTime = new Date().toISOString();
      } else {
        currentTime = null;
      }
      const success = await this.$store.dispatch("tasks/updateTask", {
        listId: this.currentList.list_id,
        taskId: task.task_id,
        title: task.title,
        description: task.description,
        duration: task.duration,
        complete: currentTime,
      });
      if (success === "success") {
        console.log("update complete to ", currentTime);
      } else {
        console.log("update failed");
      }
    },
    async deleteTask(taskId) {
      console.log("delete task", taskId);
      const success = await this.$store.dispatch("tasks/delete", {
        taskId: taskId,
        listId: this.listId,
      });
      if (success === "success") {
        console.log("delete successful");
      } else {
        console.log("delete failure");
      }
    },
  },
};
</script>
