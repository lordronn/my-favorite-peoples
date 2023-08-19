import api from "@/extends/api";
import { normalizeApiPerson } from "@/helpers/index";
import { ApiPerson, PeoplesState, RootState } from "@/interfaces";
import { ActionTree, MutationTree } from "vuex";

let currentController: AbortController | null = null;

const namespaced: boolean = true;

const state: PeoplesState = {
  peoples: [],
  loading: false,
  loadingError: false,
  currentPage: 1,
  totalPages: 1,
  columns: [
    { key: "name", label: "Name" },
    { key: "height", label: "Height" },
    { key: "mass", label: "Mass" },
    { key: "hair_color", label: "Hair Color" },
    { key: "favorite", label: "Favorite" },
  ],
};

const mutations: MutationTree<PeoplesState> = {
  SET_PERSONS(state, peoples: ApiPerson[]) {
    state.peoples = peoples;
  },
  SET_LOADING(state, status: boolean) {
    state.loading = status;
  },
  SET_LOADING_ERROR(state, status: boolean) {
    state.loadingError = status;
  },
  SET_CURRENT_PAGE(state, pageCount: number) {
    state.currentPage = pageCount;
  },
  SET_TOTAL_PAGES(state, pageCount: number) {
    state.totalPages = pageCount;
  },
  TOGGLE_FAVORITE(state, personId: string) {
    const personToToggle = state.peoples.find(
      (people) => people.id === personId
    );

    if (personToToggle) {
      personToToggle.favorite = !personToToggle.favorite;
    }
  },
};

const actions: ActionTree<PeoplesState, RootState> = {
  async fetchPerson({ state, commit, rootGetters }) {
    if (currentController) {
      currentController.abort();
    }

    currentController = new AbortController();

    commit("SET_LOADING", true);
    commit("SET_LOADING_ERROR", false);

    try {
      const response = await api.get("/people", {
        params: {
          page: state.currentPage,
        },
        signal: currentController.signal,
      });

      const persons = response.data.results.map((apiPerson: ApiPerson) => {
        const person = normalizeApiPerson(apiPerson);
        person.favorite = rootGetters["favorites/isFavorite"](person.id);

        return person;
      });

      const totalPages = Math.ceil(response.data.count / 10);

      commit("SET_TOTAL_PAGES", totalPages);
      commit("SET_PERSONS", persons);
      commit("SET_LOADING", false);
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        console.error("Error fetching persons:", error);
        commit("SET_LOADING_ERROR", true);
        commit("SET_LOADING", false);
      }
    }
  },
  updateFavoriteStatus({ commit }, id: string) {
    commit("TOGGLE_FAVORITE", id);
  },
  updatePage({ commit, dispatch }, pageNumber: number) {
    commit("SET_CURRENT_PAGE", pageNumber);
    dispatch("fetchPerson");
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced,
};
