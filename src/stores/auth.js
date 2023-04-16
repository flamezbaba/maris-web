import { defineStore } from "pinia";
import { apiWrapper } from "@/helpers/apiwrapper";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userToken: localStorage.getItem("userToken"),
    user: null,
  }),
  getters: {
    //   doubleCount: (state) => state.count * 2,
  },
  actions: {
    async login(email, password) {
      const body = {
        email: email,
        password: password,
      };
      const response = await apiWrapper.post(`login`, body);
      if (response.data.status) {
        this.userToken = response.data.token;
        this.user = response.data.data;
        localStorage.setItem("userToken", this.userToken);
        this.router.push({ name: "DashboardScreen" });
      } else {
        return response.data.data;
      }
    },
    async register(body) {
      const response = await apiWrapper.post(`register`, body);
      if (response.data.status) {
        this.userToken = response.data.token;
        this.user = response.data.data;
        localStorage.setItem("userToken", this.userToken);
        this.router.push({ name: "DashboardScreen" });
      } else {
        return response.data.data;
      }
    },
    async getUser() {
      try {
        const response = await apiWrapper.get(`get_user`, {});
        if (response.data.status) {
          this.user = response.data.data;
        }
      } catch (err) {
        console.log("err from auth", err.message);
      }
    },
    async debitSaver(data) {
      const response = await apiWrapper.post(`savers/debit`, data);
      if (response.data.status) {
        await this.getUser();
        return true;
      }
      
      return false
    },
    async debitTime(data) {
      const response = await apiWrapper.post(`savers/debit`, data);
      if (response.data.status) {
        await this.getUser();
        return response.data.data;
      }
      
      return false
    },
    async logout() {
      this.userToken = null;
      this.user = null;
      
    },
  },
  persist: true,
});
