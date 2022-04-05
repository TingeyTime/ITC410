<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="black">
          <vue-editor :value="content" @text-change="$emit('update-note', $event);" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "Editor",
  components: {
    VueEditor,
  },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    text() {
      return this.content
    }
  }
};
</script>