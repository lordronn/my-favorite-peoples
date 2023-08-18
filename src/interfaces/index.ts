export interface PeoplesState {
  peoples: Person[];
  loading: boolean;
  loadingError: boolean;
  currentPage: number;
  totalPages: number;
  columns: TableColumn[];
}

export interface FavoritesState {
  favorites: Person[];
}

export interface SearchState {
  results: Person[];
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
  favorite?: boolean;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  favorite: boolean;
  id: string;
}

export type PersonKeys = keyof Person;

export interface TableColumn {
  key: PersonKeys;
  label: string;
}

export function normalizePerson(data: ApiPerson): Person {
  const regex = /(\d+)\/?$/;
  const match = data.url.match(regex);
  const id = match ? match[1] : "";

  return {
    name: data.name,
    height: data.height,
    mass: data.mass,
    hairColor: data.hair_color,
    id: id,
    favorite: false,
  };
}
