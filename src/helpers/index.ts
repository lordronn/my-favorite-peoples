import { ApiPerson, ShortPerson } from "@/interfaces/index";

export function getIdFromPerson(url: string): string {
  const regex = /(\d+)\/?$/;
  const match = url.match(regex);
  const id = match ? match[1] : "";
  return id;
}

export function normalizeApiPerson(data: ApiPerson): ApiPerson {
  return {
    ...data,
    id: getIdFromPerson(data.url),
    favorite: data.favorite ?? false,
  };
}

export function cutApiPerson(data: ApiPerson): ShortPerson {
  const { name, height, mass, hair_color, id, favorite } = data;
  return {
    name,
    height,
    mass,
    hair_color,
    id,
    favorite,
  };
}
