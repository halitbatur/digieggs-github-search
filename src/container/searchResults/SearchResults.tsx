import React from "react";
import { useLocation } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
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
      padding: theme.spacing(1),
    },
  })
);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const searchApiBuilder = (
  type: "users" | "repositories",
  query: string | null
): string => {
  return `https://api.github.com/search/${type}?q=${query}`;
};

const SearchResults = () => {
  const classes = useStyles();
  const [repos, setRepos] = React.useState<Record<string, string>[]>();
  const [users, setUsers] = React.useState<Record<string, string>[]>();
  const query = useQuery();

  console.log(repos, users);

  const fetchData = async () => {
    if (query.get("query")) {
      const reposResponse = await fetch(
        searchApiBuilder("repositories", query.get("query"))
      );
      const usersResponse = await fetch(
        searchApiBuilder("users", query.get("query"))
      );
      const reposData = await reposResponse.json();
      const usersData = await usersResponse.json();
      setRepos(reposData);
      setUsers(usersData);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [query.get("query")]);

  return (
    <div className={classes.root}>
      <CssBaseline />
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
              { text: "Repositories", count: 59 },
              { text: "Users", count: 59 },
              { text: "Bookmar", count: 59 },
            ].map((item, index) => (
              <ListItem button key={item.text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <InsertDriveFileIcon />
                  ) : index === 1 ? (
                    <InsertEmoticonIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                <ListItemSecondaryAction>{item.count}</ListItemSecondaryAction>
                <ListItem />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
};

export default SearchResults;
