import api from "@/extends/api";
import { cutApiPerson, normalizeApiPerson } from "@/helpers/index";
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
  SET_PERSONS(state, payload) {
    state.peoples = payload;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_LOADING_ERROR(state, status) {
    state.loadingError = status;
  },
  SET_CURRENT_PAGE(state, pageCount) {
    state.currentPage = pageCount;
  },
  SET_TOTAL_PAGES(state, pageCount) {
    state.totalPages = pageCount;
  },
  TOGGLE_FAVORITE(state, personId) {
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
        const shortPerson = cutApiPerson(person);

        shortPerson.favorite = rootGetters["favorites/isFavorite"](
          shortPerson.id
        );
        return shortPerson;
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
  updateFavoriteStatus({ commit }, id) {
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
