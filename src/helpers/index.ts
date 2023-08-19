import { ApiPerson } from "@/interfaces/index";

export function getIdFromPerson(url: string): string {
  const regex = /(\d+)\/?$/;
  const match = url.match(regex);
  const id = match ? match[1] : "";
  return id;
}

export function normalizeApiPerson(data: ApiPerson): ApiPerson {
  const { favorite, ...restOfPerson } = data;

  return {
    favorite, 
    ...restOfPerson,
    id: getIdFromPerson(data.url),
  };
}
