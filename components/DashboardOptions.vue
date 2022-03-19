<template>
  <v-container>
    <v-row>
      <v-col>
        <span v-if="!createActive">
          <v-btn class="mx-2 ma-1" @click="toggleActive()" color="info"
            >View Task Lists
          </v-btn>
        </span>
        <span v-else>
          <v-btn
            class="mx-2 ma-1"
            @click="toggleActive()"
            outlined
            color="info"
          >
            View Task Lists</v-btn
          >
        </span>
        <span v-if="createActive">
          <v-btn class="mx-2 ma-1" @click="toggleActive()" color="info"
            >Create A New Task List
          </v-btn>
        </span>
        <span v-else>
          <v-btn
            class="mx-2 ma-1"
            @click="toggleActive()"
            outlined
            color="info"
          >
            Create A New Task List
          </v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  Name: "DashboardOptions",
  props: function () {
    return {
      createActive: {
        type: Boolean,
        required: true,
      },
    };
  },
  method: {
    toggleActive: function () {
      this.createActive = !this.createActive
    },
  },
};
</script>