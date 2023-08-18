import { createStore, ModuleTree } from "vuex";
import createPersistedState from "vuex-persistedstate";

import favorites from "@/store/modules/favorites";
import peoples from "@/store/modules/peoples";
import search from "@/store/modules/search";

import { RootState } from "@/interfaces";

const modules: ModuleTree<RootState> = {
  peoples,
  favorites,
  search,
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
