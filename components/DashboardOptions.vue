<template>
  <v-container>
    <v-row>
      <v-col class="ma-0 mx-auto">
        <v-btn
          class="mx-2 ma-1"
          v-on:click="
            $emit('update-options', false);
          "
          color="info"
          >View Task Lists
        </v-btn>
      </v-col>
      <v-col class="ma-0 mx-auto">
        <v-btn
          class="mx-2 ma-1"
          v-on:click="
            $emit('update-options', true);
          "
          color="info"
          >Create A New Task List
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  Name: "DashboardOptions",
};
</script>