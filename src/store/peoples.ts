import api from "@/extends/api";
import {
  ApiPerson,
  PeoplesState,
  RootState,
  normalizePerson,
} from "@/interfaces";
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
    { key: "hairColor", label: "Hair Color" },
    { key: "favorite", label: "Favorite" },
  ],
};

const mutations: MutationTree<PeoplesState> = {
  SET_PERSONS(state, payload) {
    state.peoples = payload;
  },
  SET_LOADING(state, status: boolean) {
    state.loading = status;
  },
  SET_LOADING_ERROR(state, status: boolean) {
    state.loadingError = status;
  },
  SET_CURRENT_PAGE(state, pageCount) {
    state.currentPage = pageCount;
  },
  SET_TOTAL_PAGES(state, pageCount) {
    state.totalPages = pageCount;
  },
  TOGGLE_FAVORITE(state, personName: string) {
    const personToToggle = state.peoples.find(
      (people) => people.name === personName
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
        const person = normalizePerson(apiPerson);
        person.favorite = rootGetters["favorites/isFavorite"](person.name);
        return person;
      });

      commit("SET_TOTAL_PAGES", Math.ceil(response.data.count / 10));
      commit("SET_PERSONS", persons);
      commit("SET_LOADING", false);
    } catch (error: any) {
      if (error.name === "CanceledError") {
        console.log("Fetch aborted");
      } else {
        console.error("Error fetching persons:", error);
        commit("SET_LOADING_ERROR", true);
        commit("SET_LOADING", false);
      }
    } finally {
      currentController = null;
    }
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
