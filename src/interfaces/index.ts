export interface PeoplesState {
  peoples: ShortPerson[];
  loading: boolean;
  loadingError: boolean;
  currentPage: number;
  totalPages: number;
  columns: TableColumn[];
}

export interface FavoritesState {
  favorites: ShortPerson[];
}

export interface SearchState {
  results: ShortPerson[];
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
  favorite: boolean;
  id: string;
}

export interface ShortPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  favorite: boolean;
  id: string;
}

export type PersonKeys = keyof ShortPerson;

export interface TableColumn {
  key: PersonKeys;
  label: string;
}