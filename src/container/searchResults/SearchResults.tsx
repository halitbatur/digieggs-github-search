import React from "react";
import { useLocation } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import SearchResultsDrawer from "../../components/searchResultsDrawer/SerchResultsDrawer";
import SearchResultsContent from "../../components/searchResultsContent/SearchResultsContent";
import { useFetch } from "../../hooks/useFetch";
import { numberWithCommas } from "../../helpers/number-commas-helper";

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
  const [dataType, setDataType] = React.useState<string>("Repositories");
  const query = useQuery();
  const { repoStatus, repoData, repoError } = useFetch(
    searchApiBuilder("repositories", query.get("query")),
    "repo"
  );
  const { userStatus, userData, userError } = useFetch(
    searchApiBuilder("users", query.get("query")),
    "user"
  );

  return (
    <div style={{ display: "flex" }}>
      {repoStatus === "fetched" && userStatus === "fetched" ? (
        <>
          <CssBaseline />
          <SearchResultsDrawer
            resultStats={{
              repos: numberWithCommas(repoData.total_count),
              bookmarks: numberWithCommas(repoData.total_count),
              users: numberWithCommas(userData.total_count),
            }}
            dataType={dataType}
            setDataType={setDataType}
          />
          <main className={classes.content}>
            <SearchResultsContent
              type={dataType}
              content={dataType === "Repositories" ? repoData : userData}
            />
          </main>
        </>
      ) : (
        <CircularProgress style={{ margin: "50px auto" }} />
      )}
    </div>
  );
};

export default SearchResults;
