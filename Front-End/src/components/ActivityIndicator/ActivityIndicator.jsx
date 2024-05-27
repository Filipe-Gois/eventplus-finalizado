import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ActivityIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default ActivityIndicator;
