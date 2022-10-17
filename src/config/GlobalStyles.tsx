import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";

const StylesGlobal: React.FC = () => {
  return (
    <GlobalStyles
      styles={{
        a: { textDecoration: "none", color: "coral" },
      }}
    />
  );
};

export default StylesGlobal;
