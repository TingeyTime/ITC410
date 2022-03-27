export default async function initTasks ({ store }, listId ) {
    await store.dispatch('tasks/load', listId)
    console.log('loaded Tasks')
  }