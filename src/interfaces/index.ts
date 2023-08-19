export interface PeoplesState {
  peoples: ApiPerson[];
  loading: boolean;
  loadingError: boolean;
  currentPage: number;
  totalPages: number;
  columns: TableColumn[];
}

export interface FavoritesState {
  favorites: ApiPerson[];
}

export interface SearchState {
  results: ApiPerson[];
  person: ApiPerson | null;
  loading: Boolean;
  loadingError: Boolean;
}

export interface RootState {
  people: PeoplesState;
  favorites: FavoritesState;
  search: SearchState;
}
export interface ApiPerson {
  favorite: boolean;
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export type PersonKeys =
  | "name"
  | "height"
  | "mass"
  | "hair_color"
  | "favorite"
  | "id";

export interface TableColumn {
  key: PersonKeys;
  label: string;
}
