import React from "react";
import { Divider, Typography, Avatar } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import { DataResults } from "../../container/searchResults/SearchResults";
import { numberWithCommas } from "../../helpers/number-commas-helper";
import { useHistory } from "react-router-dom";

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

interface SearchResultsContent {
  type: string;
  content?: DataResults;
  userPageRepos?: Record<string, string | boolean | number>[];
}

const SearchResultsContent: React.FC<SearchResultsContent> = ({
  type,
  content,
  userPageRepos,
}) => {
  let history = useHistory();
  const classes = useStyles();

  const renderItems = () => {
    const items = userPageRepos ? userPageRepos : content?.items;

    return items?.map((item) => (
      <div>
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
            {type === "Repositories" && (
              <Typography variant="subtitle1">{item.description}</Typography>
            )}
          </div>
        </div>
        <Divider />
      </div>
    ));
  };

  return (
    <div>
      {content?.total_count && (
        <Typography variant="h5" className={classes.header}>
          {numberWithCommas(content.total_count)} {type} Results
        </Typography>
      )}

      {renderItems()}
    </div>
  );
};

export default SearchResultsContent;
