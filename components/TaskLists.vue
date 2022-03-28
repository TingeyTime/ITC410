<template>
  <v-container class="rounded-lg grey darken-4">
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
            <v-list-item v-for="(list, i) in taskLists" :key="i">
              <v-list-item-action>
                <v-btn text @click="changeList(list)">
                  {{ list.title }}
                </v-btn>
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
      ></SingleTaskList>
      <div v-if="currentList == null">
        <h3>Please choose a list...</h3>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import SingleTaskList from "@/components/SingleTaskList";

export default {
  Name: "TaskLists",
  // middleware: ["init.js"],
  async middleware({ store }) {
    await store.dispatch("taskLists/load");
    console.log("loaded Tasks Lists");
  },
  components: {
    SingleTaskList,
  },
  data() {
    return {
      currentList: null,
    };
  },
  computed: {
    taskLists() {
      return this.$store.state.taskLists.taskLists;
    },
  },
  methods: {
    async deleteList(listId) {
      console.log("deleting " + listId);
      const success = await this.$store.dispatch("taskLists/delete", listId);
      if (success === "success") {
        console.log("delete successful");
      } else {
        console.log("delete failed");
      }
    },
    changeList(list) {
      this.currentList = list;
      this.$store.dispatch('tasks/load', list)
    },
  },
};
</script>

<style lang="scss" >
.v-btn.active .v-icon {
  transform: rotate(-180deg);
}
</style>
