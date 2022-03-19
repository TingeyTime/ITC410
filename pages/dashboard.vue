<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto">
        <UserCalendar />
      </v-col>
      <v-col class="mr-auto">
        <DashboardOptions @update-options="createActive=$event" />
        <CreateATaskList v-if="createActive" />
        <TaskLists v-if="!createActive" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateATaskList from "@/components/CreateATaskList";
import DashboardOptions from "@/components/DashboardOptions";
import UserCalendar from "@/components/UserCalendar";
import TaskLists from "@/components/TaskLists";

export default {
  middleware: "auth",
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
