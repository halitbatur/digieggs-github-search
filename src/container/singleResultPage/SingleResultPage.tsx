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
  const [repoBranches, setRepoBranches] = React.useState<
    Record<string, string>[]
  >();
  const [repoPrs, setRepoPrs] = React.useState<Record<string, string>[]>();
  const [usersRepos, setUsersRepos] = React.useState<
    Record<string, string | boolean | number>[]
  >();
  const { itemStatus, itemData } = useFetch(
    singleItemApiBuilder(type, id),
    "item"
  );

  React.useEffect(() => {
    const fetchRepos = async () => {
      const repos = await fetch(itemData.repos_url);
      const reposData = await repos.json();
      setUsersRepos(reposData);
    };

    const fetchRepoBranchesAndPrs = async () => {
      const repoBranches = await fetch(
        `https://api.github.com/repos/${itemData.full_name}/branches`
      );
      const branchesInfo: Record<string, string>[] = await repoBranches.json();
      const repoPrs = await fetch(
        `https://api.github.com/repos/${itemData.full_name}/pulls`
      );
      const prsInfo: Record<string, string>[] = await repoPrs.json();
      setRepoBranches(branchesInfo);
      setRepoPrs(prsInfo);
    };
    if (itemStatus === "fetched" && type === "user") {
      fetchRepos();
    } else if (itemStatus === "fetched") {
      fetchRepoBranchesAndPrs();
    }
  }, [itemStatus, itemData.repos_url, itemData.full_name, type]);

  return (
    <div style={{ display: "flex" }}>
      {itemStatus === "fetched" && (
        <>
          <SinglePageDrawer
            itemData={itemData}
            itemType={type}
            prs={repoPrs}
            branches={repoBranches}
          />
          <main className={classes.content}>
            {usersRepos && (
              <SearchResultsContent
                type={"Repositories"}
                userPageRepos={usersRepos}
                repoCount={itemData.public_repos}
              />
            )}
            {type === "repositories" && (
              <SearchResultsContent
                type={"Repositories"}
                singleRepoTitle={itemData.description}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default SingleResultPage;
