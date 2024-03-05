// store/index.js
import { defineStore } from 'pinia'

export const useArchiveStore = defineStore('archive', {
  state: () => ({
    archivesList: []
  }),
  actions: {
    setArchivesList(list) {
      this.archivesList = list
    }
  }
})