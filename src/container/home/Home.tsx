import React from "react";
import { Typography } from "@material-ui/core";

const Home = () => {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src="./screen_search_desktop.svg"
        alt="A pc search image"
        style={{ width: "86px", height: "86px", margin: "0 auto" }}
      />
      <Typography variant="h4" style={{ color: "#85b0f2" }}>
        Search results will appear here
      </Typography>
    </div>
  );
};

export default Home;
