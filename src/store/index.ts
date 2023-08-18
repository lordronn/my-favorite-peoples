import { createStore, ModuleTree } from "vuex";
import createPersistedState from "vuex-persistedstate";

import favorites from "./favorites";
import peoples from "./peoples";
import search from "./search";

import { RootState } from "@/interfaces";

const modules: ModuleTree<RootState> = {
  peoples,
  favorites,
  search
};

export default createStore({
  modules,
  plugins: [
    createPersistedState({
      key: "my-persons-store",
      paths: ["favorites.favorites"],
    }),
  ],
});
