import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useStyles } from "../searchResults/SearchResults";
import SearchResultsContent from "../../components/searchResultsContent/SearchResultsContent";
import SinglePageDrawer from "../../components/singlePageDrawer/SinglePageDrawer";

interface ParamTypes {
  id: string;
  type: string;
}

const singleItemApiBuilder = (type: string, id: string) => {
  return `https://api.github.com/${type}/${id}`;
};

const SingleResultPage = () => {
  const classes = useStyles();
  let { id, type } = useParams<ParamTypes>();
  const [usersRepos, setUsersRepos] = React.useState<
    Record<string, string | boolean | number>[]
  >();
  const { itemStatus, itemData, itemError } = useFetch(
    singleItemApiBuilder(type, id),
    "item"
  );

  const fetchRepos = async () => {
    const repos = await fetch(itemData.repos_url);
    const reposData = await repos.json();
    setUsersRepos(reposData);
  };

  console.log(itemData);

  React.useEffect(() => {
    if (itemStatus === "fetched" && type === "user") {
      fetchRepos();
    }
  }, [itemStatus]);

  return (
    <div style={{ display: "flex" }}>
      {itemStatus === "fetched" && (
        <>
          <SinglePageDrawer itemData={itemData} itemType={type} />
          <main className={classes.content}>
            {usersRepos && (
              <SearchResultsContent
                type={"Repositories"}
                userPageRepos={usersRepos}
                repoCount={itemData.public_repos}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default SingleResultPage;
