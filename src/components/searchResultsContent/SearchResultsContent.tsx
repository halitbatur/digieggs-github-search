import React from "react";
import { Divider, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import { DataResults } from "../../container/searchResults/SearchResults";
import { numberWithCommas } from "../../helpers/number-commas-helper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: "18px",
    },
    repoDiv: {
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
    repoName: {
      color: "#375f9d",
      lineHeight: "32px",
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
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        {numberWithCommas(content.total_count)} {type} Results
      </Typography>
      {content.items.map((repo) => (
        <div>
          <div className={classes.repoDiv}>
            <BookOutlinedIcon className={classes.icon} />
            <div>
              <Typography variant="h6" className={classes.repoName}>
                {repo.name}
              </Typography>
              <Typography variant="subtitle1">{repo.description}</Typography>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default SearchResultsContent;
