import React from "react";
import { Divider, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: "42px",
    },
    repoDiv: {
      display: "flex",
      columnGap: "8px",
      alignItems: "center",
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

const SearchResultsContent = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        {2555} Repository Results
      </Typography>
      <div>
        <div className={classes.repoDiv}>
          <BookOutlinedIcon className={classes.icon} />
          <div>
            <Typography variant="h6" className={classes.repoName}>
              airbnb/lottie-andriod
            </Typography>
            <Typography variant="subtitle1">
              Render After Effects Animations natively on your computer
            </Typography>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsContent;
