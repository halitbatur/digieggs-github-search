import React from "react";
import { useLocation } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchResultsDrawer from "../../components/searchResultsDrawer/SerchResultsDrawer";
import SearchResultsContent from "../../components/searchResultsContent/SearchResultsContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
  })
);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const searchApiBuilder = (
  type: "users" | "repositories",
  query: string | null
): string => {
  return `https://api.github.com/search/${type}?q=${query}`;
};

export interface DataResults {
  total_count: number;
  incomplete_results: boolean;
  items: Record<string, string | boolean | number>[];
}
const SearchResults = () => {
  const classes = useStyles();
  const [repos, setRepos] = React.useState<DataResults>();
  const [users, setUsers] = React.useState<DataResults>();
  const query = useQuery();
  console.log(repos, users);
  const fetchData = async () => {
    if (query.get("query")) {
      const reposResponse = await fetch(
        searchApiBuilder("repositories", query.get("query"))
      );
      const usersResponse = await fetch(
        searchApiBuilder("users", query.get("query"))
      );
      const reposData = await reposResponse.json();
      const usersData = await usersResponse.json();
      setRepos(reposData);
      setUsers(usersData);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [query.get("query")]);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <SearchResultsDrawer resultStats={{ repos: 5, bookmarks: 5, users: 5 }} />
      <main className={classes.content}>
        {repos && <SearchResultsContent type="Repository" content={repos} />}
      </main>
    </div>
  );
};

export default SearchResults;
