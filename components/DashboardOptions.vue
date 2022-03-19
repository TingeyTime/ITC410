<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          class="mx-2 ma-1"
          v-on:click="
            $emit('update-options', false);
            createActive = false;
          "
          color="info"
          >View Task Lists
        </v-btn>
        <v-btn
          class="mx-2 ma-1"
          v-on:click="
            $emit('update-options', true);
            createActive = true;
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
  prop: function () {
    return {
      createActive: {
        type: Boolean,
        required: true,
      },
    };
  },
  // method: {
  //   toggleActive: function () {
  //     this.$emit('update-options', createActive)
  //   },
  // },
};
</script>