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
        <DashboardOptions @update-options="createActive=$event" />
        <CreateATaskList @update-options="createActive=$event" v-if="createActive" />
        <TaskLists v-if="!createActive" />
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
import CreateATaskList from "@/components/CreateATaskList";
import DashboardOptions from "@/components/DashboardOptions";
import UserCalendar from "@/components/UserCalendar";
import TaskLists from "@/components/TaskLists";

export default {
  middleware: ["auth", "init"],
  components: {
    CreateATaskList,
    UserCalendar,
    DashboardOptions,
    TaskLists
  },
  data: function() {
      return {
          createActive: false
      }
  }
};
</script>
