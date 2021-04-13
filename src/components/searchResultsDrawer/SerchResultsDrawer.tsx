import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import {
  Divider,
  ListItemSecondaryAction,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const drawerWidth = 360;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
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
    content: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
  })
);

interface SearchResultsDrawerProps {
  resultStats: {
    repos: number;
    bookmarks: number;
    users: number;
  };
}

const SerchResultsDrawer: React.FC<SearchResultsDrawerProps> = ({
  resultStats,
}) => {
  const { repos, users, bookmarks } = resultStats;
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {[
            {
              text: "Repositories",
              icon: <InsertDriveFileIcon />,
              count: repos,
            },
            { text: "Users", icon: <InsertEmoticonIcon />, count: users },
            {
              text: "Bookmark",
              icon: <BookmarkBorderIcon />,
              count: bookmarks,
            },
          ].map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              <ListItemSecondaryAction>{item.count}</ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default SerchResultsDrawer;
