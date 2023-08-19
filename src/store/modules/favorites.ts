import { FavoritesState, RootState, ShortPerson } from "@/interfaces";
import { ActionTree, MutationTree } from "vuex";

const namespaced: boolean = true;

export const state: FavoritesState = {
  favorites: [],
};

const mutations: MutationTree<FavoritesState> = {
  SET_FAVORITE(state, person) {
    state.favorites.push(person);
  },

  UNSET_FAVORITE(state, personId) {
    state.favorites = state.favorites.filter(
      (favorite) => favorite.id !== personId
    );
  },
};
const actions: ActionTree<FavoritesState, RootState> = {
  toggleFavorite({ commit, getters, dispatch }, person: ShortPerson) {
    const isFavorite = getters.isFavorite(person.id);

    if (isFavorite) {
      commit("UNSET_FAVORITE", person.id);
    } else {
      commit("SET_FAVORITE", person);
    }

    dispatch("search/updateFavoriteStatus", person.id, { root: true });
    dispatch("peoples/updateFavoriteStatus", person.id, { root: true });
  },
};

const getters = {
  isFavorite: (state: FavoritesState) => (personId: string) => {
    return !!state.favorites.find((favorite) => favorite.id === personId);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
