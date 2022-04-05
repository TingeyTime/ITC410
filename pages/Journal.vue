<template>
  <v-parallax
    class="rounded-lg grey darken-4"
    height="100%"
    :src="require('../assets/images/notepad.jpg')"
  >
    <v-row justify="center" align="center" class="ma-2 mx-4">
      <h1>Journal</h1>
    </v-row>
    <v-row justify="center" align="center" class="ma-2 mx-4">
      <p>Something about the benefits of brain dumping</p>
    </v-row>
    <v-row class="ma-2 mx-4">
      <span v-if="$fetchState.pending">
        <h3>Loading...</h3>
      </span>
      <span v-else>
        <v-container>
          <v-row>
            <v-col>
              <v-card color="black">
                <vue-editor v-model="content" @text-change="updateNote()" />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!-- <Editor :content="content" @update-note="updateNote($event)"></Editor> -->
      </span>
    </v-row>
  </v-parallax>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Editor from "@/components/Editor";

export default {
  name: "Journal",
  middleware: ["notes"],
  components: {
    Editor,
    VueEditor,
  },
  data() {
    return {
      content: this.note,
    };
  },
  fetch() {
    this.$store.dispatch("notes/load");
    this.content = this.note;
    return;
  },
  computed: {
    note() {
      return this.$store.state.notes.note;
    },
  },
  methods: {
    async updateNote() {
      console.log(this.content);
      const success = await this.$store.dispatch(
        "notes/updateNote",
        this.content
      );
      if (success === "success") {
        console.log("update successful");
      } else {
        console.log("update failed");
      }
    },
  },
};
</script>