import React from "react";
import { Divider, Typography, Avatar, Button } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import { DataResults } from "../../container/searchResults/SearchResults";
import { numberWithCommas } from "../../helpers/number-commas-helper";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: "18px",
    },
    itemDiv: {
      display: "flex",
      columnGap: "8px",
      alignItems: "center",
      marginBottom: "23px",
      marginTop: "24px",
    },
    icon: {
      alignSelf: "flex-start",
      marginTop: "3px",
    },
    itemName: {
      color: "#375f9d",
      lineHeight: "32px",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

interface SearchResultsContentProps {
  type: string;
  content?: DataResults;
  userPageRepos?: Record<string, string | boolean | number>[];
  repoCount?: number;
  singleRepoTitle?: string;
}

const SearchResultsContent: React.FC<SearchResultsContentProps> = ({
  type,
  content,
  userPageRepos,
  repoCount,
  singleRepoTitle,
}) => {
  let history = useHistory();
  const classes = useStyles();
  const renderItems = () => {
    const items = userPageRepos ? userPageRepos : content?.items;

    return items?.map((item) => (
      <div key={uuidv4()}>
        <div className={classes.itemDiv}>
          {type === "Users" ? (
            <Avatar
              alt="User"
              src={typeof item.avatar_url === "string" ? item.avatar_url : ""}
            />
          ) : (
            <BookOutlinedIcon className={classes.icon} />
          )}
          <div>
            <Typography
              onClick={() => {
                const route = type === "Users" ? "user" : "repositories";
                history.push(`/single-page/${route}/${item.id}`);
              }}
              variant="h6"
              className={classes.itemName}
            >
              {type === "Users" ? item.login : item.name}
            </Typography>
            {<Typography variant="subtitle1">{item.description}</Typography>}
          </div>
        </div>
        <Divider />
      </div>
    ));
  };

  return (
    <div style={{ marginLeft: "30px" }}>
      {!content?.total_count || userPageRepos ? (
        !singleRepoTitle ? (
          <Typography
            variant="h5"
            className={classes.header}
            style={{
              display:
                type === "repositories" || "Bookmarks" ? "none" : "block",
            }}
          >
            Repositories{" "}
            <Button variant="outlined" color="primary" href="#outlined-buttons">
              {repoCount}
            </Button>
          </Typography>
        ) : (
          <Typography>{singleRepoTitle}</Typography>
        )
      ) : (
        <Typography variant="h5" className={classes.header}>
          {numberWithCommas(content.total_count)} {type} Results
        </Typography>
      )}
      {type === "repositories" || renderItems()}
    </div>
  );
};

export default SearchResultsContent;
