import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useLocation } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

export default function PrimarySearchAppBar() {
  const location = useLocation();
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      grow: {
        flexGrow: 1,
      },

      title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block",
        },
      },
      search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.25),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.black, 0.5),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(3),
          width: "auto",
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          cursor: "pointer",
        },
        zIndex: 2,
      },
      inputRoot: {
        color: "inherit",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
          width: "20ch",
        },
      },
      bookMark: {
        padding: theme.spacing(1, 1, 1, 0),
        display: "flex",
        backgroundColor:
          location.pathname === "/bookmark"
            ? fade(theme.palette.common.white, 0.25)
            : "inherit",
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "#375F9D" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            DIGIEGGS
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => console.log(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.bookMark}>
            <BookmarkBorderOutlinedIcon />
            <Typography className={classes.title} variant="subtitle1" noWrap>
              Bookmarks
            </Typography>
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
