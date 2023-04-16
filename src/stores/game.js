import { defineStore } from "pinia";
import { apiWrapper } from "@/helpers/apiwrapper";

// const initState = {

// }
export const useGameStore = defineStore("game", {
  state: () => ({
    completedLevel: {},
    currentGameLevel: {},
    currentGame: {},
    currentIndex: 0,
    answers: [],
    serverSettings: {},
    currentSeconds: 0,
  }),
  getters: {},
  actions: {
    resetGameState() {
      this.currentGame = {};
      this.currentIndex = 0;
      this.answers = [];
      this.currentSeconds = 0;
    },
    async getSettings() {
      const response = await apiWrapper.get(`settings/questions`, {});
      if (response.data.status) {
        this.serverSettings = response.data.data;
      }
    },
  },
  persist: true,
});
