import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const searchApiBuilder = (
  type: "users" | "repositories",
  query: string
): string => {
  return `https://api.github.com/search/${type}?q=${query}`;
};

const SearchResults = () => {
  const [repos, setRepos] = React.useState();
  const query = useQuery();
  React.useEffect(() => {}, []);
  return <div>{query.get("query")}</div>;
};

export default SearchResults;
