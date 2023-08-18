import api from "@/extends/api";
import { RootState, SearchState, normalizePerson } from "@/interfaces";
import { ActionTree, MutationTree } from "vuex";

let currentController: AbortController | null = null;

const namespaced: boolean = true;

export const state: SearchState = {
  results: [],
  person: null,
  loading: false,
  loadingError: false
};

const mutations: MutationTree<SearchState> = {
  SET_RESULTS(state, results) {
    state.results = results;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_LOADING_ERROR(state, status: boolean) {
    state.loadingError = status;
  },
  SET_PERSON(state, person) {
    state.person = person;
  },
  TOGGLE_FAVORITE(state, personName) {
    if (state.person && state.person.name === personName) {
      state.person.favorite = !state.person.favorite;
    }
  },
};

const actions: ActionTree<SearchState, RootState> = {
  async searchPerson({ commit }, value) {
    if (currentController) {
      currentController.abort();
    }

    currentController = new AbortController();

    commit("SET_LOADING", true);
    try {
      const response = await api.get(`people/?search=${value}`, {
        signal: currentController.signal,
      });

      const persons = response.data.results.map(normalizePerson);

      commit("SET_RESULTS", persons);
      commit("SET_LOADING", false);
    } catch (error: any) {
      if (error.name === "CanceledError") {
        console.log("Fetch aborted");
      } else {
        commit("SET_LOADING", false);
        console.error("Error search persons:", error);
      }
    }
  },
  async getOnePerson({ commit, rootGetters }, id) {
    commit("SET_LOADING", true);
    commit('SET_LOADING_ERROR', false)

    try {
      const response = await api.get(`/people/${id}`);
      const person = response.data;
      const isFavorite = rootGetters["favorites/isFavorite"](person.name);

      commit("SET_PERSON", {
        favorite: isFavorite,
        ...person,
      });
      commit("SET_LOADING", false);
    } catch (error: any) {
      commit("SET_LOADING", false);
      commit('SET_LOADING_ERROR', true)
      console.error("Error get person:", error);
    }
  },
  resetPerson({ commit }) {
    commit("SET_PERSON", null);
  },
  resetResults({ commit }) {
    commit("SET_RESULTS", []);
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced,
};
