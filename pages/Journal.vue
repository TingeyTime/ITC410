<template>
  <v-parallax
    class="rounded-lg grey darken-4"
    height="100%"
    :src="require('../assets/images/notepad.jpg')"
  >
    <v-row justify="center" align="center" class="ma-2 mx-4">
      <h1>Journal</h1>
    </v-row>
    <v-row justify="center" align="center"  class="ma-2 mx-4">
        <p>
          Something about the benefits of brain dumping
        </p>
    </v-row>
    <v-row class="ma-2 mx-4">
      <v-btn @click="getNotes()">Get Notes</v-btn>
      <Editor :content="content" @update-note="updateNote()"></Editor>
    </v-row>
  </v-parallax>
</template>

<script>
import Editor from '@/components/Editor';

export default {
  name: "Journal",
  middleware: ['notes'],
  components: {
    Editor
  },
  data() {
    return {
      content: this.note
    }
  },
  computed: {
    note() {
      return this.$store.state.notes.note
    }
  },
  methods: {
    async updateNote() {
      console.log(this.content)
      const success = await this.$store.dispatch('notes/updateNote', this.content)
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