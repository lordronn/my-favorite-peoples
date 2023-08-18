import { FavoritesState, Person } from "@/interfaces";
import { ActionTree, MutationTree } from "vuex";

const namespaced: boolean = true;

export const state: FavoritesState = {
  favorites: [],
};

const mutations: MutationTree<FavoritesState> = {
  ADD_TO_FAVORITE(state, person: Person) {
    state.favorites.push(person);
  },

  REMOVE_FROM_FAVORITE(state, personName: string) {
    state.favorites = state.favorites.filter(
      (favorit) => favorit.name !== personName
    );
  },
};

const actions: ActionTree<FavoritesState, any> = {
  toggleFavorite({ commit, state }, person) {
    const isFavorite = !!state.favorites.find(
      (favorit) => favorit.name === person.name
    );
    commit("search/TOGGLE_FAVORITE", person.name, { root: true });
    commit("peoples/TOGGLE_FAVORITE", person.name, { root: true });

    if (isFavorite) {
      commit("REMOVE_FROM_FAVORITE", person.name);
    } else {
      commit("ADD_TO_FAVORITE", person);
    }
  },
};

const getters = {
  isFavorite: (state: FavoritesState) => (name: string) => {
    return !!state.favorites.find((item) => item.name === name);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
