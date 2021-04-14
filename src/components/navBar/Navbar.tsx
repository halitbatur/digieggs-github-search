import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useLocation, useHistory } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PrimarySearchAppBar() {
  const location = useLocation();
  let history = useHistory();
  const [search, setSearch] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#375F9D",
        position: "relative",
      },
      title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block",
        },
        "&:hover": {
          cursor: "pointer",
        },
      },
      search: {
        display: "flex",
        alignItems: "center",
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
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "black",
        },
        zIndex: 2,
        position: "absolute",
      },
      inputRoot: {
        color: "inherit",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,

        width: "100%",
        [theme.breakpoints.up("md")]: {
          width: "20ch",
        },
      },
      bookMark: {
        padding: theme.spacing(1, 2.5, 1, 2.5),
        borderRadius: 10,
        display: "flex",
        backgroundColor:
          location.pathname === "/bookmark"
            ? fade(theme.palette.common.white, 0.25)
            : "inherit",
        "&:hover": {
          cursor: "pointer",
        },
      },
    })
  );
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            Oops looks like u forgot to type a keyword
          </Alert>
        </Snackbar>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h4"
            noWrap
            onClick={() => history.push("/")}
          >
            DIGIEGGS
          </Typography>
          <div className={classes.search}>
            <Button
              onClick={() => {
                if (search.length < 1) {
                  setOpen(true);
                } else {
                  history.push(`/search?query=${search}`);
                }
              }}
            >
              <SearchIcon />
            </Button>
            <InputBase
              value={search}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div
            className={classes.bookMark}
            onClick={() => history.push("/bookmark")}
          >
            <BookmarkBorderOutlinedIcon />
            <Typography className={classes.title} variant="subtitle1" noWrap>
              Bookmarks
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
