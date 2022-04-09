<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet height="900">
          <v-calendar-daily
            interval-minutes="60"
            first-time="5"
            interval-height="60"
            interval-width="60"
          >

          </v-calendar-daily>
          <template v-slot:event="{ event, timed, eventSummary }">
            <div class="v-event-draggable" v-html="eventSummary()"></div>
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  Name: "UserCalendar",
};
</script>