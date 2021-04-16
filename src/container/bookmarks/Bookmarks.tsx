import React from "react";
import SearchResultsContent from "../../components/searchResultsContent/SearchResultsContent";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { repoData } from "../../reducers/action";
import Drawer from "@material-ui/core/Drawer";
import { Typography } from "@material-ui/core";

const drawerWidth = 360;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: theme.zIndex.drawer,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
  })
);

interface BookmarksProps {
  bookmarks: any;
}

const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks }) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div style={{ padding: "42px 0 0 46px" }}>
            <BookmarkBorderIcon style={{ width: "64px", height: "64px" }} />
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Bookmarks
            </Typography>
            <Typography variant="subtitle1">
              You have {bookmarks.length} bookmarks
            </Typography>
          </div>
        </div>
      </Drawer>
      <div style={{ padding: "42px 0 0 46px", width: "100%" }}>
        <SearchResultsContent type="Bookmarks" userPageRepos={bookmarks} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: repoData[]) => {
  return {
    bookmarks: state,
  };
};

export default connect(mapStateToProps)(Bookmarks);
