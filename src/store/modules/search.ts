import api from "@/extends/api";
import { normalizeApiPerson } from "@/helpers/index";
import { ApiPerson, RootState, SearchState } from "@/interfaces";

import { ActionTree, MutationTree } from "vuex";

let currentController: AbortController | null = null;

const namespaced: boolean = true;

export const state: SearchState = {
  results: [],
  person: null,
  loading: false,
  loadingError: false,
};

const mutations: MutationTree<SearchState> = {
  SET_RESULTS(state, results: ApiPerson[]) {
    state.results = results;
  },
  SET_LOADING(state, status: boolean) {
    state.loading = status;
  },
  SET_LOADING_ERROR(state, status: boolean) {
    state.loadingError = status;
  },
  SET_PERSON(state, person: ApiPerson) {
    state.person = person;
  },
  TOGGLE_FAVORITE(state, personId: string) {
    const person = state.person;
    if (person && person.id === personId) {
      person.favorite = !person.favorite;
    }
  },
};

const actions: ActionTree<SearchState, RootState> = {
  async searchPerson({ commit }, value: string) {
    if (currentController) {
      currentController.abort();
    }

    currentController = new AbortController();

    commit("SET_LOADING", true);
    try {
      const response = await api.get(`people/?search=${value}`, {
        signal: currentController.signal,
      });
      const persons = response.data.results.map(normalizeApiPerson);

      commit("SET_RESULTS", persons);
      commit("SET_LOADING", false);
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        commit("SET_LOADING", false);
        console.error("Error search persons:", error);
      }
    }
  },
  async getOnePerson({ commit, rootGetters }, id: string) {
    commit("SET_LOADING", true);
    commit("SET_LOADING_ERROR", false);

    try {
      const response = await api.get(`/people/${id}`);
      const person = normalizeApiPerson(response.data);
      const isFavorite = rootGetters["favorites/isFavorite"](person.id);
      person.favorite = isFavorite;

      commit("SET_PERSON", person);
      commit("SET_LOADING", false);
    } catch (error: any) {
      commit("SET_LOADING", false);
      commit("SET_LOADING_ERROR", true);
      console.error("Error get person:", error);
    }
  },
  updateFavoriteStatus({ commit }, id: string) {
    commit("TOGGLE_FAVORITE", id);
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
