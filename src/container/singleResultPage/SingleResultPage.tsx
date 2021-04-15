import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { DataResults } from "../searchResults/SearchResults";

interface ParamTypes {
  id: string;
  type: string;
}

const singleItemApiBuilder = (type: string, id: string) => {
  return `https://api.github.com/${type}/${id}`;
};

const SingleResultPage = () => {
  let { id, type } = useParams<ParamTypes>();
  const [usersRepos, setUsersRepos] = React.useState<DataResults>();
  const { itemStatus, itemData, itemError } = useFetch(
    singleItemApiBuilder(type, id),
    "item"
  );

  const fetchRepos = async () => {
    const repos = await fetch(itemData.repos_url);
    const reposData = await repos.json();
    setUsersRepos(reposData);
  };

  console.log(usersRepos);

  React.useEffect(() => {
    if (itemStatus === "fetched" && type === "user") {
      fetchRepos();
    }
  }, [itemStatus]);

  return (
    <div>
      hello{id}
      {type}
    </div>
  );
};

export default SingleResultPage;
