import queryString, { StringifiableRecord } from "query-string";

export const makeNewQueryString = (path: string, currentQuery: StringifiableRecord, newQeury: StringifiableRecord) => {
  return queryString.stringifyUrl({
    url: `${path}`,
    query: {
      ...currentQuery,
      ...newQeury,
    },
  });
};

export const removeQueryString = (path: string, search: string, target: string[]) => {
  const fullPath = `${path}${search}`;
  return queryString.exclude(fullPath, target);
};
