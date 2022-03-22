export default async function init ({ store }) {
    await store.dispatch('taskLists/load')
    console.log('loaded')
  }