<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto">
        <UserCalendar />
      </v-col>
      <v-col class="mr-auto">
        <DashboardOptions />
        <CreateATaskList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateATaskList from "@/components/CreateATaskList";
import UserCalendar from "@/components/UserCalendar";
import DashboardOptions from "@/components/DashboardOptions";

export default {
  middleware: "auth",
  components: {
    CreateATaskList,
    UserCalendar,
    DashboardOptions
  }
};
</script>
