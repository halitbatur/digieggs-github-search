import React from "react";
import { useLocation } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import SearchResultsDrawer from "../../components/searchResultsDrawer/SearchResultsDrawer";
import SearchResultsContent from "../../components/searchResultsContent/SearchResultsContent";
import { useFetch } from "../../hooks/useFetch";
import { numberWithCommas } from "../../helpers/number-commas-helper";
import { connect } from "react-redux";
import { repoData } from "../../reducers/action";

export const useStyles = makeStyles((theme: Theme) =>
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

interface SearchResultsProps {
  bookmarks: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ bookmarks }) => {
  const classes = useStyles();
  const [dataType, setDataType] = React.useState<string>("Repositories");
  const query = useQuery();
  const { repoStatus, repoData } = useFetch(
    searchApiBuilder("repositories", query.get("query")),
    "repo"
  );
  const { userStatus, userData } = useFetch(
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
              bookmarks: numberWithCommas(bookmarks.length),
              users: numberWithCommas(userData.total_count),
            }}
            dataType={dataType}
            setDataType={setDataType}
          />
          <main className={classes.content}>
            {dataType !== "Bookmarks" ? (
              <SearchResultsContent
                type={dataType}
                content={dataType === "Repositories" ? repoData : userData}
              />
            ) : (
              <SearchResultsContent
                type="Bookmarks"
                userPageRepos={bookmarks}
              />
            )}
          </main>
        </>
      ) : (
        <CircularProgress style={{ margin: "50px auto" }} />
      )}
    </div>
  );
};

const mapStateToProps = (state: repoData[]) => {
  return {
    bookmarks: state,
  };
};

export default connect(mapStateToProps)(SearchResults);
