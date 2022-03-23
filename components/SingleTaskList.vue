<template>
    <v-container>
        <h2>{{currentList.title}}</h2>
    </v-container>
</template>

<script>

export default {
    name: 'SingleTaskList',
    props: {
        currentList: {
            type: Object,
            required: true,
            defualt: {
                list_id: "00000",
                title: "Create a List!",
                completed: null
            }
        }
    },
    computed: {
        tasks() {
            return this.$store.state.tasks.tasks;
        }
    },
    methods: {

    }
}
</script>
