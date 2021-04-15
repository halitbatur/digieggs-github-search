import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from "@material-ui/core";

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
    list: {
      margin: "0 auto",
      width: "70%",
    },
  })
);

interface SearchResultsDrawerProps {
  itemData: Record<string, string | number | boolean>;
  itemType: string;
}

const SerchResultsDrawer: React.FC<SearchResultsDrawerProps> = ({
  itemData,
  itemType,
}) => {
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
        <List className={classes.list}>
          {[
            {
              type: "avatar_url",
            },
            { type: "name" },
            {
              type: "login",
            },
          ].map((item) => (
            <ListItem
              button
              key={item.type}
              style={{
                color: "#000000",
              }}
            >
              {item.type === "avatar_url" && (
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      typeof itemData.avatar_url === "string"
                        ? itemData.avatar_url
                        : ""
                    }
                    style={{
                      width: "206px",
                      height: "206px",
                      marginTop: "34px",
                    }}
                  />
                </ListItemIcon>
              )}
              {item.type === "name" && (
                <ListItemText>
                  <Typography variant="h5">{itemData[item.type]}</Typography>
                </ListItemText>
              )}
              {item.type === "login" && (
                <ListItemText
                  style={{
                    position: "absolute",
                    top: "-20px",
                    color: "#646464",
                  }}
                >
                  <Typography variant="subtitle1">
                    {itemData[item.type]}
                  </Typography>
                </ListItemText>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default SerchResultsDrawer;
