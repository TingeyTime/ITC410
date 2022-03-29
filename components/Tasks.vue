<template>
  <v-list two-line style="width: 100%;">
    <v-list-item-group v-model="selected" multiple>
      <template v-for="(task, index) in tasks">
        <v-list-item :key="task.title">
          <template>
            <v-list-item-content>
              <v-list-item-title v-text="task.title"></v-list-item-title>

              <v-list-item-subtitle
                class="text--primary"
                v-text="task.description"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="task.duration + ' min'"
              ></v-list-item-action-text>

              <v-icon v-if="!task.completed">
                radio-button-unchecked
              </v-icon>

              <v-icon v-else color="success"> task-alt </v-icon>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider v-if="index < task.length - 1" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "Tasks",
  data() {
    return {
      colapsed: true,
    };
  },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: [
        {
          task_id: "00000",
          title: "Default Title",
          description: "default default default default default default...",
          duration: 10,
          complete: null,
        },
      ],
    },
  },
  methods: {
    toggleColapse() {},
    async complete() {},
    async delete() {},
  },
};
</script>
