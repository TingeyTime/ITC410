<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="black">
          <vue-editor v-model="content" @text-change="$emit('update-note');" />
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
};
</script>