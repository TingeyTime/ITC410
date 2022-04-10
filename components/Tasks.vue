<template>
  <v-list
    three-line
    flat
    style="width: 100%;"
    v-if="task != []"
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
<<<<<<< HEAD
              <!-- <v-checkbox
                :input-value="task.complete"
                @click="toggleCompleteTask(task)"
              ></v-checkbox> -->
=======
>>>>>>> tmp
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{task.title}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{task.description}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="caution" @click="$emit('delete-task', task.task_id )">
<<<<<<< HEAD
              <!-- <v-btn color="caution" @click="deleteTask(task.task_id)"> -->
=======
>>>>>>> tmp
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
<<<<<<< HEAD
      required: true,
      default: [
        // {
        //   task_id: "00000",
        //   title: "Default Title",
        //   description: "default default default default default default...",
        //   duration: 10,
        //   complete: null,
        // },
      ],
    },
  },
  // methods: {
  //   async toggleCompleteTask(task) {
  //     console.log('toggle complete', task)
  //     let currentTime = ""
  //     if (task.complete == null ) {
  //       currentTime = new Date().toISOString()
  //     } else { currentTime = null }
  //     const success = await this.$store.dispatch('tasks/updateTask',
  //       {
  //         listId: this.listId,
  //         taskId: task.task_id,
  //         title: task.title,
  //         description: task.description,
  //         duration: task.duration,
  //         complete: currentTime
  //       })
  //     if (success === 'success') {
  //       console.log('update complete to ', currentTime)
  //     } else {
  //       console.log('update failed')
  //     }
  //   },
  //   async deleteTask(taskId) {
  //     console.log('delete task', taskId)
  //     const success = await this.$store.dispatch('tasks/delete',
  //       {
  //         taskId: taskId,
  //         listId: this.listId
  //       })
  //     if (success === 'success'){
  //       console.log('delete successful')
  //     } else {
  //       console.log('delete failure')
  //     }
  //   },
  // },
=======
    },
  },
>>>>>>> tmp
};
</script>
