import React from "react";
import { Divider, Typography, Avatar } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import { DataResults } from "../../container/searchResults/SearchResults";
import { numberWithCommas } from "../../helpers/number-commas-helper";

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
  content: DataResults;
}

const SearchResultsContent: React.FC<SearchResultsContent> = ({
  type,
  content,
}) => {
  const classes = useStyles();

  const renderItems = () => {
    return content.items.map((item) => (
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
            <Typography variant="h6" className={classes.itemName}>
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
      <Typography variant="h5" className={classes.header}>
        {numberWithCommas(content.total_count)} {type} Results
      </Typography>
      {renderItems()}
    </div>
  );
};

export default SearchResultsContent;
