export default async function ({ store }) {
    console.log('loaded User Notes')
    await store.dispatch('notes/load')
    return
  }