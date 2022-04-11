<template>
  <v-list
    three-line
    flat
    style="width: 100%;"
  >
    <v-list-item-group multiple active-class="">
      <template v-for="(task, index) in tasks">
        <v-list-item :key="task.title">

          <template>
            <v-list-item-action>
              <v-checkbox
                :input-value="task.complete"
                @click="$emit('toggle-completeTask', task)"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{task.title}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{task.description}}
              </v-list-item-subtitle>
                {{task.duration}} mins
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="caution" @click="$emit('delete-task', task.task_id )">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
    listId: {
      type: String
    },
    tasks: {
      type: Array,
    },
  },
};
</script>
