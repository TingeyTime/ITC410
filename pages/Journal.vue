<template>
  <v-container class="rounded-lg grey darken-4">
    <v-row justify="center" align="center" class="ma-2 mx-4">
      <h1>Journal</h1>
    </v-row>
    <v-row justify="center" align="center"  class="ma-2 mx-4">
        <p>
          Something about the benefits of brain dumping
        </p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Journal",
  data() {
    return {
      content: note()
    }
  },
  computed: {
    note() {
      return this.$store.state.notes.note
    }
  },
  methods: {
    async updateNote() {
      const success = await this.$store.dispacth('notes/updateNote', this.content)
      if (success === 'success')
      {
        console.log('update successful')
      } else {
        console.log('update failed')
      }
    }
  },
};
</script>