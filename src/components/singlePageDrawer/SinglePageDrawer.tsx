import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import LinkIcon from "@material-ui/icons/Link";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
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

interface BranchDataType {}

interface SearchResultsDrawerProps {
  itemData: Record<string, string | number | boolean>;
  itemType: string;
  branches?: any;
  prs?: Record<string, string>[];
}

const SerchResultsDrawer: React.FC<SearchResultsDrawerProps> = ({
  itemData,
  itemType,
  branches,
  prs,
}) => {
  const classes = useStyles();

  const renderUserInfo = () => {
    return (
      <List className={classes.list}>
        {["avatar_url", "name", "login", ,].map((type) => (
          <ListItem
            button
            key={type}
            style={{
              color: "#000000",
            }}
          >
            {type === "avatar_url" && (
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
            {type === "name" && (
              <ListItemText>
                <Typography variant="h5">{itemData[type]}</Typography>
              </ListItemText>
            )}
            {type === "login" && (
              <ListItemText
                style={{
                  position: "absolute",
                  top: "-20px",
                  color: "#646464",
                }}
              >
                <Typography variant="subtitle1">{itemData[type]}</Typography>
              </ListItemText>
            )}
          </ListItem>
        ))}
      </List>
    );
  };

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
        {itemType === "user" ? (
          renderUserInfo()
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "42px 46px 0",
            }}
          >
            <BookOutlinedIcon style={{ width: "64px", height: "64px" }} />
            <div>
              <Typography variant="h5" style={{ color: "#375f9d" }}>
                {itemData.full_name}
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: "16px" }}>
                {itemData.description}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                columnGap: "8px",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <LinkIcon />{" "}
              <Typography variant="h6">
                <a
                  target="_blank"
                  href={
                    typeof itemData.html_url === "string"
                      ? itemData.html_url
                      : ""
                  }
                  style={{ textDecoration: "none", color: "#2c98f0" }}
                >
                  {itemData.full_name}
                </a>
              </Typography>
            </div>

            {[
              {
                icon: <VisibilityOutlinedIcon />,
                text: "Watch",
                key: "subscribers_count",
              },
              {
                icon: <StarBorderOutlinedIcon />,
                text: "Star",
                key: "watchers_count",
              },
              {
                icon: <ShuffleIcon />,
                text: "Fork",
                key: "forks_count",
              },
            ].map((repoInfo) => (
              <>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "8px",
                    justifyContent: "start",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  {" "}
                  {repoInfo.icon}
                  <Typography variant="h6">{repoInfo.text}</Typography>
                  <Typography
                    variant="h6"
                    style={{
                      marginLeft: "auto",
                      color: "#2c98f0",
                    }}
                  >
                    {itemData[repoInfo.key]}
                  </Typography>
                </div>
                <Divider />
              </>
            ))}
            {[
              {
                icon: <AccountTreeOutlinedIcon />,
                text: "Branches",
                key: "branches_count",
              },
              {
                icon: <ErrorOutlineIcon />,
                text: "Issues",
                key: "open_issues_count",
              },
              {
                icon: <ShuffleIcon />,
                text: "Pull Requests",
                key: "prs_count",
              },
            ].map((repoInfo) => (
              <>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "8px",
                    justifyContent: "start",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  {" "}
                  {repoInfo.icon}
                  <Typography variant="h6">{repoInfo.text}</Typography>
                  <Typography
                    variant="h6"
                    style={{
                      justifySelf: "end",
                      marginLeft: "auto",
                      color: "#2c98f0",
                    }}
                  >
                    {repoInfo.key === "branches_count" && branches?.length}
                    {repoInfo.key === "prs_count" && prs?.length}
                    {itemData[repoInfo.key]}
                  </Typography>
                </div>
                <Divider />
              </>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default SerchResultsDrawer;
